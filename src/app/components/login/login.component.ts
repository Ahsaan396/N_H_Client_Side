import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private store: Store) {}

  onLogin() {
    if (this.email && this.password) {
      // This triggers the AuthEffects we wrote earlier
      this.store.dispatch(AuthActions.login({ 
        email: this.email, 
        password: this.password 
      }));
    } else {
      alert('Please enter both email and password');
    }
  }
}