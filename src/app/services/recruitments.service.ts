import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment';
import {Recruitment} from '../types/recruitments';

const API_URL = `${environment.apiUrl}/api/recruitment`

@Injectable({
	providedIn: "root"
})
export class RecruitmentsService {

	constructor(private httpClient: HttpClient) {
	}

	get(){
		return this.httpClient.get(API_URL)
	}

	delete(id: string){
		return this.httpClient.delete(`${API_URL}/${id}`)
	}

	update(id: string, recruitment: Recruitment){
		return this.httpClient.put(`${API_URL}/${id}`, recruitment)
	}

	create(recruitment: Recruitment){
		recruitment.ownerId = 439
		recruitment.city = recruitment.workPlace
		return this.httpClient.post(API_URL, recruitment)
	}

}
