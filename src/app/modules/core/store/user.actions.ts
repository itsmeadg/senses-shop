import { Action } from '@ngrx/store';
import { User } from '../../auth/models/app-user.model';


export const GET_USER = '[User] Get user';
export const SIGNUP = '[User] Sign up';
export const SIGNUP_SUCCESS = '[User] Sign up success';

export const USERPASS_LOGIN = '[User] Email Pass Login';
export const USERPASS_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_TOKEN = 'SET_TOKEN';

export const GOOGLE_LOGIN = '[User] Google Login';
export const LOGOUT = '[User] Logout';
export const AUTHENTICATED = '[User] Authenticated';
export const NOT_AUTHENTICATED = '[User] Not Authenticated';
export const AUTH_ERROR = '[User] Error';

export class GetUser implements Action {
  readonly type = GET_USER;
}

export class Signup implements Action {
  readonly type = SIGNUP;
  constructor(public payload: { username: string, password: string }) { }
}

export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
}

export class UserPassLogin implements Action {
  readonly type = USERPASS_LOGIN;
  constructor(public payload: { username: string, password: string }) { }
}

export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload: User) { }
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) { }
}

export type All =
  Signup |
  SignupSuccess |
  UserPassLogin |
  GoogleLogin |
  Logout |
  AuthError |
  GetUser |
  Authenticated |
  NotAuthenticated;

