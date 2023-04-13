import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { MemberSearchComponent } from './member/member-search/member-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'member-search', component: MemberSearchComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
