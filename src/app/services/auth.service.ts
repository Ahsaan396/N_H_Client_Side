import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // Ensure 'credentials' is typed as 'any' or an interface
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }
}