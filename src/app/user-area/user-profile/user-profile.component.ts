import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import {DatabaseUser} from '../shared/database-user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent implements OnInit {
  userData: DatabaseUser;
  userDataObservable: Observable<DatabaseUser>;
  fbUser: firebase.User;

  constructor(private userService: UserService,
    private authService: AuthenticationService,
  ) {
    this.fbUser = this.authService.getCurrentUser( );
    this.userDataObservable = this.userService.getDatabaseUser();
  }

  ngOnInit() {
    let that = this;
    this.userService.userExist(this.fbUser.uid);
    this.userDataObservable.subscribe({
      next(user){
        that.userData = user},
      error(err){ alert(err) }
    })
  }

  ngOnDestroy() {
    
  }


}