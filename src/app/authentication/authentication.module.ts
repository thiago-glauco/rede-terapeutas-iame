import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

import {AuthenticationGuard} from '../services/authentication.guard';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthRootComponent } from './auth-root/auth-root.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatStepperModule,
    FlexLayoutModule,
  ],
  declarations: [RegisterComponent, LoginComponent, AuthRootComponent],
})
export class AuthenticationModule { }