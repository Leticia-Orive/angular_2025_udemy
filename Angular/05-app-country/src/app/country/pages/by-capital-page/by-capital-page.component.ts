import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';

import { Country } from '../../interfaces/country.interface';
//import { CountryMapper } from '../../mappers/country.mapper';
import { count } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  //Injectamos el servicio
  CountryService = inject(CountryService);

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

      /**   const c = CountryMapper.mapRestCountryArrayToCountryArray(countries);
        console.log(c);*/
    });
  }
}
