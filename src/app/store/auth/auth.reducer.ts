import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.action';
export interface AuthState {
  user: any | null;
  token: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'), // Check if already logged in
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.logout, () => ({
    user: null,
    token: null,
    error: null
  }))
);