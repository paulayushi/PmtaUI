import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { switchMap } from 'rxjs';
import { MemberTask } from 'src/app/models/member-task';
import { AuthService } from 'src/app/services/auth.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-task-details',
  templateUrl: './member-task-details.component.html',
  styleUrls: ['./member-task-details.component.css']
})
export class MemberTaskDetailsComponent implements OnInit,OnChanges {
  @Input() memberTasks: MemberTask[];
  @Input() isManager: boolean;
  @Input() nameId: number;  
  isEditable:boolean = false;
  showAllocationEditButton: boolean;

  constructor(private memberSvc: MemberService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = false;
    this.showAllocationEditButton = this.nameId != this.memberTasks[0].memberId;
  }

  ngOnInit(): void {
  }

  editAllocation(){
    this.isEditable = true;
  }

  updateAllocationPercentage(memberId: number){
    this.memberSvc.updateAllocationPercentage(memberId)
      .pipe(
        switchMap(() => this.memberSvc.getMemberTaskDetails(memberId))
      ).subscribe( (resp:MemberTask[]) => {
        this.isEditable = false;
        this.memberTasks = resp;
      });
  }
}
