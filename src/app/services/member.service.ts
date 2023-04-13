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

  constructor(private httpSvc: HttpClient) { }

  getMemberTaskDetails(memberId: number): Observable<MemberTask[]> {
    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.httpSvc.get<MemberTask[]>(this.baseUrl + 'list/' + memberId + '/taskDetails', 
                      {headers: reqHeader});
  }
}
