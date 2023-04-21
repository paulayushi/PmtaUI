import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberTaskDetailsComponent } from './member/member-task-details/member-task-details.component';
import { HomeComponent } from './home/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterMemberComponent } from './register/register-member/register-member.component';
import { LoginComponent } from './login/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberSearchComponent } from './member/member-search/member-search.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateTaskComponent } from './member/create-task/create-task.component';

export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    MemberTaskDetailsComponent,
    HomeComponent,
    RegisterMemberComponent,
    LoginComponent,
    MemberSearchComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
      }
   })
  ],
  exports: [
    MatInputModule,
    MatIconModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
