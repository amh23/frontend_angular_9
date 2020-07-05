import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule   } from '@angular/forms';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
 
import { UserRoutingModule } from './user-routing/user-routing.module';

 
@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
   ],
   exports: [
   ] 
})
export class UsersModule { }
