import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {LoginData} from '../../types/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent{

  loginForm = new FormGroup({
    login: new FormControl('kajonczyk', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('K@jonczyk000', [Validators.required, Validators.minLength(8)])
  })

  constructor(private authService: AuthService, private router: Router) {
  }


  isFieldValidatedCorrectly(fieldName: "login" | "password") {
    return !!this.loginForm.controls[fieldName].errors && this.loginForm.controls[fieldName].touched;
  }

  onSubmit(e: MouseEvent) {
    e.preventDefault();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginData).subscribe()
    } else {
      this.loginForm.markAllAsTouched();
      this.loginForm.setErrors([{...this.loginForm.errors}]);
    }
    console.log(this.loginForm.valid, this.loginForm.errors);
  }

}
