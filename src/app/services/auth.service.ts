import {environment} from '../../environment';
import {HttpClient} from '@angular/common/http';
import {LoginData, User} from '../types/auth';
import {Injectable, NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {map, tap} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
	providedIn: "root"
})
export class AuthService {

	constructor(private httpClient: HttpClient, private cookiesService: CookieService, private router: Router) {
	}

	setJWTToken(token: string){
		this.cookiesService.set("jwt", token)
	}

	register(data: User){
		const superUniqueRandomId = Math.floor((new Date().getMilliseconds() / 10) + Math.random() * 1000) + 2
		const obj = {
			user: {
				id: superUniqueRandomId, //api
				...data,
			}
		}
		return this.httpClient.post(`${environment.apiUrl}/register`, obj)
	}

	login(data: LoginData) {
		return this.httpClient.post<string>(`${environment.apiUrl}/login`, data).pipe(
			tap(token => {
				this.setJWTToken(token)
				this.router.navigate([""])
			})
		)
	}

	isLoggedIn(){
		return !!this.cookiesService.get("jwt")
	}

	logout(){
		this.cookiesService.delete("jwt")
	}

}
