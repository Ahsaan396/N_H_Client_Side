import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
  products: any[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private notify: NotificationService) {}

  ngOnInit(): void {
    this.loadMarketplace();
  }
  onAddToCart(product: any) {
    this.cartService.addToCart(product).subscribe({
      next: (res) => {
        console.log('Backend responded:', res);
        this.notify.show(`✅ Added ${product.name} to cart!`);
      },
      error: (err) => {
        console.error('HTTP Error:', err);
        this.notify.show('❌ Server error: Could not add to cart');
      }
    });
  }
  loadMarketplace() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.loading = false;
      }
    });
  }
}