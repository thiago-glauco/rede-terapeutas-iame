import { Injectable } from '@angular/core';
import {User} from '../shared/user';
import {DatabaseUser} from '../shared/database-user';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AuthenticationService} from './authentication.service';
import {from, Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class UserService {

  private collectionRoot: string = 'users';
  private databaseUsersColection: AngularFirestoreCollection<DatabaseUser[]>;
  private databaseUserDoc: AngularFirestoreDocument<DatabaseUser>;
  private databaseUserData: DatabaseUser;
  private userSubject: BehaviorSubject<DatabaseUser> = new BehaviorSubject(null);
  private userObservable: Observable<DatabaseUser> = this.userSubject.asObservable();

  constructor(private afs: AngularFirestore,
    private authService: AuthenticationService) {
    this.databaseUsersColection = this.afs.collection<DatabaseUser>(this.collectionRoot);
  }

  userExist( userId ) {
    let that = this;
    let userDoc = this.afs.doc<DatabaseUser>(`${this.collectionRoot}/${userId}`);
    userDoc.valueChanges().subscribe({
      next(data){
        console.log(data)
        that.userSubject.next(data);
        },
      error(err) {console.log("usuário não está no bd"); 
        console.log(err)}
    })
  }

  createUser( user: DatabaseUser ) {
    let that = this;
    let userDoc = this.afs.doc<DatabaseUser>(`${this.collectionRoot}/${user.uid}`);
    userDoc.valueChanges().subscribe({
      next(data){
        console.log(data);
        if(!data){
          that.databaseUsersColection.doc(user.uid).set(user);
        }},
      error(err) {console.log(err)}
    });

    this.userSubject.next(user);
    /*this.item = this.itemDoc.valueChanges();
    this.databaseUsersColection.doc(user.uid).set(user);*/
  }

  updateUserData(user: DatabaseUser) {
    let that = this;
    let userDoc = this.afs.doc<DatabaseUser>(`${this.collectionRoot}/${user.uid}`);
    userDoc.valueChanges().subscribe({
      next(data){
        console.log(data);
        that.databaseUsersColection.doc(user.uid).update(user);
        },
      error(err) {console.log(err)}
    });
    this.userSubject.next(user);
  }

  getDatabaseUser():Observable<DatabaseUser> {
    return this.userObservable;
  }

  deletUser( ) {

  }

}