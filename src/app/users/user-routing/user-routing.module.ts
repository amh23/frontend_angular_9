import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from '../user-list/user-list.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from '../signin/signin.component';

import { AuthGuard } from '../services/auth.guard';

const usersRoutes: Routes = [
    { path:'',
      children: [
      { path: 'signup', component: SignupComponent },
      { path: 'authenticate', component: SigninComponent },
      { path: '', component: UserListComponent, canActivate: [AuthGuard] },
      { path: ':id', component: UserDetailComponent, canActivate: [AuthGuard] }  
      ]
    }
]; 


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
