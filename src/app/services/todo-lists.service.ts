import {environment} from '../../environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recruitment} from '../types/recruitments';
import {TaskPayload, TodoList, TodoListTask} from '../types/todoLists';

const API_URL = `${environment.apiUrl}/api/todolists`;

@Injectable({
	providedIn: 'root'
})
export class TodoListsService {

	constructor(private httpClient: HttpClient) {
	}

	/*
	* Get
	* */

	getTodoLists() {
		return this.httpClient.get(API_URL);
	}

	/*
	* Delete
	* */

	deleteTodoList(id: number) {
		return this.httpClient.delete(`${API_URL}/${id}`);
	}

	deleteTodoListTask(id: number) {
		return this.httpClient.delete(`${API_URL}/task/${id}`);
	}

	/*
	* Create
	* */

	createTodoListTask(payload: TaskPayload) {
		const taskToSend = {
			...payload,
			status: true
		};
		return this.httpClient.post(`${API_URL}/task`, taskToSend);

	}

	createTodoList(todoList: TodoList) {
		const todoListToSend = {
			...todoList,
			tasks: [],
			ownerId: 401,
			status: true
		};

		console.log({todoList});
		return this.httpClient.post(`${API_URL}/todolist`, todoListToSend);
	}

	/*
	* Update
	* */

	updateTodoList(id: string, todoList: TodoList) {
		return this.httpClient.put(`${API_URL}/${id}`, todoList);
	}

	updateTodoListTask(task: TodoListTask) {
		return this.httpClient.put(`${API_URL}/${task.id}`, task);
	}


}
