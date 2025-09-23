/**
 * COMPONENTE DE TIENDA - CATÁLOGO DE PRODUCTOS
 *
 * Este componente maneja la visualización y compra de productos en la tienda.
 * Incluye funcionalidades de filtrado, búsqueda y manejo especial para entradas de cine.
 *
 * Funcionalidades principales:
 * - Mostrar catálogo de productos
 * - Filtrado por categoría y búsqueda por texto
 * - Modal de detalles de producto con selección de cantidad
 * - Modal especializado para entradas de cine con validaciones
 * - Integración con el carrito de compras
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shop',             // Selector para usar el componente en templates
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  // PROPIEDADES PRINCIPALES DEL CATÁLOGO

  products: Product[] = [];              // Lista completa de productos
  filteredProducts: Product[] = [];      // Lista filtrada que se muestra
  categories: string[] = [];             // Categorías disponibles para filtrar
  selectedCategory = '';                 // Categoría seleccionada en el filtro
  searchTerm = '';                      // Término de búsqueda actual
  loading = false;                      // Estado de carga de productos

  // PROPIEDADES PARA EL MODAL DE DETALLES DE PRODUCTO

  showProductDetail = false;            // Controla la visibilidad del modal
  selectedProduct: Product | null = null;  // Producto seleccionado para ver detalles
  selectedQuantity = 1;                 // Cantidad seleccionada para agregar al carrito

  // PROPIEDADES PARA EL MODAL DE ENTRADAS DE CINE

  showCinemaModal = false;              // Controla la visibilidad del modal de cine
  selectedCinemaType: string = '';      // Tipo de sala de cine seleccionada
  cinemaTickets = {                     // Cantidad de entradas por tipo
    adults: 0,
    children: 0,
    infants: 0
  };
  cinemaPrices = {                      // Precios por tipo de entrada
    adults: 0,
    children: 0,
    infants: 0
  };

  // CONSTRUCTOR - Inyección de dependencias
  constructor(
    private productService: ProductService,    // Servicio para gestionar productos
    private cartService: CartService           // Servicio para gestionar el carrito
  ) {}

  // HOOK DE CICLO DE VIDA - Se ejecuta después de inicializar el componente
  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  // MÉTODO PÚBLICO - Carga la lista de productos desde el servicio
  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;    // Inicialmente mostrar todos
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
        this.loading = false;
      }
    });
  }

  // MÉTODO PÚBLICO - Carga las categorías disponibles desde el servicio
  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error cargando categorías:', error);
      }
    });
  }

  // MÉTODOS DE FILTRADO - Eventos que actualizan la lista filtrada

  // Handler para cambios en el campo de búsqueda
  onSearchChange(): void {
    this.applyFilters();
  }

  // Handler para cambios en el select de categoría
  onCategoryChange(): void {
    this.applyFilters();
  }

  // MÉTODO PRIVADO - Aplica todos los filtros activos a la lista de productos
  private applyFilters(): void {
    let filtered = this.products;

    // Filtro por categoría
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Filtro por búsqueda en nombre y descripción
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    this.filteredProducts = filtered;
  }

  // MÉTODOS PARA AGREGAR PRODUCTOS AL CARRITO

  // Método público para agregar un producto directamente desde la lista
  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    // Aquí podrías agregar una notificación de que el producto se agregó
    console.log(`${product.name} agregado al carrito`);
  }

  // MÉTODOS PARA EL MODAL DE DETALLES DEL PRODUCTO

  // Método público para mostrar el modal de detalles de un producto
  showProductDetails(product: Product): void {
    this.selectedProduct = product;
    this.selectedQuantity = 1;
    this.showProductDetail = true;
  }

  // Método público para cerrar el modal de detalles
  closeProductDetail(): void {
    this.showProductDetail = false;
    this.selectedProduct = null;
    this.selectedQuantity = 1;
  }

  // Método público para agregar al carrito desde el modal de detalles
  addToCartFromDetail(): void {
    if (this.selectedProduct) {
      this.cartService.addToCart(this.selectedProduct, this.selectedQuantity);
      console.log(`${this.selectedQuantity} x ${this.selectedProduct.name} agregado al carrito`);
      this.closeProductDetail();
      // Aquí podrías mostrar una notificación de éxito
    }
  }

  // Método público para incrementar la cantidad en el modal de detalles
  increaseQuantity(): void {
    if (this.selectedProduct && this.selectedQuantity < this.selectedProduct.stock) {
      this.selectedQuantity++;
    }
  }

  // Método público para decrementar la cantidad en el modal de detalles
  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  // MÉTODOS PARA EL MODAL DE ENTRADAS DE CINE

  // Método público para mostrar el modal especializado para entradas de cine
  showCinemaTicketModal(product: Product): void {
    if (product.category === 'Cines') {
      this.selectedProduct = product;
      this.selectedCinemaType = this.extractCinemaType(product.name);
      this.setCinemaPrices(this.selectedCinemaType);
      this.resetCinemaTickets();
      this.showCinemaModal = true;
    } else {
      // Si no es entrada de cine, mostrar modal normal
      this.showProductDetails(product);
    }
  }

  // Método privado para extraer el tipo de sala del nombre del producto
  private extractCinemaType(productName: string): string {
    if (productName.includes('Estándar')) return 'Estándar';
    if (productName.includes('IMAX')) return 'IMAX';
    if (productName.includes('VIP')) return 'VIP';
    if (productName.includes('4DX')) return '4DX';
    if (productName.includes('Aire Libre')) return 'Aire Libre';
    if (productName.includes('Combo')) return 'Combo';
    return 'Estándar';
  }

  // Método privado para establecer los precios según el tipo de sala
  private setCinemaPrices(cinemaType: string): void {
    // Buscar precios para adultos, niños e infantiles del tipo de cine seleccionado
    const adultTicket = this.products.find(p =>
      p.category === 'Cines' &&
      p.name.includes(cinemaType) &&
      p.name.includes('Adulto')
    );
    const childTicket = this.products.find(p =>
      p.category === 'Cines' &&
      p.name.includes(cinemaType) &&
      p.name.includes('Niño') &&
      !p.name.includes('Infantil')
    );
    const infantTicket = this.products.find(p =>
      p.category === 'Cines' &&
      p.name.includes(cinemaType) &&
      p.name.includes('Infantil')
    );

    this.cinemaPrices = {
      adults: adultTicket?.price || 0,
      children: childTicket?.price || 0,
      infants: infantTicket?.price || 0
    };
  }

  // Método privado para resetear la cantidad de entradas seleccionadas
  private resetCinemaTickets(): void {
    this.cinemaTickets = {
      adults: 0,
      children: 0,
      infants: 0
    };
  }

  // Método público para cerrar el modal de entradas de cine
  closeCinemaModal(): void {
    this.showCinemaModal = false;
    this.selectedProduct = null;
    this.resetCinemaTickets();
  }

  // Método público para incrementar la cantidad de entradas por tipo
  increaseCinemaTickets(type: 'adults' | 'children' | 'infants'): void {
    if (type === 'adults' && this.cinemaTickets.adults < 10) {
      this.cinemaTickets.adults++;
    } else if (type === 'children' && this.cinemaTickets.children < 10) {
      this.cinemaTickets.children++;
    } else if (type === 'infants' && this.cinemaTickets.infants < 10) {
      this.cinemaTickets.infants++;
    }
  }

  // Método público para decrementar la cantidad de entradas por tipo
  decreaseCinemaTickets(type: 'adults' | 'children' | 'infants'): void {
    if (type === 'adults' && this.cinemaTickets.adults > 0) {
      this.cinemaTickets.adults--;
    } else if (type === 'children' && this.cinemaTickets.children > 0) {
      this.cinemaTickets.children--;
    } else if (type === 'infants' && this.cinemaTickets.infants > 0) {
      this.cinemaTickets.infants--;
    }
  }

  // Método público para validar si se pueden comprar las entradas seleccionadas
  canPurchaseCinemaTickets(): boolean {
    // No se pueden comprar entradas de menores sin adultos
    const hasMinors = this.cinemaTickets.children > 0 || this.cinemaTickets.infants > 0;
    const hasAdults = this.cinemaTickets.adults > 0;
    const hasAnyTickets = this.cinemaTickets.adults > 0 || this.cinemaTickets.children > 0 || this.cinemaTickets.infants > 0;

    if (hasMinors && !hasAdults) {
      return false; // No se pueden comprar entradas de menores sin adultos
    }

    return hasAnyTickets; // Debe haber al menos una entrada
  }

  // Método público para obtener mensaje de validación de entradas de cine
  getCinemaValidationMessage(): string {
    const hasMinors = this.cinemaTickets.children > 0 || this.cinemaTickets.infants > 0;
    const hasAdults = this.cinemaTickets.adults > 0;
    const hasAnyTickets = this.cinemaTickets.adults > 0 || this.cinemaTickets.children > 0 || this.cinemaTickets.infants > 0;

    if (!hasAnyTickets) {
      return 'Selecciona al menos una entrada';
    }

    if (hasMinors && !hasAdults) {
      return 'Los menores deben ir acompañados de al menos un adulto';
    }

    return '';
  }

  // Método público para calcular el precio total de las entradas seleccionadas
  getTotalCinemaPrice(): number {
    return (this.cinemaTickets.adults * this.cinemaPrices.adults) +
           (this.cinemaTickets.children * this.cinemaPrices.children) +
           (this.cinemaTickets.infants * this.cinemaPrices.infants);
  }

  // Método público para agregar las entradas de cine al carrito
  addCinemaTicketsToCart(): void {
    if (!this.canPurchaseCinemaTickets()) {
      alert(this.getCinemaValidationMessage());
      return;
    }

    // Buscar los productos correspondientes y añadirlos al carrito

    // Agregar entradas de adulto si se seleccionaron
    if (this.cinemaTickets.adults > 0) {
      const adultProduct = this.products.find(p =>
        p.category === 'Cines' &&
        p.name.includes(this.selectedCinemaType) &&
        p.name.includes('Adulto')
      );
      if (adultProduct) {
        this.cartService.addToCart(adultProduct, this.cinemaTickets.adults);
      }
    }

    // Agregar entradas de niño si se seleccionaron
    if (this.cinemaTickets.children > 0) {
      const childProduct = this.products.find(p =>
        p.category === 'Cines' &&
        p.name.includes(this.selectedCinemaType) &&
        p.name.includes('Niño') &&
        !p.name.includes('Infantil')
      );
      if (childProduct) {
        this.cartService.addToCart(childProduct, this.cinemaTickets.children);
      }
    }

    // Agregar entradas de infante si se seleccionaron
    if (this.cinemaTickets.infants > 0) {
      const infantProduct = this.products.find(p =>
        p.category === 'Cines' &&
        p.name.includes(this.selectedCinemaType) &&
        p.name.includes('Infantil')
      );
      if (infantProduct) {
        this.cartService.addToCart(infantProduct, this.cinemaTickets.infants);
      }
    }

    alert(`Entradas añadidas al carrito correctamente!`);
    this.closeCinemaModal();
  }

  // MÉTODOS DE UTILIDAD

  // Método público para limpiar todos los filtros aplicados
  clearFilters(): void {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.filteredProducts = this.products;
  }
}
