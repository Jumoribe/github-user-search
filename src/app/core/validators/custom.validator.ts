import {AbstractControl, Validators } from '@angular/forms';


export class CustomValidator {
  constructor(){ }

  static isValidUsername(){
    return (control: AbstractControl): Validators | null => {
      const username = control.value;
      if (username.length > 39  ){
        return { usernameInavlid: true }
      }

      const format = /[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
      if (format.test(username)) {
        return { usernameInavlid: true }
      }

      return null;
    }
  }

}
