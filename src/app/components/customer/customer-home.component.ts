import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  template: `
    <div class="store-wrapper">
      <section class="hero">
        <h1>Welcome to EcoMarket</h1>
        <p>Find the best eco-friendly products for a sustainable lifestyle.</p>
      </section>

      <div class="product-grid">
        <div class="product-placeholder">
          <p>Product list is loading...</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent {}