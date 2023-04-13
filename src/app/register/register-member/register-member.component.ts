import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginUser } from 'src/app/models/login-user';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.css']
})
export class RegisterMemberComponent implements OnInit {

  @Output() registerToggleMode = new EventEmitter();
  user: User;
  registerForm!: FormGroup;
  bsConfig: Partial<BsDatepickerConfig> | undefined;

  constructor(private authSvc: AuthService, private formBuilder: FormBuilder, 
              private router: Router, private toastrSvc: ToastrService) {
                this.bsConfig = {
                    containerClass: 'theme-red',
                    dateInputFormat: 'DD MMMM YYYY'
                  }
               }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      memberId: ['', Validators.required],
      name: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(5)]],
      skillset: ['', [Validators.required]],
      description: ['', Validators.required],
      projectStartDate: [null, Validators.required],
      projectEndDate: [null, Validators.required],
      allocationPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      isManager: ["true"],
    }, { validators : [this.matchPasswordValidator, this.minSkillsetValidation, this.dateLessThan] });
  }

  matchPasswordValidator(formGroup: FormGroup){
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : { mismatch : true };
  }
  minSkillsetValidation(formGroup: FormGroup){
    let skillset = formGroup.value.skillset.split(",").map((item: string) => item.trim());
    return skillset.length >= 3 && skillset[skillset.length - 1] ? null : { minSkillset : true };
  }

  dateLessThan(formGroup: FormGroup) {
    return new Date(formGroup.controls['projectEndDate'].value).getDate() > new Date(formGroup.controls['projectStartDate'].value).getDate() ? null : { dateValidator : true};
  }

  register() {
    if(this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.user.isManager = this.registerForm.value.isManager == 'true' ? true: false;
      this.user.skillset = this.registerForm.value.skillset.split(",").map((item: string) => item.trim());
      this.authSvc.register(this.user).subscribe( () => {
        this.toastrSvc.success('Registration successful.');
      }, (error: any) => {
        this.toastrSvc.error(error.error);
      }, () => {
        let login = new LoginUser();
        login.userId = this.user.memberId;
        login.password = this.user.password;

        this.authSvc.login(login).subscribe( () => {
          this.router.navigate(['/member-search']);
        }, (error: any)=> {
          this.toastrSvc.error(error.error);
        });
      });
     }
  }

  cancel() {
    this.registerToggleMode.emit(false);
  }
}
