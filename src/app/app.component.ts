import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AuthActions from './store/auth/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<any>, private router: Router) {
    // Check if user is logged in (token exists)
    this.isLoggedIn$ = this.store.pipe(
      select(state => !!state.auth.token)
    );

    // Check if the role is specifically 'admin'
    this.isAdmin$ = this.store.pipe(
      select(state => state.auth.user?.role === 'admin')
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}