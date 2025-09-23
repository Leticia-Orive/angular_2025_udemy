import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = '';
  searchTerm = '';
  loading = false;

  // Propiedades para el modal de detalles
  showProductDetail = false;
  selectedProduct: Product | null = null;
  selectedQuantity = 1;

  // Propiedades para el modal de entradas de cine
  showCinemaModal = false;
  selectedCinemaType: string = '';
  cinemaTickets = {
    adults: 0,
    children: 0,
    infants: 0
  };
  cinemaPrices = {
    adults: 0,
    children: 0,
    infants: 0
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
        this.loading = false;
      }
    });
  }

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

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.products;

    // Filtro por categoría
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Filtro por búsqueda
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    this.filteredProducts = filtered;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    // Aquí podrías agregar una notificación de que el producto se agregó
    console.log(`${product.name} agregado al carrito`);
  }

  // Métodos para el modal de detalles del producto
  showProductDetails(product: Product): void {
    this.selectedProduct = product;
    this.selectedQuantity = 1;
    this.showProductDetail = true;
  }

  closeProductDetail(): void {
    this.showProductDetail = false;
    this.selectedProduct = null;
    this.selectedQuantity = 1;
  }

  addToCartFromDetail(): void {
    if (this.selectedProduct) {
      this.cartService.addToCart(this.selectedProduct, this.selectedQuantity);
      console.log(`${this.selectedQuantity} x ${this.selectedProduct.name} agregado al carrito`);
      this.closeProductDetail();
      // Aquí podrías mostrar una notificación de éxito
    }
  }

  increaseQuantity(): void {
    if (this.selectedProduct && this.selectedQuantity < this.selectedProduct.stock) {
      this.selectedQuantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  // Métodos para el modal de entradas de cine
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

  private extractCinemaType(productName: string): string {
    if (productName.includes('Estándar')) return 'Estándar';
    if (productName.includes('IMAX')) return 'IMAX';
    if (productName.includes('VIP')) return 'VIP';
    if (productName.includes('4DX')) return '4DX';
    if (productName.includes('Aire Libre')) return 'Aire Libre';
    if (productName.includes('Combo')) return 'Combo';
    return 'Estándar';
  }

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

  private resetCinemaTickets(): void {
    this.cinemaTickets = {
      adults: 0,
      children: 0,
      infants: 0
    };
  }

  closeCinemaModal(): void {
    this.showCinemaModal = false;
    this.selectedProduct = null;
    this.resetCinemaTickets();
  }

  increaseCinemaTickets(type: 'adults' | 'children' | 'infants'): void {
    if (type === 'adults' && this.cinemaTickets.adults < 10) {
      this.cinemaTickets.adults++;
    } else if (type === 'children' && this.cinemaTickets.children < 10) {
      this.cinemaTickets.children++;
    } else if (type === 'infants' && this.cinemaTickets.infants < 10) {
      this.cinemaTickets.infants++;
    }
  }

  decreaseCinemaTickets(type: 'adults' | 'children' | 'infants'): void {
    if (type === 'adults' && this.cinemaTickets.adults > 0) {
      this.cinemaTickets.adults--;
    } else if (type === 'children' && this.cinemaTickets.children > 0) {
      this.cinemaTickets.children--;
    } else if (type === 'infants' && this.cinemaTickets.infants > 0) {
      this.cinemaTickets.infants--;
    }
  }

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

  getTotalCinemaPrice(): number {
    return (this.cinemaTickets.adults * this.cinemaPrices.adults) +
           (this.cinemaTickets.children * this.cinemaPrices.children) +
           (this.cinemaTickets.infants * this.cinemaPrices.infants);
  }

  addCinemaTicketsToCart(): void {
    if (!this.canPurchaseCinemaTickets()) {
      alert(this.getCinemaValidationMessage());
      return;
    }

    // Buscar los productos correspondientes y añadirlos al carrito
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

  clearFilters(): void {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.filteredProducts = this.products;
  }
}
