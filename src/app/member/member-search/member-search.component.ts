import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberTask } from 'src/app/models/member-task';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
  search!: number;
  memberTasks!: MemberTask[];
  errorMsg: string ='No error';

  constructor(private memberSvc: MemberService, private toastrSvc: ToastrService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  fetchTaskDetailsByMemberId(){
    if(this.search){
      this.memberSvc.getMemberTaskDetails(this.search)
      .subscribe( (response: MemberTask[]) => {
        this.errorMsg = '' ;
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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
    this.toastrSvc.info('Logged out successfully.');
  }
}
