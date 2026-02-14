import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  // Observable to track if user is logged in
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<any>, private router: Router) {
    // We check if 'token' exists in the auth state
    this.isLoggedIn$ = this.store.pipe(
      select(state => state.auth.token),
      map(token => !!token)
    );
  }

  ngOnInit() {
    // Check localStorage on refresh to restore state if needed
    const token = localStorage.getItem('token');
    if (token) {
      // You could dispatch a 'rehydrate' action here if needed
    }
  }

  logout() {
    // 1. Clear LocalStorage (The physical data)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 2. Clear Store State (The memory data)
    this.store.dispatch(AuthActions.logout());

    // 3. Redirect (The user experience)
    this.router.navigate(['/login']);
    
    console.log('User logged out of EcoMarket');
  }
}