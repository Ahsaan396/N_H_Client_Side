import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.action';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // This listens for the 'login' action
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login({ email: action.email, password: action.password }).pipe(
          map((res: any) => AuthActions.loginSuccess({ user: res.user, token: res.token })),
          catchError((error: any) => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  // This listens for 'loginSuccess' and redirects the user
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/'])) // Go to home page
      ),
    { dispatch: false }
  );
}