import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      // User is already logged in! Send them to their dashboard
      if (role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/customer-home']);
      }
      return false; // Block access to Login/Register
    }

    return true; // No token? Allow them to see Login/Register
  }
}