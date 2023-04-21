import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { HomeComponent } from './home/home/home.component';
import { CreateTaskComponent } from './member/create-task/create-task.component';
import { MemberSearchComponent } from './member/member-search/member-search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'member-search', component: MemberSearchComponent},
      { path: 'assign-task', component: CreateTaskComponent}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
