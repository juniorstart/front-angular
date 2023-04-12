import {createSelector} from '@ngrx/store';
import {AppState} from '../../types/appState';

const getRecruitments = (state: AppState) => state.recruitments

export const recruitmentsSelector = createSelector(
	getRecruitments,
	(state) => state
)
