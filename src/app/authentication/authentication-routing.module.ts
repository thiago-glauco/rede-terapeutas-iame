import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRootComponent} from './auth-root/auth-root.component'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AuthRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AuthenticationRoutingModule { }