import {createSelector} from '@ngrx/store';
import {AppState} from '../../types/appState';

const getTodoLists = (state: AppState) => state.todoLists

export const todoListsSelector = createSelector(
	getTodoLists,
	(state) => state
)
