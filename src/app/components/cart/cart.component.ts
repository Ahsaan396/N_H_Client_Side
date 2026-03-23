import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(data => {
      this.items = data;
      this.total = this.cartService.getTotalPrice();
    });
  }

  removeItem(id: string) {
    this.cartService.removeFromCart(id).subscribe();
  }


  checkout() {
    alert('Proceeding to payment... Total: $' + this.total);
  }
}