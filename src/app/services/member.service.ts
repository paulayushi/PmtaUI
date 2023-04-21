import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberTask } from '../models/member-task';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.baseUrl;
  reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  constructor(private httpSvc: HttpClient) { }

  getMemberTaskDetails(memberId: number): Observable<MemberTask[]> {
    return this.httpSvc.get<MemberTask[]>(this.baseUrl + 'member/list/' + memberId + '/taskDetails', 
                      {headers: this.reqHeader});
  }

  updateAllocationPercentage(memberId: number, allocationPercentage: number) {
    return this.httpSvc.patch<MemberTask[]>(this.baseUrl + 'manager/update/allocationPercentage', 
                        { memberId, allocationPercentage }, {headers: this.reqHeader});
  }
}
