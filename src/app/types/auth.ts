export interface LoginData {
	login: string,
	password: string,
}

export interface User {
	email: string
	login: string
	password: string
	repeatPassword: string
	firstName: string
	lastName: string
}
