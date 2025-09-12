import { Component, inject } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { count } from 'rxjs';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  //Injectamos el servicio
  CountryService = inject(CountryService);


  //Creamos un metodo internamente

  onSearch(query: string) {
    this.CountryService.searchByCapital(query)
      .subscribe(resp => {
        console.log(resp);
      } );
  }
 }
