import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { MemberTask } from 'src/app/models/member-task';
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
    private router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.isManager = this.jwtHelper.decodeToken(token).IsManager;
    this.nameId = this.jwtHelper.decodeToken(token).nameid;
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
