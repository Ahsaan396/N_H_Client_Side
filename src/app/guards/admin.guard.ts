
import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';



@Injectable({

  providedIn: 'root'

})

export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}



  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    if (token && role === 'admin') {
      return true;
    }
  
    // Not an admin? Send back to login
    this.router.navigate(['/login']);
    return false;
  }

}
