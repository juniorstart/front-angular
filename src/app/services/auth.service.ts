import {environment} from '../environment';
import {HttpClient} from '@angular/common/http';
import {LoginData, User} from '../types/auth';
import {Injectable, NgModule} from '@angular/core';

const BASE_URL = `${environment.apiUrl}/`

//kajonczyk
//K@jonczyk000
@Injectable({
	providedIn: "root"
})
export class AuthService {

	constructor(private httpClient: HttpClient) {
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
		console.log("loguje")
		return this.httpClient.post<string>(BASE_URL + "Login", data)
	}

	isLoggedIn(){
		const token = localStorage.getItem("userToken")

		return !!token
	}

}
