import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from './store/auth/auth.action';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <button (click)="logout()">Logout</button>
    </nav>
    <router-outlet></router-outlet>
  `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private store: Store, private router: Router) {}

  logout() {
    // 1. Clear LocalStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // 2. Clear Store
    this.store.dispatch(AuthActions.logout());
    // 3. Redirect
    this.router.navigate(['/login']);
  }
}