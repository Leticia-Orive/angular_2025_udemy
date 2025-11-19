import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  currentProduct: Product = { name: '', description: '', price: 0, stock: 0 };
  showForm = false;
  isEditing = false;
  loading = false;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = '';
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar productos: ' + err.message;
        this.loading = false;
      }
    });
  }

  saveProduct() {
    if (this.isEditing && this.currentProduct.id) {
      this.productService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelEdit();
        },
        error: (err) => {
          this.error = 'Error al actualizar producto: ' + err.message;
        }
      });
    } else {
      this.productService.createProduct(this.currentProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelEdit();
        },
        error: (err) => {
          this.error = 'Error al crear producto: ' + err.message;
        }
      });
    }
  }

  editProduct(product: Product) {
    this.currentProduct = { ...product };
    this.isEditing = true;
    this.showForm = true;
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          this.error = 'Error al eliminar producto: ' + err.message;
        }
      });
    }
  }

  cancelEdit() {
    this.currentProduct = { name: '', description: '', price: 0, stock: 0 };
    this.isEditing = false;
    this.showForm = false;
    this.error = '';
  }
}
