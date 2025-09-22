import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Product, CreateProductRequest, UpdateProductRequest } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Laptop Gaming ASUS',
      description: 'Laptop gaming de alta gama con procesador Intel i7 y tarjeta gráfica RTX 4060',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
      category: 'Electrónicos',
      stock: 15,
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'iPhone 15 Pro',
      description: 'El último iPhone con chip A17 Pro y cámara de 48MP',
      price: 999.99,
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      category: 'Electrónicos',
      stock: 25,
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'Auriculares Sony WH-1000XM5',
      description: 'Auriculares inalámbricos con cancelación de ruido líder en la industria',
      price: 349.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      category: 'Audio',
      stock: 30,
      createdAt: new Date()
    },
    {
      id: '4',
      name: 'Zapatillas Nike Air Max',
      description: 'Zapatillas deportivas cómodas y con estilo para uso diario',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      category: 'Ropa',
      stock: 50,
      createdAt: new Date()
    },
    {
      id: '5',
      name: 'Cámara Canon EOS R6',
      description: 'Cámara mirrorless profesional con sensor full frame de 20MP',
      price: 2499.99,
      imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
      category: 'Fotografía',
      stock: 8,
      createdAt: new Date()
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  public products$ = this.productsSubject.asObservable();

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(500));
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id)).pipe(delay(300));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category)).pipe(delay(500));
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredProducts).pipe(delay(500));
  }

  createProduct(productData: CreateProductRequest): Observable<Product> {
    const newProduct: Product = {
      id: (this.products.length + 1).toString(),
      ...productData,
      createdAt: new Date()
    };

    this.products.push(newProduct);
    this.productsSubject.next([...this.products]);

    return of(newProduct).pipe(delay(500));
  }

  updateProduct(productData: UpdateProductRequest): Observable<Product> {
    const index = this.products.findIndex(p => p.id === productData.id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    const updatedProduct = { ...this.products[index], ...productData };
    this.products[index] = updatedProduct;
    this.productsSubject.next([...this.products]);

    return of(updatedProduct).pipe(delay(500));
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products.splice(index, 1);
    this.productsSubject.next([...this.products]);

    return of(true).pipe(delay(500));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(product => product.category))];
    return of(categories).pipe(delay(200));
  }
}
