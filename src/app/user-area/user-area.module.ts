import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAreaRoutingModule } from './user-area-routing.module';
import {AuthenticationGuard} from '../services/authentication.guard';

@NgModule({
  imports: [
    CommonModule,
    UserAreaRoutingModule
  ],
  declarations: [UserProfileComponent],
  providers: [AuthenticationGuard]
})
export class UserAreaModule { }