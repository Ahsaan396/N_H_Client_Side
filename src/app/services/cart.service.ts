import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart';
  
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 1. Fetch from DB
  loadCart(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => this.cartSubject.next(res.items || []),
      error: (err) => console.error('Could not load cart from DB', err)
    });
  }

  // 2. Add to DB
  addToCart(product: any): Observable<any> {
    // CRITICAL: You must have the 'return' keyword here!
    return this.http.post<any>(`${this.apiUrl}/add`, { 
      productId: product._id, 
      quantity: 1 
    }).pipe(
      tap(res => {
        this.cartSubject.next(res.items); 
      })
    );
  }
  // 3. Remove from DB
  removeFromCart(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${productId}`).pipe(
      tap(res => this.cartSubject.next(res.items)) // Sync UI immediately
    );
  }

  // 4. Clear UI on Logout
  clearCartOnLogout(): void {
    this.cartSubject.next([]); // This empties the observable for the UI
  }

  getTotalPrice(): number {
    return this.cartSubject.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}