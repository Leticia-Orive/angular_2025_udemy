import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../models/product.model';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  productForm!: FormGroup;
  editingProduct: Product | null = null;
  loading = false;
  showForm = false;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log('🚀 AdminComponent inicializado');
    this.createForm();
    this.loadProducts();
  }

  private createForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

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

  showAddForm(): void {
    this.editingProduct = null;
    this.productForm.reset();
    this.showForm = true;
  }

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

  cancelEdit(): void {
    this.editingProduct = null;
    this.productForm.reset();
    this.showForm = false;
  }

  onSubmit(): void {
    if (this.productForm.valid && !this.loading) {
      this.loading = true;

      const formData = this.productForm.value;

      if (this.editingProduct) {
        // Actualizar producto existente
        const updateData: UpdateProductRequest = {
          id: this.editingProduct.id,
          ...formData
        };

        this.productService.updateProduct(updateData).subscribe({
          next: (updatedProduct) => {
            const index = this.products.findIndex(p => p.id === updatedProduct.id);
            if (index !== -1) {
              this.products[index] = updatedProduct;
            }
            this.cancelEdit();
            this.loading = false;
          },
          error: (error) => {
            console.error('Error actualizando producto:', error);
            this.loading = false;
          }
        });
      } else {
        // Crear nuevo producto
        const createData: CreateProductRequest = formData;

        this.productService.createProduct(createData).subscribe({
          next: (newProduct) => {
            this.products.push(newProduct);
            this.cancelEdit();
            this.loading = false;
          },
          error: (error) => {
            console.error('Error creando producto:', error);
            this.loading = false;
          }
        });
      }
    }
  }

  deleteProduct(product: Product): void {
    if (confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
      this.loading = true;
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error eliminando producto:', error);
          this.loading = false;
        }
      });
    }
  }

  // Getters para el formulario
  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get imageUrl() { return this.productForm.get('imageUrl'); }
  get category() { return this.productForm.get('category'); }
  get stock() { return this.productForm.get('stock'); }
}
