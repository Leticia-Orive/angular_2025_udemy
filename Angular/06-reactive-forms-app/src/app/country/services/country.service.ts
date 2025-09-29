// Importaciones necesarias para el servicio
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// combineLatest: Combina múltiples observables en uno solo
// Observable: Tipo para manejar datos asíncronos
// of: Crea un observable que emite un valor inmediatamente
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

// Servicio inyectable disponible en toda la aplicación (root)
// Este servicio centraliza todas las operaciones relacionadas con países
@Injectable({providedIn: 'root'})
export class CountryService {
  // URL base de la API REST Countries - API pública gratuita para datos de países
  // Esta API proporciona información detallada sobre todos los países del mundo
  private baseUrl = 'https://restcountries.com/v3.1';

  // Array privado con las regiones disponibles según la API REST Countries
  // Estas son las 5 regiones principales reconocidas por la API
  private _regions = [
    'Africa',      // Países africanos
    'Americas',    // Países de América (Norte, Centro y Sur)
    'Asia',        // Países asiáticos
    'Europe',      // Países europeos
    'Oceania'      // Países de Oceanía (Australia, Nueva Zelanda, etc.)
  ]

// Inyección del HttpClient para realizar peticiones HTTP a la API
private http = inject(HttpClient);

// Getter que devuelve una copia de las regiones disponibles
// Usa spread operator (...) para evitar mutaciones del array original
// Esto protege los datos internos del servicio
get regions(): string[] {
  return [...this._regions];
}

// Método que obtiene todos los países de una región específica
// Parámetro: region - nombre de la región ('Europe', 'Asia', etc.)
// Retorna: Observable con array de países de esa región
getCountriesByRegion(region: string): Observable<Country[]> {
  // Validación: si no hay región, retorna array vacío inmediatamente
  if(!region) return of([]);
  console.log({region}) // Log para depuración

  // Construye la URL con parámetros específicos:
  // - cca3: Código Alpha-3 del país (ej: 'ESP' para España)
  // - name: Nombre del país
  // - borders: Array con códigos de países fronterizos
  const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
  return this.http.get<Country[]>(url);
}

// Método que obtiene un país específico usando su código Alpha-3
// Parámetro: alphaCode - código de 3 letras del país (ej: 'ESP', 'USA', 'FRA')
// Retorna: Observable con los datos del país individual
getCountryByAlphaCode(alphaCode: string): Observable<Country> {
  // Construye URL para obtener un país específico por su código Alpha-3
  // Solicita los mismos campos: código, nombre y fronteras
  const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
  return this.http.get<Country>(url);
}

// Método avanzado que convierte un array de códigos de países en datos completos
// Parámetro: countryCodes - array de códigos Alpha-3 (ej: ['FRA', 'POR', 'AND'])
// Retorna: Observable con array de países completos con sus datos
getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
  // Validación: si no hay códigos o el array está vacío, retorna array vacío
  if (!countryCodes || countryCodes.length === 0) return of([]);

  // PASO 1: Crear un array para almacenar todas las peticiones HTTP
  const countriesRequests: Observable<Country>[] = [];

  // PASO 2: Por cada código de país, crear una petición individual
  countryCodes.forEach(code => {
    const request = this.getCountryByAlphaCode(code);
    countriesRequests.push(request);
  })

  // PASO 3: combineLatest espera a que TODAS las peticiones se completen
  // y luego combina todos los resultados en un solo array
  // Esto es ideal para obtener múltiples países en paralelo
  return combineLatest(countriesRequests);
}
}
