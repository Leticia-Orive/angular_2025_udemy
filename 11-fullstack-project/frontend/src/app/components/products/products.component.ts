/**
 * COMPONENTE PRODUCTS (GESTIÓN Y LISTADO DE PRODUCTOS)
 * =====================================================
 *
 * Funcionalidad:
 * - Muestra listado completo de todos los productos
 * - CRUD completo de productos (solo para administradores)
 * - Permite agregar productos al carrito (todos los usuarios)
 *
 * Características:
 * - Vista pública: Listado con opción de agregar al carrito
 * - Vista admin: Formulario para crear/editar/eliminar productos
 * - Modal para seleccionar cantidad antes de agregar al carrito
 * - Estados de carga y manejo de errores
 *
 * Operaciones CRUD (solo admin):
 * - CREATE: Formulario para nuevo producto (name, price, description, stock, image_url, category_id)
 * - READ: Listado completo con información de categoría
 * - UPDATE: Edición de producto existente (carga datos en formulario)
 * - DELETE: Eliminación con confirmación
 *
 * Métodos principales:
 * - loadProducts(): Carga todos los productos desde ProductService
 * - openForm(): Abre formulario vacío para crear nuevo producto
 * - editProduct(): Carga producto en formulario para editar
 * - saveProduct(): Crea o actualiza según isEditing
 * - deleteProduct(): Elimina producto tras confirmación
 * - openCartModal(): Abre modal para cantidad (usuarios normales)
 * - addToCart(): Agrega producto con cantidad al carrito
 *
 * Control de acceso:
 * - authService.isLoggedIn(): Verifica si usuario está autenticado
 * - authService.isAdmin(): Verifica si usuario tiene rol 'admin'
 * - Formulario CRUD visible solo para admin
 *
 * Dependencias:
 * - ProductService: API REST para operaciones CRUD
 * - CartService: Gestiona agregar productos al carrito
 * - AuthService: Control de autenticación y permisos
 * - Product model: Interface { id?, name, price, description, stock, image_url, category_id? }
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  currentProduct: Product = { name: '', description: '', price: 0, stock: 0, image_url: '' };
  showForm = false;
  isEditing = false;
  loading = false;
  error = '';

  // Modal del carrito
  showCartModal = false;
  selectedProduct: Product | null = null;
  quantityToAdd = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService
  ) {}

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
    this.currentProduct = { name: '', description: '', price: 0, stock: 0, image_url: '' };
    this.isEditing = false;
    this.showForm = false;
    this.error = '';
  }

  addToCart(product: Product) {
    console.log('Botón clickeado - Producto:', product);
    if (!product || !product.id) {
      console.error('Producto inválido');
      alert('Error: Producto inválido');
      return;
    }
    this.selectedProduct = product;
    this.quantityToAdd = 1;
    this.showCartModal = true;
    console.log('Modal debería mostrarse. showCartModal:', this.showCartModal);
  }

  confirmAddToCart() {
    console.log('Confirmando agregar al carrito:', this.selectedProduct, 'Cantidad:', this.quantityToAdd);
    if (this.selectedProduct && this.quantityToAdd > 0) {
      if (this.quantityToAdd > (this.selectedProduct.stock || 0)) {
        alert(`Solo hay ${this.selectedProduct.stock} unidades disponibles`);
        return;
      }

      try {
        this.cartService.addToCart(this.selectedProduct, this.quantityToAdd);
        console.log('Producto agregado exitosamente');
        alert(`✅ ${this.selectedProduct.name} agregado al carrito (${this.quantityToAdd} unidades)`);
        this.closeCartModal();
      } catch (error) {
        console.error('Error al agregar al carrito:', error);
        alert('Error al agregar al carrito');
      }
    } else {
      console.error('Datos inválidos para agregar al carrito');
    }
  }

  closeCartModal() {
    this.showCartModal = false;
    this.selectedProduct = null;
    this.quantityToAdd = 1;
  }

  increaseQuantity() {
    if (this.selectedProduct && this.quantityToAdd < (this.selectedProduct.stock || 0)) {
      this.quantityToAdd++;
    }
  }

  decreaseQuantity() {
    if (this.quantityToAdd > 1) {
      this.quantityToAdd--;
    }
  }
}
