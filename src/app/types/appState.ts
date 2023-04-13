import {Recruitment} from './recruitments';
import {TodoList} from './todoLists';

export interface AppState {
	recruitments: Recruitment[]
	todoLists: TodoList[]
}
