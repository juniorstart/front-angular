import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoListsService} from '../../services/todo-lists.service';
import {TaskPayload, TodoList, TodoListTask} from '../../types/todoLists';
import {AppState} from '../../types/appState';
import {select, Store} from '@ngrx/store';
import {todoListsSelector} from '../../store/selectors/todoLists.selectors';
import * as TodoListsActions from "../../store/actions/todoLists.action"
import { Observable } from 'rxjs';

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
	todoLists$: Observable<TodoList[]>;

	constructor(private todoListsService: TodoListsService, private store: Store<AppState>) {
	}

	ngOnInit() {
		this.todoListsService.getTodoLists().subscribe({
			next: (data: any) => {
				this.todoLists$ = this.store.pipe(select(todoListsSelector))
				this.store.dispatch(TodoListsActions.setTodoLists({todoLists: data as TodoList[]}))
			}
		});
	}

	onCreateTodoListSubmit() {
		if (this.todoListForm.valid) {
			this.todoListsService.createTodoList(this.todoListForm.value as TodoList).subscribe({
				next: (d) => {
					this.store.dispatch(TodoListsActions.addTodoList({todoList: d as TodoList}))
				}
			});
		}
	}

	onCreateTodoListTaskSubmit() {
		if (this.todoListTaskForm.valid) {
			if (this.todoListTaskToEdit) {
				const newTask = {...this.todoListTaskToEdit,...this.todoListTaskForm.value} as TodoListTask
				this.todoListsService.updateTodoListTask(newTask).subscribe({
					next: () => {
						this.store.dispatch(TodoListsActions.updateTodoListTask({todoListTask: newTask as TodoListTask}))
						this.todoListTaskForm.reset()
					}
				});
			} else {
				this.todoListsService.createTodoListTask(this.todoListTaskForm.value as TaskPayload).subscribe({
					next: (d) => {
						this.store.dispatch(TodoListsActions.addTodoListTask({todoListTask: d as TodoListTask}))
						this.todoListTaskForm.reset()
					}
				});

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

	deleteTodoListTask(todoListId: number, id: number) {
		this.todoListsService.deleteTodoListTask(id).subscribe({
			next: () => {
				this.store.dispatch(TodoListsActions.deleteTodoListTask({todoListId, id}))
			}
		});
	}

	editTodoListTask(todoListId: number, taskId: number) {
		this.todoLists$.subscribe({
			next: todoLists => {
				const currentTodoList = todoLists.find(i => i.id === todoListId)!;
				const currentTask = currentTodoList.tasks.find(i => i.id === taskId)!;
				this.todoListTaskForm.setValue({
					todoListId,
					description: currentTask?.description || ""
				});

				this.todoListTaskToEdit = currentTask;
			}
		})


	}

}
