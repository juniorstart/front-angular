import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RecruitmentsComponent} from './recruitments/recruitments.component';
import {LoggedUserGuardService} from './services/logged-user-guard.service';
import {GuestGuardService} from './services/guest-guard.service';

const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [GuestGuardService]},
  {path: "register", component: RegisterComponent, canActivate: [GuestGuardService]},
  {path: "recruitments", component: RecruitmentsComponent, canActivate: [LoggedUserGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
