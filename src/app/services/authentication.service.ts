import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Observable, from} from 'rxjs';
import {User} from '../shared/user';
import {AUTH_ERRORS} from '../shared/auth-error-codes';

@Injectable()
export class AuthenticationService {

  fbUser: firebase.User;
  msgErrors = AUTH_ERRORS;
  
  constructor(private angularFireAuth: AngularFireAuth) {
  
  }

  public signup(email: string, password: string): Observable<auth.UserCredential|null> {
    console.log(email, password);
    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password) );
  }

  public getCurrentUser( ): firebase.User {
    return this.angularFireAuth.auth.currentUser;
  }

  public hasLoggedUser( ): boolean {
    console.log("I'm here " + this.angularFireAuth.auth.currentUser);
    if (this.angularFireAuth.auth.currentUser != null) {
      console.log("returning true");
      return true;
    }
    console.log("returning false");
    return false;
  }

  public sendVerificationMail( ): Promise<any> {
    return this.angularFireAuth.auth.currentUser.sendEmailVerification( );
  }

  public logOut( ): Promise<any>{
    return this.angularFireAuth.auth.signOut();
  }

  public getErrorMessage(errorCode) {

    return this.msgErrors.filter( el => el.code === errorCode );

  }

  public googleLogin( ): Observable<auth.UserCredential|null> {
    return from(this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  public emailSignIn( email: string, password: string): Observable<auth.UserCredential|null> {
    console.log(email, password);
    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(email, password));
  }

}