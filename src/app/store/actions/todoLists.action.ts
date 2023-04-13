
import {createAction, props} from '@ngrx/store';
import {Recruitment} from '../../types/recruitments';
import {TodoList, TodoListTask} from '../../types/todoLists';

export const ADD_TODO_LIST = "ADD_TODO_LIST"
export const SET_TODO_LISTS = "SET_TODO_LISTS"
export const GET_TODO_LISTS = "GET_TODO_LISTS"
export const UPDATE_TODO_LIST = "UPDATE_TODO_LIST"

export const ADD_TODO_LIST_TASK = "ADD_TODO_LIST_TASK"
export const UPDATE_TODO_LIST_TASK = "UPDATE_TODO_LIST_TASK"
export const DELETE_TODO_LIST_TASK = "DELETE_TODO_LIST_TASK"

export const addTodoList = createAction(
	ADD_TODO_LIST,
	props<{todoList: TodoList}>()
)

export const setTodoLists = createAction(
	SET_TODO_LISTS,
	props<{todoLists: TodoList[]}>()
)

export const getTodoLists = createAction(
	GET_TODO_LISTS,
)


export const updateTodoList = createAction(
	UPDATE_TODO_LIST,
	props<{id: number, todoList: TodoList}>()
)

export const addTodoListTask = createAction(
	ADD_TODO_LIST_TASK,
	props<{todoListTask: TodoListTask}>()
)

export const updateTodoListTask = createAction(
	UPDATE_TODO_LIST_TASK,
	props<{todoListTask: TodoListTask}>()
)

export const deleteTodoListTask = createAction(
	DELETE_TODO_LIST_TASK,
	props<{todoListId: number, id: number}>()
)
