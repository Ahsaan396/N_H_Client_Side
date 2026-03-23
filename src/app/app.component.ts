import { Component, OnInit, OnDestroy } from '@angular/core'; // Added OnInit, OnDestroy
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs'; // Added Subscription
import * as AuthActions from './store/auth/auth.action';
import { NotificationService } from './services/notification.service'; // Import your new service
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  
  // Notification properties
  message: string | null = null;
  private notifySub!: Subscription; // This holds the "link" to the service
  cartCount: number = 0; // Property to store the cart count

  constructor(
    private store: Store<any>, 
    private router: Router,
    private notify: NotificationService,
    private cartService: CartService, 
  ) {
    this.isLoggedIn$ = this.store.pipe(
      select(state => !!state.auth.token)
    );

    this.isAdmin$ = this.store.pipe(
      select(state => state.auth.user?.role === 'admin')
    );
  }

  ngOnInit() {
    this.isLoggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.cartService.loadCart(); // Fetch from DB
      } else {
        this.cartService.clearCartOnLogout(); // Clear UI only
      }
    });
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    // UNSUBSCRIBE: Clean up the "listener" when the app is closed
    if (this.notifySub) {
      this.notifySub.unsubscribe();
    }
  }
}