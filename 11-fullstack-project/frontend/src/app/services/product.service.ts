/**
 * SERVICIO PRODUCT (PRODUCTOS)
 * =============================
 *
 * Funcionalidad:
 * - Gestiona todas las operaciones HTTP relacionadas con productos
 * - Conecta el frontend con la API REST de productos en el backend
 * - Proporciona métodos CRUD para componentes
 *
 * API Endpoint: http://localhost:3000/api/products
 *
 * Métodos disponibles:
 * - getProducts(): Observable<Product[]>
 *   · GET /api/products
 *   · Obtiene listado completo de productos con categorías (LEFT JOIN)
 *   · Retorna array de productos con category_name incluido
 *
 * - getProduct(id): Observable<Product>
 *   · GET /api/products/:id
 *   · Obtiene un producto específico por su ID
 *   · Incluye información de categoría
 *
 * - createProduct(product): Observable<Product>
 *   · POST /api/products
 *   · Crea un nuevo producto
 *   · Body: { name, price, description, stock, image_url, category_id }
 *
 * - updateProduct(id, product): Observable<Product>
 *   · PUT /api/products/:id
 *   · Actualiza producto existente
 *   · Body: { name, price, description, stock, image_url, category_id }
 *
 * - deleteProduct(id): Observable<any>
 *   · DELETE /api/products/:id
 *   · Elimina producto por ID
 *   · Retorna mensaje de confirmación
 *
 * Uso en componentes:
 * - ProductsComponent: CRUD completo para administradores
 * - CategoryProductsComponent: Filtrado de productos por categoría
 * - HomeComponent: Productos destacados
 * - CartComponent: Verificación de stock al agregar
 *
 * Integración con backend:
 * - Usa HttpClient de Angular para peticiones HTTP
 * - Retorna Observables (RxJS) para manejo asíncrono
 * - Los componentes se suscriben con .subscribe()
 *
 * Modelo Product:
 * - Interface definida en models/product.model.ts
 * - Campos: id?, name, price, description, stock, image_url, category_id?
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
