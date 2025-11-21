/**
 * COMPONENTE CATEGORY-PRODUCTS (PRODUCTOS POR CATEGORÍA)
 * =======================================================
 *
 * Funcionalidad:
 * - Muestra todos los productos de una categoría específica
 * - Filtra productos por category_id desde la URL
 * - Permite agregar productos al carrito con cantidad personalizada
 *
 * Características:
 * - Recibe parámetro :id desde la ruta /category/:id
 * - Carga información de la categoría (nombre, icono)
 * - Filtra productos en el frontend según category_id
 * - Modal para seleccionar cantidad antes de agregar al carrito
 * - Icono de categoría con sistema de fallback por ID
 *
 * Métodos principales:
 * - loadCategory(): Obtiene datos de la categoría desde CategoryService
 * - loadProducts(): Carga todos los productos y filtra por categoryId
 * - getCategoryIcon(): Mapeo de iconos por ID (1-6) para evitar problemas de encoding
 * - openCartModal(): Abre modal para seleccionar cantidad
 * - addToCart(): Agrega producto con cantidad especificada al carrito
 *
 * Sistema de iconos:
 * - 1=💻 Electrónica, 2=👕 Ropa, 3=🍕 Alimentos
 * - 4=⚽ Deportes, 5=🏠 Hogar, 6=📚 Libros
 * - Fallback 🏷️ para categorías no reconocidas
 *
 * Dependencias:
 * - ActivatedRoute: Para obtener parámetro :id de la URL
 * - ProductService: Obtiene listado completo de productos
 * - CategoryService: Obtiene datos específicos de la categoría
 * - CartService: Gestiona agregar productos al carrito
 * - AuthService: Verifica si usuario está autenticado
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-products',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
  products: Product[] = [];
  category: Category | null = null;
  categoryId: number = 0;
  loading = true;

  // Modal para cantidad
  showCartModal = false;
  selectedProduct: Product | null = null;
  quantityToAdd = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    public cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.loadCategory();
      this.loadProducts();
    });
  }

  loadCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (data) => {
        this.category = data;
      },
      error: (error) => {
        console.error('Error al cargar categoría:', error);
      }
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.filter(p => p.category_id === this.categoryId);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.loading = false;
      }
    });
  }

  openCartModal(product: Product) {
    this.selectedProduct = product;
    this.quantityToAdd = 1;
    this.showCartModal = true;
  }

  closeCartModal() {
    this.showCartModal = false;
    this.selectedProduct = null;
    this.quantityToAdd = 1;
  }

  increaseQuantity() {
    if (this.selectedProduct && this.quantityToAdd < this.selectedProduct.stock) {
      this.quantityToAdd++;
    }
  }

  decreaseQuantity() {
    if (this.quantityToAdd > 1) {
      this.quantityToAdd--;
    }
  }

  confirmAddToCart() {
    if (this.selectedProduct) {
      this.cartService.addToCart(this.selectedProduct, this.quantityToAdd);
      this.closeCartModal();
    }
  }

  deleteProduct(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    }
  }

  getCategoryIcon(): string {
    if (!this.category) return '📦';

    // Mapeo por ID de categoría
    const iconMap: { [key: number]: string } = {
      1: '💻', // Electrónica
      2: '👕', // Ropa
      3: '🍕', // Alimentos
      4: '⚽', // Deportes
      5: '🏠', // Hogar
      6: '📚'  // Libros
    };

    return iconMap[this.category.id!] || '📦';
  }
}
