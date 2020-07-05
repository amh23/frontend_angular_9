import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl  } from '@angular/forms';
import { FormGroup } from '@angular/forms';
 
@Injectable({
  providedIn: 'root'
})
export class UserCustomValidationService {

  constructor() { }

  patternValidator(): ValidatorFn{
    return (control: AbstractControl):  { [key: string]: any } => {
      if(!control.value){
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmedPassword: string){
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmedPassword];

      if(!passwordControl || !confirmPasswordControl){
        return null;
      }
      if(confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch){
        return null;
      }
      if(passwordControl.value != confirmPasswordControl.value){
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  userNameValidator(usesrControl: AbstractControl){
    return new Promise(resolve => {
      setTimeout(() => {
        if(this.validateUserName(usesrControl.value)){
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string){
    const UserList = ['Lola','Sky', 'Trump'];
    return (UserList.indexOf(userName) > -1);
  }
}
