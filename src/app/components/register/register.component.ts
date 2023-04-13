import {Component} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../types/auth';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	registerForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		login: new FormControl('', [Validators.required, Validators.minLength(3)]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
		repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
		firstName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required)
	}, [this.arePasswordsEqual()]);


	constructor(private authService: AuthService) {
	}


	arePasswordsEqual(): ValidatorFn {
		return (formGroup) => {
			const passwordControl = formGroup?.get('password');
			const repeatPasswordControl = formGroup?.get('repeatPassword');
			const doPasswordsMismatch = passwordControl?.value !== repeatPasswordControl?.value;

			passwordControl?.setErrors(doPasswordsMismatch ? {pwdMismatch: true} : null);
			repeatPasswordControl?.setErrors(doPasswordsMismatch ? {pwdMismatch: true} : null);

			return null;
		};
	}

	onSubmit(e: Event) {
		e.preventDefault();
		if (this.registerForm.valid) {
			this.authService.register(this.registerForm.value as User).subscribe();
		} else {
			this.registerForm.markAllAsTouched();
			this.registerForm.setErrors([{...this.registerForm.errors}]);
		}
		console.log(this.registerForm.valid, this.registerForm.errors);
	}


}
