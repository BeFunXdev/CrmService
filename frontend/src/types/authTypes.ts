export interface IUser {
    id: number
    name: string
    email: string
}

export interface IAuthResponse {
    accessToken: string
    user: IUser
}

export interface IAuthLoginForm {
    email: string
    password: string
}

export interface IAuthRegisterForm extends IAuthLoginForm {
    name: string
}