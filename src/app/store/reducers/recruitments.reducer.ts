import {createReducer, on} from '@ngrx/store';
import * as RecruitmentsActions from '../actions/recruitments.action';
import {Recruitment} from '../../types/recruitments';

const initialState: Recruitment[] = [];

export const recruitmentsReducer = createReducer(
	initialState,
	on(RecruitmentsActions.addRecruitment, (state, action) => ([...state, action.recruitment])),
	on(RecruitmentsActions.setRecruitments, (state, action) => ([...state, ...action.recruitments])),
	on(RecruitmentsActions.getRecruitments, (state) => state),
	on(RecruitmentsActions.deleteRecruitment, (state, action) => state.filter(r => r.id !== action.id)),
	on(RecruitmentsActions.updateRecruitment, (state, {id, recruitment}) => state.map(r => r.id === id ? recruitment : r))
);
