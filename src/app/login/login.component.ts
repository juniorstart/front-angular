import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {LoginData} from '../types/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent{

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(private authService: AuthService) {
  }

  onSubmit(e: MouseEvent) {
    e.preventDefault();
    if (this.loginForm.valid) {
      console.log('SUBMIT');
      this.authService.login(this.loginForm.value as LoginData).subscribe({
        next: (token) => localStorage.setItem("userToken", token)
      })
    } else {
      this.loginForm.markAllAsTouched();
      this.loginForm.setErrors([{...this.loginForm.errors}]);
    }
    console.log(this.loginForm.valid, this.loginForm.errors);
  }

}
