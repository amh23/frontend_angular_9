import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { UserCustomValidationService } from '../services/user-custom-validation.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error: string;
  
  constructor(private fb: FormBuilder,
              private userCustomValidationService: UserCustomValidationService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) { }


  ngOnInit(): void {
     this.signinForm = this.fb.group({
       email: ['',[Validators.required, Validators.email]],
       password: ['',Validators.required]
      });

       // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){
    return this.signinForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.signinForm.invalid){
      return;
    }
    this.loading = true;
    this.userService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
        
      );
    //this.userService.isLoggedIn = true;
    //if(this.signinForm.valid){
     // alert('Form submitted successfully\n\n\n Check the values in the browser console');
    //}
    console.table(this.signinForm.value);
  }

  goBack(){
    this.location.back();
  }

}
