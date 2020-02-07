import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthenticationGuard } from '../services/authentication.guard';
import {Observable} from 'rxjs'



const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    redirectTo: '/user-profile',
    pathMatch: 'full' ,
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class UserAreaRoutingModule { }