import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class LoggedUserGuardService implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {
	}

	canActivate() {
		if (!this.authService.isLoggedIn()) {
			this.router.navigate(['login']);
			return false;
		} else {
			return true;
		}
	}
}
