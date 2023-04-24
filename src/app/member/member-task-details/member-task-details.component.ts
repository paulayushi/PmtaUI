import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay, switchMap } from 'rxjs';
import { MemberTask } from 'src/app/models/member-task';
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

  constructor(private memberSvc: MemberService, private toastrSvc: ToastrService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = false;
    this.showAllocationEditButton = this.memberTasks && this.nameId != this.memberTasks[0]?.memberId;
  }

  ngOnInit(): void {
  }

  editAllocation(){
    this.isEditable = true;
  }

  updateAllocationPercentage(memberId: number, allocationPercentage: number){
    if(allocationPercentage < 0 || allocationPercentage > 100){
      this.toastrSvc.error('Allocation should be provided as percentage(0,100)');
      return;
    }
    this.memberSvc.updateAllocationPercentage(memberId, allocationPercentage)
      .pipe(
        delay(200),
        switchMap(() => this.memberSvc.getMemberTaskDetails(memberId))
      ).subscribe( (resp:MemberTask[]) => {
        this.isEditable = false;
        this.memberTasks = resp;
      },(err: any) => {
        this.isEditable = true;
        this.toastrSvc.error('Something went wrong, please try after sometime.');
      });
  }
}
