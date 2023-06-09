import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateTask } from '../models/create-task';
import { MemberTask } from '../models/member-task';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.baseUrl;

  constructor(private httpSvc: HttpClient) { }

  getMemberTaskDetails(memberId: number): Observable<MemberTask[]> {
    return this.httpSvc.get<MemberTask[]>(this.baseUrl + 'member/list/' + memberId + '/taskDetails');
  }

  updateAllocationPercentage(memberId: number, allocationPercentage: number) {
    return this.httpSvc.patch<MemberTask[]>(this.baseUrl + 'manager/update/allocationPercentage', 
                        { memberId, allocationPercentage });
  }

  assignTask(task: CreateTask) {
    return this.httpSvc.post<MemberTask[]>(this.baseUrl + 'manager/assign-task', 
                        task);
  }
}
