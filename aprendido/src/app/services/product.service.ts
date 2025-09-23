/**
 * SERVICIO DE GESTIÓN DE PRODUCTOS
 *
 * Este servicio maneja toda la lógica relacionada con productos del catálogo,
 * incluyendo operaciones CRUD, filtrado y búsqueda.
 *
 * Características principales:
 * - Datos mock de productos para desarrollo
 * - Operaciones CRUD completas (Create, Read, Update, Delete)
 * - Filtrado por categoría y búsqueda por texto
 * - Estado reactivo con BehaviorSubject
 * - Simulación de delays para replicar llamadas al backend
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Product, CreateProductRequest, UpdateProductRequest } from '../models/product.model';

@Injectable({
  providedIn: 'root'  // Singleton disponible en toda la aplicación
})
export class ProductService {

  // DATOS MOCK - En una aplicación real, estos vendrían del backend
  private products: Product[] = [
    // Categoría: Electrónicos
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
      id: '6',
      name: 'MacBook Pro M3',
      description: 'MacBook Pro de 14 pulgadas con chip M3, perfecta para trabajo profesional y creativo',
      price: 1999.99,
      imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
      category: 'Electrónicos',
      stock: 12,
      createdAt: new Date()
    },
    {
      id: '7',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Smartphone premium con cámara de 200MP y S Pen integrado',
      price: 1199.99,
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop',
      category: 'Electrónicos',
      stock: 20,
      createdAt: new Date()
    },
    {
      id: '8',
      name: 'iPad Pro 12.9"',
      description: 'Tablet profesional con chip M2 y soporte para Apple Pencil',
      price: 1099.99,
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
      category: 'Electrónicos',
      stock: 18,
      createdAt: new Date()
    },

    // Categoría: Audio
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
      id: '9',
      name: 'AirPods Pro 2',
      description: 'Auriculares inalámbricos de Apple con cancelación activa de ruido',
      price: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=300&fit=crop',
      category: 'Audio',
      stock: 40,
      createdAt: new Date()
    },
    {
      id: '10',
      name: 'JBL Charge 5',
      description: 'Altavoz Bluetooth portátil con batería de larga duración y resistente al agua',
      price: 179.99,
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      category: 'Audio',
      stock: 25,
      createdAt: new Date()
    },
    {
      id: '11',
      name: 'Bose QuietComfort Earbuds',
      description: 'Auriculares in-ear con la mejor cancelación de ruido del mercado',
      price: 279.99,
      imageUrl: 'https://images.unsplash.com/photo-1590658165737-15a047b2d1cc?w=400&h=300&fit=crop',
      category: 'Audio',
      stock: 22,
      createdAt: new Date()
    },

    // Categoría: Ropa
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
      id: '12',
      name: 'Camiseta Premium Cotton',
      description: 'Camiseta de algodón 100% orgánico, suave y cómoda para uso diario',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      category: 'Ropa',
      stock: 100,
      createdAt: new Date()
    },
    {
      id: '13',
      name: 'Jeans Levis 501',
      description: 'Jeans clásicos de corte recto, icónicos y duraderos',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
      category: 'Ropa',
      stock: 35,
      createdAt: new Date()
    },
    {
      id: '14',
      name: 'Chaqueta North Face',
      description: 'Chaqueta impermeable ideal para actividades al aire libre',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      category: 'Ropa',
      stock: 28,
      createdAt: new Date()
    },
    {
      id: '15',
      name: 'Sudadera Adidas',
      description: 'Sudadera con capucha de algodón mezclado, perfecta para el deporte',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
      category: 'Ropa',
      stock: 45,
      createdAt: new Date()
    },

    // Categoría: Fotografía
    {
      id: '5',
      name: 'Cámara Canon EOS R6',
      description: 'Cámara mirrorless profesional con sensor full frame de 20MP',
      price: 2499.99,
      imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
      category: 'Fotografía',
      stock: 8,
      createdAt: new Date()
    },
    {
      id: '16',
      name: 'Sony Alpha A7 IV',
      description: 'Cámara mirrorless con video 4K y estabilización de imagen de 5 ejes',
      price: 2299.99,
      imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
      category: 'Fotografía',
      stock: 10,
      createdAt: new Date()
    },
    {
      id: '17',
      name: 'Objetivo Canon 50mm f/1.8',
      description: 'Objetivo prime con gran apertura, ideal para retratos y poca luz',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1606983340077-7762d7c7ad7e?w=400&h=300&fit=crop',
      category: 'Fotografía',
      stock: 15,
      createdAt: new Date()
    },
    {
      id: '18',
      name: 'Trípode Manfrotto',
      description: 'Trípode profesional de carbono, ligero y resistente',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400&h=300&fit=crop',
      category: 'Fotografía',
      stock: 12,
      createdAt: new Date()
    },

    // Nueva Categoría: Hogar
    {
      id: '19',
      name: 'Robot Aspirador Roomba',
      description: 'Robot aspirador inteligente con mapeo y control por app',
      price: 599.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      category: 'Hogar',
      stock: 20,
      createdAt: new Date()
    },
    {
      id: '20',
      name: 'Cafetera Nespresso',
      description: 'Cafetera de cápsulas con espumador de leche integrado',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      category: 'Hogar',
      stock: 30,
      createdAt: new Date()
    },
    {
      id: '21',
      name: 'Purificador de Aire Dyson',
      description: 'Purificador y ventilador 2 en 1 con filtro HEPA',
      price: 449.99,
      imageUrl: 'https://images.unsplash.com/photo-1586195077139-387b3879f42a?w=400&h=300&fit=crop',
      category: 'Hogar',
      stock: 15,
      createdAt: new Date()
    },
    {
      id: '22',
      name: 'Smart TV Samsung 55"',
      description: 'Televisor 4K UHD con HDR y sistema operativo Tizen',
      price: 899.99,
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
      category: 'Hogar',
      stock: 18,
      createdAt: new Date()
    },

    // Nueva Categoría: Deportes
    {
      id: '23',
      name: 'Bicicleta Montaña Trek',
      description: 'Bicicleta de montaña con suspensión completa y frenos de disco',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1544191696-15693074e6d3?w=400&h=300&fit=crop',
      category: 'Deportes',
      stock: 12,
      createdAt: new Date()
    },
    {
      id: '24',
      name: 'Pelota de Fútbol Nike',
      description: 'Balón de fútbol oficial FIFA con tecnología de vuelo estable',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop',
      category: 'Deportes',
      stock: 60,
      createdAt: new Date()
    },
    {
      id: '25',
      name: 'Pesas Ajustables',
      description: 'Set de mancuernas ajustables de 5-25kg cada una',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
      category: 'Deportes',
      stock: 25,
      createdAt: new Date()
    },
    {
      id: '26',
      name: 'Raqueta Tenis Wilson',
      description: 'Raqueta profesional usada por tenistas de elite mundial',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc78?w=400&h=300&fit=crop',
      category: 'Deportes',
      stock: 20,
      createdAt: new Date()
    },

    // Nueva Categoría: Libros
    {
      id: '27',
      name: 'Clean Code - Robert Martin',
      description: 'Guía esencial para escribir código limpio y mantenible',
      price: 45.99,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      category: 'Libros',
      stock: 50,
      createdAt: new Date()
    },
    {
      id: '28',
      name: 'El Arte de la Guerra',
      description: 'Clásico tratado militar de estrategia aplicable a los negocios',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      category: 'Libros',
      stock: 75,
      createdAt: new Date()
    },
    {
      id: '29',
      name: 'Sapiens - Yuval Harari',
      description: 'De animales a dioses: Una breve historia de la humanidad',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
      category: 'Libros',
      stock: 40,
      createdAt: new Date()
    },
    {
      id: '30',
      name: 'JavaScript: The Good Parts',
      description: 'Guía para dominar las mejores características de JavaScript',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
      category: 'Libros',
      stock: 35,
      createdAt: new Date()
    },

    // Nueva Categoría: Alquiler de Películas
    {
      id: '31',
      name: 'Avengers: Endgame (4K)',
      description: 'Alquiler 48h - La épica conclusión de la saga del infinito en calidad 4K',
      price: 5.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Alquiler de Películas',
      stock: 999,
      createdAt: new Date()
    },
    {
      id: '32',
      name: 'Dune (2021) HD',
      description: 'Alquiler 72h - Épica adaptación de la novela de ciencia ficción',
      price: 4.99,
      imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop',
      category: 'Alquiler de Películas',
      stock: 999,
      createdAt: new Date()
    },
    {
      id: '33',
      name: 'Top Gun: Maverick (4K)',
      description: 'Alquiler 48h - Secuela llena de acción y adrenalina en los cielos',
      price: 6.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Alquiler de Películas',
      stock: 999,
      createdAt: new Date()
    },
    {
      id: '34',
      name: 'Spider-Man: No Way Home',
      description: 'Alquiler 48h - El multiverso se abre en esta increíble aventura',
      price: 5.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Alquiler de Películas',
      stock: 999,
      createdAt: new Date()
    },
    {
      id: '35',
      name: 'El Padrino Trilogía (4K)',
      description: 'Alquiler 7 días - La obra maestra del cine en calidad remasterizada',
      price: 9.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Alquiler de Películas',
      stock: 999,
      createdAt: new Date()
    },
    {
      id: '36',
      name: 'Oppenheimer (IMAX)',
      description: 'Alquiler 72h - Biografía del padre de la bomba atómica en formato IMAX',
      price: 7.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Alquiler de Películas',
      stock: 999,
      createdAt: new Date()
    },

    // Nueva Categoría: Cines
    // Entradas Cine Estándar por edades
    {
      id: '37',
      name: 'Entrada Cine Estándar - Adulto',
      description: 'Entrada tradicional para adultos (18+ años) - Sala estándar con pantalla grande',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 200,
      createdAt: new Date()
    },
    {
      id: '38',
      name: 'Entrada Cine Estándar - Niño',
      description: 'Entrada para niños (6-17 años) - REQUIERE acompañante adulto. Descuento especial para menores',
      price: 8.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 150,
      createdAt: new Date()
    },
    {
      id: '39',
      name: 'Entrada Cine Estándar - Infantil',
      description: 'Entrada para niños pequeños (3-5 años) - OBLIGATORIO acompañante adulto. Precio especial',
      price: 5.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 100,
      createdAt: new Date()
    },

    // Entradas Cine IMAX por edades
    {
      id: '40',
      name: 'Entrada Cine IMAX - Adulto',
      description: 'Experiencia IMAX inmersiva para adultos - Pantalla gigante y sonido envolvente',
      price: 18.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 120,
      createdAt: new Date()
    },
    {
      id: '41',
      name: 'Entrada Cine IMAX - Niño',
      description: 'Entrada IMAX para niños (6-17 años) - REQUIERE acompañante adulto. Experiencia inmersiva con descuento',
      price: 14.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 80,
      createdAt: new Date()
    },
    {
      id: '42',
      name: 'Entrada Cine IMAX - Infantil',
      description: 'Entrada IMAX para niños pequeños (3-5 años) - OBLIGATORIO acompañante adulto. Gran pantalla, precio pequeño',
      price: 11.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 60,
      createdAt: new Date()
    },

    // Entradas Cine Premium VIP por edades
    {
      id: '43',
      name: 'Entrada Cine Premium VIP - Adulto',
      description: 'Sala VIP para adultos - Asientos reclinables, servicio de comida y bebidas premium',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 80,
      createdAt: new Date()
    },
    {
      id: '44',
      name: 'Entrada Cine Premium VIP - Niño',
      description: 'Entrada VIP para niños (6-17 años) - REQUIERE acompañante adulto. Lujo y comodidad con precio especial',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 60,
      createdAt: new Date()
    },
    {
      id: '45',
      name: 'Entrada Cine Premium VIP - Infantil',
      description: 'Entrada VIP para niños pequeños (3-5 años) - OBLIGATORIO acompañante adulto. Comodidad premium para los más pequeños',
      price: 16.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 40,
      createdAt: new Date()
    },

    // Entradas Cine 4DX por edades
    {
      id: '46',
      name: 'Entrada Cine 4DX - Adulto',
      description: 'Experiencia 4DX completa para adultos - Movimiento, efectos sensoriales y adrenalina',
      price: 26.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 70,
      createdAt: new Date()
    },
    {
      id: '47',
      name: 'Entrada Cine 4DX - Niño',
      description: 'Entrada 4DX para niños (6-17 años) - REQUIERE acompañante adulto. Efectos especiales con intensidad moderada',
      price: 21.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 50,
      createdAt: new Date()
    },

    // Entradas especiales y combos
    {
      id: '48',
      name: 'Cine al Aire Libre - Adulto',
      description: 'Experiencia única bajo las estrellas - Entrada para adultos con manta incluida',
      price: 16.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 100,
      createdAt: new Date()
    },
    {
      id: '49',
      name: 'Cine al Aire Libre - Niño',
      description: 'Cine bajo las estrellas para niños - REQUIERE acompañante adulto. Incluye manta y snack saludable',
      price: 12.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 80,
      createdAt: new Date()
    },
    {
      id: '50',
      name: 'Cine al Aire Libre - Infantil',
      description: 'Película bajo las estrellas para los más pequeños - OBLIGATORIO acompañante adulto. Incluye manta y juguete',
      price: 9.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 60,
      createdAt: new Date()
    },

    // Combos familiares
    {
      id: '51',
      name: 'Combo Familiar Estándar',
      description: '2 entradas adulto + 2 niño + 2 palomitas grandes + 4 bebidas + nachos. Los menores deben ir acompañados',
      price: 45.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 40,
      createdAt: new Date()
    },
    {
      id: '52',
      name: 'Combo Familiar Premium',
      description: '2 entradas VIP adulto + 2 VIP niño + snacks premium + bebidas especiales. Supervisión adulta incluida',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1489599235405-26d6be7a2c3e?w=400&h=300&fit=crop',
      category: 'Cines',
      stock: 25,
      createdAt: new Date()
    }
  ];

  // ESTADO REACTIVO DEL SERVICIO
  // BehaviorSubject para mantener y notificar cambios en la lista de productos
  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  public products$ = this.productsSubject.asObservable();

  constructor() { }

  // MÉTODOS DE LECTURA (READ)

  /**
   * MÉTODO: Obtener todos los productos
   *
   * @returns Observable con la lista completa de productos
   */
  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(500));    // Simula delay de red
  }

  /**
   * MÉTODO: Obtener producto por ID
   *
   * @param id - ID único del producto a buscar
   * @returns Observable con el producto encontrado o undefined
   */
  getProductById(id: string): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id)).pipe(delay(300));
  }

  /**
   * MÉTODO: Obtener productos por categoría
   *
   * @param category - Nombre de la categoría a filtrar
   * @returns Observable con productos de la categoría especificada
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category)).pipe(delay(500));
  }

  /**
   * MÉTODO: Buscar productos por texto
   *
   * Busca coincidencias en nombre y descripción de productos.
   *
   * @param searchTerm - Término de búsqueda
   * @returns Observable con productos que coinciden con la búsqueda
   */
  searchProducts(searchTerm: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredProducts).pipe(delay(500));
  }

  // MÉTODOS DE ESCRITURA (CREATE, UPDATE, DELETE)

  /**
   * MÉTODO: Crear nuevo producto
   *
   * @param productData - Datos del producto a crear
   * @returns Observable con el producto creado
   */
  createProduct(productData: CreateProductRequest): Observable<Product> {
    // Generar un ID único basado en timestamp y número aleatorio
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    const newProduct: Product = {
      id: id,
      ...productData,
      createdAt: new Date()
    };

    // Agregar a la lista local y notificar cambios
    this.products.push(newProduct);
    this.productsSubject.next([...this.products]);

    return of(newProduct).pipe(delay(500));
  }

  /**
   * MÉTODO: Actualizar producto existente
   *
   * @param productData - Datos actualizados del producto (debe incluir ID)
   * @returns Observable con el producto actualizado
   * @throws Error si el producto no se encuentra
   */
  updateProduct(productData: UpdateProductRequest): Observable<Product> {
    const index = this.products.findIndex(p => p.id === productData.id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    // Actualizar producto manteniendo propiedades existentes
    const updatedProduct = { ...this.products[index], ...productData };
    this.products[index] = updatedProduct;
    this.productsSubject.next([...this.products]);

    return of(updatedProduct).pipe(delay(500));
  }

  /**
   * MÉTODO: Eliminar producto
   *
   * @param id - ID del producto a eliminar
   * @returns Observable<boolean> - true si se eliminó correctamente
   * @throws Error si el producto no se encuentra
   */
  deleteProduct(id: string): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    // Eliminar producto de la lista y notificar cambios
    this.products.splice(index, 1);
    this.productsSubject.next([...this.products]);

    return of(true).pipe(delay(500));
  }

  // MÉTODOS DE UTILIDAD

  /**
   * MÉTODO: Obtener categorías únicas
   *
   * Extrae todas las categorías diferentes de los productos existentes.
   *
   * @returns Observable con array de nombres de categorías únicas
   */
  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(product => product.category))];
    return of(categories).pipe(delay(200));
  }
}
