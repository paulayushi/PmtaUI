import { Component, Input, OnInit } from '@angular/core';
import { MemberTask } from 'src/app/models/member-task';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-task-details',
  templateUrl: './member-task-details.component.html',
  styleUrls: ['./member-task-details.component.css']
})
export class MemberTaskDetailsComponent implements OnInit {
  @Input() memberTasks: MemberTask[];
  isEditable:boolean = false;

  constructor(private memberSvc: MemberService) { }

  ngOnInit(): void {
  }

  editAllocation(){
    this.isEditable = true;
  }

  updateAllocationPercentage(memberId: number){
    this.memberSvc.updateAllocationPercentage(memberId)
      .subscribe(() => {        
        this.memberSvc.getMemberTaskDetails(memberId)
          .subscribe( (response: MemberTask[]) => {
            this.memberTasks = response;
          }, error => {            
          });
      }, error => {      
    });
    this.isEditable = false;
  }
}
