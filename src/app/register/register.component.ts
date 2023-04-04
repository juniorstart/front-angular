import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

	registerForm: FormGroup;

	ngOnInit() {
		this.registerForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			login: new FormControl('', [Validators.required, Validators.minLength(3)]),
			password: new FormControl('', [Validators.required, Validators.minLength(8), this.arePasswordsEqual()]),
			repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8), this.arePasswordsEqual()]),
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
		} )
	}


	arePasswordsEqual(): ValidatorFn{
		return () => {
			const pwdValue = this.registerForm?.controls["password"].value;
			const repeatPwdValue = this.registerForm?.controls["repeatPassword"].value;
			return pwdValue !== repeatPwdValue ? {pwdMismatch: true} : null
		}
	}

	onSubmit(e: MouseEvent){
		e.preventDefault()
	}


}
