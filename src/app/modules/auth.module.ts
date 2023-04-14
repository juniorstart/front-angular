import {NgModule} from '@angular/core';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {AngularMaterialModule} from './material.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
	imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
	declarations: [LoginComponent, RegisterComponent],
	exports: [LoginComponent, RegisterComponent]
})


export class AuthModule {}
