import { Component, Input, OnInit } from '@angular/core';
import { MemberTask } from 'src/app/models/member-task';

@Component({
  selector: 'app-member-task-details',
  templateUrl: './member-task-details.component.html',
  styleUrls: ['./member-task-details.component.css']
})
export class MemberTaskDetailsComponent implements OnInit {
  @Input() memberTasks: MemberTask[];
  constructor() { }

  ngOnInit(): void {
  }  
}
