import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.action';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login({ email: action.email, password: action.password }).pipe(
          map(response => {
            // 1. Save to local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
  
            // 2. Role-Based Redirection (This is the only one you need!)
            if (response.role === 'admin') {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/customer-home']);
            }
  
            return AuthActions.loginSuccess({ user: response, token: response.token });
          }),
          catchError(error => {
            console.error('Login Error:', error);
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        )
      )
    )
  );

  // REMOVED: loginSuccess$ effect. 
  // It was redirecting everyone to '/' and ignoring your role logic!
}