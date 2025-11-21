/**
 * COMPONENTE CATEGORIES (LISTADO DE CATEGORÍAS)
 * ==============================================
 *
 * Funcionalidad:
 * - Muestra todas las categorías de productos disponibles
 * - Cada categoría es clickeable y redirige a sus productos
 * - Implementa sistema de iconos con fallback robusto
 *
 * Características:
 * - Carga categorías desde el backend mediante CategoryService
 * - Estado de loading mientras se cargan datos
 * - Sistema de iconos con 3 niveles de fallback:
 *   1. Mapeo por ID (más confiable, resuelve problemas de encoding)
 *   2. Mapeo por nombre exacto
 *   3. Búsqueda parcial en el nombre (tolerante a errores de charset)
 *
 * Método getCategoryIcon():
 * - Resuelve problemas de encoding UTF-8 en emojis de la BD
 * - Maneja nombres corruptos como "Electr??nica"
 * - IDs del 1 al 6: Electrónica, Ropa, Alimentos, Deportes, Hogar, Libros
 * - Retorna emoji apropiado: 💻👕🍕⚽🏠📚
 *
 * Navegación:
 * - Usa RouterLink para ir a /category/:id
 * - Muestra grid responsive de tarjetas de categorías
 *
 * Dependencias:
 * - CategoryService: Para obtener listado desde /api/categories
 * - Category model: Interface { id, name, description, icon }
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  loading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.loading = false;
      }
    });
  }

  getCategoryIcon(category: Category): string {
    // Primero intentar por ID (más confiable)
    if (category.id === 1) return '💻'; // Electrónica
    if (category.id === 2) return '👕'; // Ropa
    if (category.id === 3) return '🍕'; // Alimentos
    if (category.id === 4) return '⚽'; // Deportes
    if (category.id === 5) return '🏠'; // Hogar
    if (category.id === 6) return '📚'; // Libros

    // Backup: mapeo por nombre (por si el ID no existe)
    const iconMap: { [key: string]: string } = {
      'Electrónica': '💻',
      'Electr??nica': '💻',
      'Electronica': '💻',
      'Ropa': '👕',
      'Alimentos': '🍕',
      'Deportes': '⚽',
      'Hogar': '🏠',
      'Libros': '📚'
    };

    if (iconMap[category.name]) {
      return iconMap[category.name];
    }

    // Último intento: buscar por coincidencia parcial
    const name = category.name.toLowerCase();
    if (name.includes('electr')) return '💻';
    if (name.includes('ropa')) return '👕';
    if (name.includes('alimento')) return '🍕';
    if (name.includes('deporte')) return '⚽';
    if (name.includes('hogar')) return '🏠';
    if (name.includes('libro')) return '📚';

    return '📦';
  }
}
