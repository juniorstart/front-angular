import {environment} from '../environment';
import {HttpClient} from '@angular/common/http';
import {LoginData, User} from '../types/auth';
import {Injectable, NgModule} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

const BASE_URL = `${environment.apiUrl}/`


@Injectable({
	providedIn: "root"
})
export class AuthService {

	constructor(private httpClient: HttpClient, private cookiesService: CookieService) {
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
		return this.httpClient.post(BASE_URL + "register", obj)
	}

	login(data: LoginData) {
		return this.httpClient.post<string>(BASE_URL + "Login", data)
	}

	isLoggedIn(){
		return !!this.cookiesService.get("jwt")
	}

	logout(){
		this.cookiesService.delete("jwt")
	}

}
