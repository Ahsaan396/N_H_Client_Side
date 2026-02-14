import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="dashboard-wrapper">
      <header class="admin-header">
        <h1>Admin Control Center</h1>
        <p>Manage your EcoMarket inventory and users.</p>
      </header>

      <div class="admin-grid">
        <div class="stat-card">
          <h3>Total Products</h3>
          <p class="stat-number">24</p>
        </div>
        <div class="stat-card">
          <h3>Total Sales</h3>
          <p class="stat-number">$1,240</p>
        </div>
        <div class="action-card">
          <h3>Quick Actions</h3>
          <button class="btn-add">+ Add New Product</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {}