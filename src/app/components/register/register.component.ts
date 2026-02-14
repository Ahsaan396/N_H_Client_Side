import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Initialize the user object with default values
  user = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'user' // Default to customer
  };

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    // Basic validation check
    if (!this.user.email || !this.user.password) {
      alert('Please fill in all fields');
      return;
    }

    this.auth.register(this.user).subscribe({
      next: (res) => {
        alert('Registration Successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed: ' + (err.error?.message || 'Server error'));
      }
    });
  }
}