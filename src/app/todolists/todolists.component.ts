import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoListsService} from '../services/todo-lists.service';
import {TaskPayload, TodoList, TodoListTask} from '../types/todoLists';

@Component({
	selector: 'app-todolists',
	templateUrl: './todolists.component.html',
	styleUrls: ['./todolists.component.scss']
})
export class TodolistsComponent implements OnInit {

	todoListForm = new FormGroup({
		name: new FormControl('', [Validators.required])
	});

	todoListTaskForm = new FormGroup({
		todoListId: new FormControl(0, [Validators.required]),
		description: new FormControl('', [Validators.required])
	});

	todoListTaskToEdit: TodoListTask | undefined;
	todoLists: TodoList[] = [];

	constructor(private todoListsService: TodoListsService) {
	}

	ngOnInit() {
		this.todoListsService.getTodoLists().subscribe({
			next: (data: any) => {
				console.log(data);
				this.todoLists = data;
			}
		});
	}

	onCreateTodoListSubmit() {
		if (this.todoListForm.valid) {
			this.todoListsService.createTodoList(this.todoListForm.value as TodoList).subscribe();
		}
	}

	onCreateTodoListTaskSubmit() {
		if (this.todoListTaskForm.valid) {
			if (this.todoListTaskToEdit) {
				this.todoListsService.updateTodoListTask({...this.todoListTaskToEdit,...this.todoListTaskForm.value} as TodoListTask).subscribe();
			} else {
				this.todoListsService.createTodoListTask(this.todoListTaskForm.value as TaskPayload).subscribe();

			}
		}
	}

	onCreateTodoListCancel() {
		this.todoListForm.reset();
	}

	onCreateTodoListTaskCancel() {
		this.todoListTaskForm.reset();
		this.todoListTaskToEdit = undefined;
	}

	deleteTodoList(id: number) {
		this.todoListsService.deleteTodoList(id).subscribe();
	}

	deleteTodoListTask(id: number) {
		this.todoListsService.deleteTodoListTask(id).subscribe();
	}

	editTodoListTask(todoListId: number, taskId: number) {
		const currentTodoList = this.todoLists.find(i => i.id === todoListId)!;
		const currentTask = currentTodoList.tasks.find(i => i.id === taskId)!;
		this.todoListTaskForm.setValue({
			todoListId,
			description: currentTask.description
		});

		this.todoListTaskToEdit = currentTask;

	}

}
