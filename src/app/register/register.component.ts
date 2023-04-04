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
			password: new FormControl('', [Validators.required, Validators.minLength(8)]),
			repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
		}, )
	}

	onSubmit(e: MouseEvent){
		e.preventDefault()
	}


}
