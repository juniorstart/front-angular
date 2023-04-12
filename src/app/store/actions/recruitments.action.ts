import {createAction, props} from '@ngrx/store';
import {Recruitment} from '../../types/recruitments';

export const ADD_RECRUITMENT = "ADD_RECRUITMENT"
export const SET_RECRUITMENTS = "SET_RECRUITMENTS"
export const GET_RECRUITMENTS = "GET_RECRUITMENTs"
export const DELETE_RECRUITMENT = "DELETE_RECRUITMENT"
export const UPDATE_RECRUITMENT = "UPDATE_RECRUITMENT"

export const addRecruitment = createAction(
	ADD_RECRUITMENT,
	props<{recruitment: Recruitment}>()
)

export const setRecruitments = createAction(
	SET_RECRUITMENTS,
	props<{recruitments: Recruitment[]}>()
)

export const getRecruitments = createAction(
	GET_RECRUITMENTS,
)

export const deleteRecruitment = createAction(
	DELETE_RECRUITMENT,
	props<{id: string}>()
)

export const updateRecruitment = createAction(
	UPDATE_RECRUITMENT,
	props<{id: string, recruitment: Recruitment}>()
)
