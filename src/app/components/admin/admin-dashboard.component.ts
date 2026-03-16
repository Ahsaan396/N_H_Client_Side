import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = [];
  showForm = false;
  isEditMode = false;
  currentProductId: string | null = null;
  searchTerm: string = '';
  
  product = { name: '', price: 0, category: '', description: '', stock: 0 };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts(); // This fills the 'products' array on start
  }
  
  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => console.error('Could not load products:', err)
    });
  }
  get filteredProducts() {
    return this.products.filter(product => 
      product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.isEditMode = false;
    this.resetForm();
  }

  onEdit(item: any) {
    this.showForm = true;
    this.isEditMode = true;
    this.currentProductId = item._id;
    this.product = { ...item }; // Clone data into form
  }

  onDelete(id: string) {
    if(confirm('Delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  onSubmit() {
    if (this.isEditMode && this.currentProductId) {
      // UPDATE
      this.productService.updateProduct(this.currentProductId, this.product).subscribe({
        next: (res) => {
          console.log('Update Success:', res);
          this.loadProducts(); // Refresh the list
          this.toggleForm();   // Close the form
        },
        error: (err) => console.error('Update Failed:', err)
      });
    } else {
      // CREATE
      this.productService.addProduct(this.product).subscribe({
        next: (res) => {
          console.log('Create Success:', res);
          this.loadProducts(); // Refresh the list instantly
          this.toggleForm();   // Close the form
          this.resetForm();    // Clear the fields
        },
        error: (err) => console.error('Create Failed:', err)
      });
    }
  }
  resetForm() {
    this.product = { name: '', price: 0, category: '', description: '', stock: 0 };
  }
}