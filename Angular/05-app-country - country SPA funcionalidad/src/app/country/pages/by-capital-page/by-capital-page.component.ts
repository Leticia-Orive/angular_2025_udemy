import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';

import { Country } from '../../interfaces/country.interface';
//import { CountryMapper } from '../../mappers/country.mapper';
import { count, first, of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  //Injectamos el servicio
  CountryService = inject(CountryService);
  query = signal('');

  // 'request' no es una propiedad válida en rxResource. Debes usar 'params' para pasar datos reactivos.
  // Usamos rxResource pasando solo la función que retorna el observable, evitando errores de sobrecarga.
 /**  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader:({ request }) => {
      if (!request.query) return of([]);
      return this.CountryService.searchByCapital(request.query);
    }
  })*/

  // No se puede usar 'request' porque la API de resource de Angular solo acepta 'params' para pasar parámetros reactivos al loader.
  // 'request' no es una propiedad reconocida y causa error de tipos.
  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      return await firstValueFrom(this.CountryService.searchByCapital(params.query));
    }
  });





/**Este codigo nos lo podiamos ahorrar
  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  //Creamos un metodo internamente

  onSearch(query: string) {
    //hacemos una condiccion
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);
    //console.log({query});
    //Llamamos al servicio
    this.CountryService.searchByCapital(query).subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (err) =>{
        //console.log(err);
        this.isLoading.set(false);
        this.isError.set(err);
        //this.isError.set(`no se encontro un pais con esa capital: ${query}`);
        this.countries.set([]);

      }

        const c = CountryMapper.mapRestCountryArrayToCountryArray(countries);
        console.log(c);

    });*/
  }

