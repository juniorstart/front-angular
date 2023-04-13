

export interface TodoList {
	id: number;
	name: string
	tasks: TodoListTask[],
	status: boolean,
}


export interface TodoListTask {
	id: number
	todoListId: number
	description: string
}


export interface TaskPayload {
	id: number;
	name: string
}
