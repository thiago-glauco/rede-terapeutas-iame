import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthRootComponent } from './auth-root/auth-root.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RegisterComponent, LoginComponent, AuthRootComponent]
})
export class AuthenticationModule { }