/**
 * SERVICIO CATEGORY (CATEGORÍAS)
 * ===============================
 *
 * Funcionalidad:
 * - Gestiona todas las operaciones HTTP relacionadas con categorías de productos
 * - Conecta el frontend con la API REST de categorías en el backend
 * - Proporciona métodos CRUD para componentes
 *
 * API Endpoint: http://localhost:3000/api/categories
 *
 * Métodos disponibles:
 * - getCategories(): Observable<Category[]>
 *   · GET /api/categories
 *   · Obtiene listado completo de categorías ordenadas por nombre
 *   · Retorna array de categorías con id, name, description, icon
 *
 * - getCategoryById(id): Observable<Category>
 *   · GET /api/categories/:id
 *   · Obtiene una categoría específica por su ID
 *   · Usado en CategoryProductsComponent para mostrar info de la categoría
 *
 * - createCategory(category): Observable<Category>
 *   · POST /api/categories
 *   · Crea una nueva categoría
 *   · Body: { name, description?, icon? }
 *   · Campo name es requerido
 *
 * - updateCategory(id, category): Observable<Category>
 *   · PUT /api/categories/:id
 *   · Actualiza categoría existente
 *   · Body: { name?, description?, icon? }
 *   · Usa Partial<Category> para permitir actualización parcial
 *
 * - deleteCategory(id): Observable<void>
 *   · DELETE /api/categories/:id
 *   · Elimina categoría por ID
 *   · Nota: Verificar que no haya productos asociados
 *
 * Uso en componentes:
 * - CategoriesComponent: Muestra grid de todas las categorías
 * - CategoryProductsComponent: Obtiene info de categoría específica
 * - ProductsComponent: Podría usarse para asignar categoría al crear producto
 *
 * Integración con backend:
 * - Usa HttpClient de Angular para peticiones HTTP
 * - Retorna Observables (RxJS) para manejo asíncrono
 * - Los componentes se suscriben con .subscribe()
 *
 * Modelo Category:
 * - Interface definida en models/category.model.ts
 * - Campos: id, name, description?, icon?, created_at?, updated_at?
 * - Icon puede contener emoji (soporte UTF8MB4)
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
