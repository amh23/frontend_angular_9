import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Location } from '@angular/common';

import { UserCustomValidationService } from  '../services/user-custom-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupForm:FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
            private customValidator: UserCustomValidationService,
            private location: Location){}

  ngOnInit(){
    this.signupForm = this.fb.group({
       userName: ['', Validators.required],
       email: ['',[Validators.required, Validators.email]],
       password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
       confirmedPassword: ['',[Validators.required]],
     },
     {
       validator: this.customValidator.MatchPassword('password','confirmedPassword'),
     });
  }

  get f(){
    return this.signupForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.signupForm.valid){
      alert('Form submitted successfully\n\n\n Check the values in the browser console');
    }
    console.table(this.signupForm.value);
  }

  goBack(){
    this.location.back();
  }
   
}
