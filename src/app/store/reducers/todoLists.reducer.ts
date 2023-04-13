import {Recruitment} from '../../types/recruitments';
import {createReducer, on} from '@ngrx/store';
import * as TodoListsActions from '../actions/todoLists.action';
import {TodoList} from '../../types/todoLists';


const initialState: TodoList[] = [];

export const todoListsReducer = createReducer(
	initialState,
	on(TodoListsActions.addTodoList, (state, action) => ([...state, action.todoList])),
	on(TodoListsActions.setTodoLists, (state, action) => ([...state, ...action.todoLists])),
	on(TodoListsActions.getTodoLists, (state) => state),
	on(TodoListsActions.updateTodoList, (state, {id, todoList}) => state.map(r => r.id === id ? todoList : r)),
	on(TodoListsActions.addTodoListTask, (state, action) => {
		const currentTodoList: TodoList = state.find(t => t.id === action.todoListTask.todoListId)!
		const newTasks = [...currentTodoList.tasks, action.todoListTask]

		return state.map(t => t.id === action.todoListTask.todoListId ? {...currentTodoList, tasks: newTasks} : t)
	}),
	on(TodoListsActions.deleteTodoListTask, (state, {id, todoListId}) => {
		const currentTodoList: TodoList = state.find(t => t.id === todoListId)!
		const newTasks = currentTodoList.tasks.filter(task => task.id !== id)
		return state.map(t => t.id === todoListId ? {...currentTodoList, tasks: newTasks} : t)
	}),
	on(TodoListsActions.updateTodoListTask, (state, {todoListTask}) => {
		const currentTodoList: TodoList = state.find(t => t.id === todoListTask.todoListId)!
		const newTasks = currentTodoList.tasks.map(task => task.id === todoListTask.id ? {...task, ...todoListTask} : task)
		return state.map(t => t.id === todoListTask.todoListId ? {...currentTodoList, tasks: newTasks} : t)
	})

);
