/**
 * COMPONENTE DE ADMINISTRACIÓN DE PRODUCTOS
 *
 * Este componente proporciona una interfaz completa para que los administradores
 * gestionen el catálogo de productos de la tienda. Incluye operaciones CRUD completas.
 *
 * Funcionalidades:
 * - Listar todos los productos existentes
 * - Crear nuevos productos con formulario de validación
 * - Editar productos existentes
 * - Eliminar productos con confirmación
 * - Formulario reactivo con validaciones
 * - Manejo de estados de carga y errores
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../models/product.model';

@Component({
  selector: 'app-admin',           // Selector para usar el componente en templates
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  // PROPIEDADES DEL COMPONENTE

  products: Product[] = [];                    // Lista de productos cargados
  productForm!: FormGroup;                     // Formulario reactivo para crear/editar productos
  editingProduct: Product | null = null;       // Producto en edición (null para crear nuevo)
  loading = false;                             // Estado de carga para operaciones async
  showForm = false;                           // Control de visibilidad del formulario

  // CONSTRUCTOR - Inyección de dependencias
  constructor(
    private productService: ProductService,    // Servicio para operaciones CRUD de productos
    private formBuilder: FormBuilder           // Constructor de formularios reactivos
  ) {}

  // HOOK DE CICLO DE VIDA - Se ejecuta después de inicializar el componente
  ngOnInit(): void {
    console.log('🚀 AdminComponent inicializado');
    this.createForm();
    this.loadProducts();
  }

  // MÉTODO PRIVADO - Configura el formulario reactivo con validaciones
  private createForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],           // Nombre del producto
      description: ['', [Validators.required, Validators.minLength(10)]],   // Descripción detallada
      price: ['', [Validators.required, Validators.min(0.01)]],             // Precio mayor a 0
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]], // URL válida de imagen
      category: ['', [Validators.required]],                                // Categoría del producto
      stock: ['', [Validators.required, Validators.min(0)]]                 // Stock disponible
    });
  }

  // MÉTODO PÚBLICO - Carga la lista de productos desde el servicio
  loadProducts(): void {
    this.loading = true;
    console.log('🔍 Cargando productos...');
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('✅ Productos cargados:', products);
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error cargando productos:', error);
        this.loading = false;
      }
    });
  }

  // MÉTODOS DE GESTIÓN DEL FORMULARIO

  // Método público para mostrar formulario de crear nuevo producto
  showAddForm(): void {
    this.editingProduct = null;
    this.productForm.reset();
    this.showForm = true;
  }

  // Método público para editar un producto existente
  editProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      stock: product.stock
    });
    this.showForm = true;
  }

  // Método público para cancelar edición y ocultar formulario
  cancelEdit(): void {
    this.editingProduct = null;
    this.productForm.reset();
    this.showForm = false;
  }

  // MÉTODO PRINCIPAL - Maneja el envío del formulario (crear o actualizar)
  onSubmit(): void {
    if (this.productForm.valid && !this.loading) {
      this.loading = true;

      const formData = this.productForm.value;

      if (this.editingProduct) {
        // ACTUALIZAR PRODUCTO EXISTENTE
        const updateData: UpdateProductRequest = {
          id: this.editingProduct.id,
          ...formData
        };

        this.productService.updateProduct(updateData).subscribe({
          next: (updatedProduct) => {
            console.log('✅ Producto actualizado:', updatedProduct);
            const index = this.products.findIndex(p => p.id === updatedProduct.id);
            if (index !== -1) {
              this.products[index] = updatedProduct;    // Actualizar en la lista local
            }
            this.cancelEdit();
            this.loading = false;
            alert('Producto actualizado correctamente');
          },
          error: (error) => {
            console.error('❌ Error actualizando producto:', error);
            this.loading = false;
            alert('Error al actualizar el producto');
          }
        });
      } else {
        // CREAR NUEVO PRODUCTO
        const createData: CreateProductRequest = formData;

        this.productService.createProduct(createData).subscribe({
          next: (newProduct) => {
            console.log('✅ Producto creado:', newProduct);
            this.products.push(newProduct);    // Agregar a la lista local
            this.cancelEdit();
            this.loading = false;
            alert('Producto creado correctamente');
          },
          error: (error) => {
            console.error('❌ Error creando producto:', error);
            this.loading = false;
            alert('Error al crear el producto');
          }
        });
      }
    }
  }

  // MÉTODO PÚBLICO - Elimina un producto con confirmación
  deleteProduct(product: Product): void {
    if (confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?\n\nEsta acción no se puede deshacer.`)) {
      this.loading = true;
      console.log('🗑️ Eliminando producto:', product.name);

      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          console.log('✅ Producto eliminado exitosamente');
          // Remover de la lista local
          this.products = this.products.filter(p => p.id !== product.id);
          this.loading = false;
          alert('Producto eliminado correctamente');
        },
        error: (error) => {
          console.error('❌ Error eliminando producto:', error);
          this.loading = false;
          alert('Error al eliminar el producto');
        }
      });
    }
  }

  // GETTERS - Proporcionan acceso fácil a los campos del formulario desde el template
  get name() { return this.productForm.get('name'); }              // Getter para el campo nombre
  get description() { return this.productForm.get('description'); } // Getter para la descripción
  get price() { return this.productForm.get('price'); }            // Getter para el precio
  get imageUrl() { return this.productForm.get('imageUrl'); }      // Getter para la URL de imagen
  get category() { return this.productForm.get('category'); }      // Getter para la categoría
  get stock() { return this.productForm.get('stock'); }            // Getter para el stock
}
