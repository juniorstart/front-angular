import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  loginForm: FormGroup

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }
  onSubmit(e: MouseEvent) {
    e.preventDefault();
    if (this.loginForm.valid) {
      console.log('SUBMIT');
    } else {
      this.loginForm.markAllAsTouched();
      this.loginForm.setErrors([{...this.loginForm.errors}]);
    }
    console.log(this.loginForm.valid, this.loginForm.errors);
  }

}
