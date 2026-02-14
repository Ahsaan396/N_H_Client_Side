
import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';



@Injectable({

  providedIn: 'root'

})

export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}



  canActivate(): boolean {

    // Add your admin authentication logic here

    const isAdmin = true; // Replace with actual logic

    if (!isAdmin) {

      this.router.navigate(['/login']);

      return false;

    }

    return true;

  }

}
