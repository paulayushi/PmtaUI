import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { CreateTask } from 'src/app/models/create-task';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  task: CreateTask;
  taskForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig> | undefined;

  constructor(private memberSvc: MemberService, private formBuilder: FormBuilder, 
              private router: Router, private toastrSvc: ToastrService) {
                this.bsConfig = {
                    containerClass: 'theme-red',
                    dateInputFormat: 'DD MMMM YYYY'
                  }
               }

  ngOnInit() {
    this.createTaskForm();
  }

  createTaskForm() {
    this.taskForm = this.formBuilder.group({
      memberId: ['', Validators.required],
      taskName: ['', Validators.required],
      delivarables: ['', Validators.required],
      taskStartDate: [null, Validators.required],
      taskEndDate: [null, Validators.required]
    }, { validators : [this.dateLessThan] });
  }

  dateLessThan(formGroup: FormGroup) {
    return new Date(formGroup.controls['taskEndDate'].value).getDate() > new Date(formGroup.controls['taskStartDate'].value).getDate() ? null : { dateValidator : true};
  }

  assignTask() {
    if(this.taskForm.valid) {
      this.task = Object.assign({}, this.taskForm.value);
      this.memberSvc.assignTask(this.task).subscribe( () => {
        this.toastrSvc.success('Member task created successfully.');
      }, (error: any) => {
        this.toastrSvc.error(error.error);
      }, () => {
        delay(100);
        this.router.navigate(['/member-search']);
      });
     }
  }

  cancel() {
    this.router.navigate(['/member-search']);
  }
}
