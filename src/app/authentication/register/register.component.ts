import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../shared/user';
import {LoginFormUser} from '../../shared/login-form-user';
import {DatabaseUser} from '../../shared/database-user';
import {UserService} from '../../services/user.service';
import {Observable, from} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //loginUser => dados fornecidos pelo usuário para login
  //registeredUser => dados do usuário logado, fornecido pelo firebase

  hidePassword: boolean = true; //just for the user interface
  loggedUser: boolean = false; //toogle loggout and register buttons
  verifiedUser: boolean; //toogle loggout and register buttons
  passwordsEqual: boolean = true;

  loginUser: LoginFormUser = new LoginFormUser(); //object with user form data
  //loginUser = {};
  registeredUser: firebase.User; //User with data returned from firebase auth service

  //dadso obtidos do serviço user
  userData: DatabaseUser;
  userDataObservable: Observable<DatabaseUser>;
  dadosPessoais = {};

  constructor(private authService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
    if( this.authService.hasLoggedUser() ) {
      this.registeredUser = this.authService.getCurrentUser();
      this.loggedUser = true;
      this.verifiedUser = this.registeredUser.emailVerified;
      
      //Obter os dados no banco de dados:
      this.userService.userExist({uid: this.registeredUser.uid, email: this.registeredUser.email, verified: this.registeredUser.emailVerified});
    } else {
      this.loggedUser = false;
      this.verifiedUser = false;
    }
  }

  createUser() { 
    if(this.loginUser.password !== this.loginUser.confirmPassword) {
      this.passwordsEqual = false;
      return;
    } else {
      this.passwordsEqual = true;
    }
    let that = this; //para usar dentro do observável

    //solicita a criação do usuário
    const userObservable: Observable<User> = this.authService.signup(this.loginUser.email, this.loginUser.password);

    userObservable.subscribe({
      next( user ) {
        console.log(user);
        //os dados do usuário são armazenados em registeredUser
        that.registeredUser = user.user;
        that.loggedUser = true;
        that.verifiedUser = user.emailVerified;
        //envia e-mail de confirmação para o usuário
        from(that.authService.sendVerificationMail()).subscribe({
          next( data ) {
            console.log(data);
            that.saveUserData();
            alert("Um e-mail de confirmação foi enviado para a conta de cadastro. Confirme o e-mail para acessar o aplicativo");
            //that.logout();
          },
          error( err ) {
            console.log(err);
            alert("Não foi possível enviar o e-mail de confirmação");
            //that.logout();
          }
        });
        },
      //error(err) {alert(this.authService.errorCodes[err.code])}
      error(err) {
        let errObj = that.authService.getErrorMessage(err.code);
        alert(errObj[0].message);
        that.loggedUser = false;
      }
    })
  }

  createGoogleUser( ) {
    let that = this;
    //uses googl provider - easy with firebase
    const userCredential = this.authService.googleLogin( );
    userCredential.subscribe({
      next(userData){
        console.log(userData)
        that.registeredUser = that.authService.getCurrentUser();
        that.saveUserData();
        that.loggedUser = true;
        that.verifiedUser = that.registeredUser.emailVerified;
        },
      error(err) {
        console.log(err);
        that.loggedUser = false;
        }
    });
  }

  logout( ) {
    let that = this;
    const logoutStatus = from(this.authService.logOut());
    logoutStatus.subscribe({
      next( data ) {
        console.log(data);
        that.loggedUser = false;
      },
      error(err) {
        console.log(err);
        if( that.authService.hasLoggedUser ) {
          that.loggedUser = true;
        }
      }
    })
  }

  exit( ) {
    this.logout( );
  }

  private saveUserData(  ) {
    let userData: DatabaseUser = {
      uid: this.registeredUser.uid,
      email: this.registeredUser.email,
      verified: this.registeredUser.emailVerified
    };
    console.log(userData);
      this.userService.createUser(userData);
  }
}