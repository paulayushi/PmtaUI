import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberTask } from 'src/app/models/member-task';
import { AuthService } from 'src/app/services/auth.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
  search: number;
  memberTasks: MemberTask[];
  isManager: boolean;
  nameId: number;

  constructor(private memberSvc: MemberService, private toastrSvc: ToastrService, 
    private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.isManager = this.authSvc.decodedToken.IsManager;
    this.nameId = this.authSvc.decodedToken.nameid;
    this.memberSvc.getMemberTaskDetails(this.nameId).subscribe(resp => {
      this.memberTasks = resp;
    });    
  }

  fetchTaskDetailsByMemberId(){
    if(this.search){
      this.memberSvc.getMemberTaskDetails(this.search)
      .subscribe( (response: MemberTask[]) => {
        this.memberTasks = response;
      }, error => {
        this.memberTasks = null;
        if(error.status == 400){
          this.toastrSvc.error("Please provide valid member id!!");
        }
        else{
          this.toastrSvc.error("Something went wrong, please try after sometime!!");
        }
      });
    }    
  }
  
  assignTask(){
    this.router.navigate(['assign-task']);
  }
}
