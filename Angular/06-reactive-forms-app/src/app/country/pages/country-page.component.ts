// Importaciones necesarias para el componente
import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { Country } from '../interfaces/country.interface';
// Importamos operadores RxJS para transformar y controlar el flujo de datos
// - filter: Filtra valores según una condición
// - switchMap: Cancela observables anteriores y crea nuevos
// - tap: Ejecuta efectos secundarios sin modificar el flujo de datos
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe], // Importamos los módulos necesarios para formularios reactivos y mostrar JSON
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  // Inyectamos el FormBuilder para crear formularios reactivos
  fb = inject(FormBuilder);

  // Inyectamos el servicio que maneja los datos de países
  countryService = inject(CountryService);

  // Signal que contiene las regiones disponibles obtenidas del servicio
  regions = signal(this.countryService.regions);
  //otra forma de hacerlo regions = this.countryService.regions;

  // Signal que almacenará los países filtrados por la región seleccionada
  countriesByRegion = signal<Country[]>([]);

  // Signal que almacenará los países fronterizos del país seleccionado
  borders = signal<Country[]>([]);

  // Formulario reactivo con tres campos: región, país y frontera
  // Todos los campos son obligatorios (Validators.required)
  myForm = this.fb.group({
    region: ['', Validators.required],    // Campo para seleccionar la región
    country: ['', Validators.required],   // Campo para seleccionar el país
    border: ['', Validators.required],    // Campo para seleccionar la frontera
  });

// Effect que se ejecuta cuando hay cambios en el formulario
// Se usa para gestionar suscripciones y limpiar recursos automáticamente
// Este effect orquesta AMBAS suscripciones: región y país
onFormChanged = effect((onCleanup) => {
 // Suscripción 1: Escuchar cambios en el campo 'region'
 // Cuando cambia la región → se cargan los países de esa región
 const regionSubscription = this.onRegionChanged();

 // Suscripción 2: Escuchar cambios en el campo 'country'
 // Cuando cambia el país → se cargan las fronteras de ese país
 const countrySubscription = this.onCountryChanged();

 // Función de limpieza que se ejecuta cuando el effect se destruye
 // Esto previene memory leaks al desuscribirse automáticamente de AMBAS suscripciones
 onCleanup(() => {
   regionSubscription.unsubscribe();   // Limpia la suscripción de región
   countrySubscription.unsubscribe();  // Limpia la suscripción de país
 });
});

// Método que maneja los cambios en el campo 'region'
// Implementa un flujo reactivo completo para la selección en cascada
onRegionChanged() {
  // Devuelve una suscripción a los cambios de valor del campo 'region'
  // El operador '!' indica que estamos seguros de que el campo existe
  return this.myForm.get('region')!.valueChanges.pipe(
    // PASO 1: Limpiar el campo 'country' cuando cambia la región
    // Esto previene inconsistencias al tener un país de una región diferente
    tap((region) => this.myForm.get('country')!.setValue('') ),

    // PASO 2: Limpiar el campo 'border' cuando cambia la región
    // Las fronteras dependen del país, así que se resetean en cascada
    tap((region) => this.myForm.get('border')!.setValue('') ),

    // PASO 3: Limpiar los signals que contienen los datos
    tap((region) => {
      this.borders.set([]); // Limpiar las fronteras disponibles
      this.countriesByRegion.set([]); // Limpiar temporalmente la lista de países
    }),

    // PASO 4: switchMap cancela peticiones anteriores y hace una nueva
    // Esto evita race conditions si el usuario cambia rápidamente de región
    switchMap(region => this.countryService.getCountriesByRegion(region!))
    //switchMap(region => this.countryService.getCountriesByRegion(region ?? '')) // Alternativa más segura
  ).subscribe((countries) => {
    // PASO 5: Actualizar el signal con los países de la región seleccionada
    this.countriesByRegion.set(countries);
    console.log({countries}); // Log para verificar los países cargados
    //console.log({region});  // Log para depuración - muestra la región seleccionada

    // En este punto, el template puede mostrar los países disponibles para seleccionar
  });
}
 // Método que maneja los cambios en el campo 'country'
 // Implementa el segundo nivel de la selección en cascada: País → Fronteras
 onCountryChanged(){
    return this.myForm.get('country')!.valueChanges.pipe(
      // PASO 1: Limpiar el campo 'border' cuando cambia el país seleccionado
      // Esto previene tener una frontera que no corresponda al nuevo país
      tap( () => this.myForm.get('border')!.setValue('') ),

      // PASO 2: Filtrar valores vacíos o nulos para evitar peticiones innecesarias
      // Solo procede si el usuario realmente seleccionó un país (length > 0)
      filter( value => value!.length > 0 ), // Filtra valores nulos o vacíos

      // PASO 3: Obtener los datos completos del país usando su código Alpha
      // switchMap cancela peticiones anteriores si el usuario cambia rápidamente de país
      switchMap( alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '')
    ),
      // PASO 4: Obtener los nombres de países fronterizos usando sus códigos
      // country.borders contiene un array de códigos, necesitamos convertirlos a nombres
      switchMap( country => this.countryService.getCountryNamesByCodeArray(country.borders )),
    )
    .subscribe(borders => {
      // PASO 5: Actualizar el signal con las fronteras del país seleccionado
      this.borders.set(borders); // Aquí deberías actualizar el signal borders
      console.log({borders}); // Log para verificar las fronteras cargadas

      // En este punto, el template puede mostrar las fronteras disponibles para seleccionar
    })
  }
}
