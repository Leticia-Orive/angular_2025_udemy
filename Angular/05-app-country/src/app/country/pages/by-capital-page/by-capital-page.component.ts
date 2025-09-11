import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { count } from 'rxjs';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  //Creamos un metodo internamente

  onSearch(value: string) {
    console.log(value);
  }
 }
