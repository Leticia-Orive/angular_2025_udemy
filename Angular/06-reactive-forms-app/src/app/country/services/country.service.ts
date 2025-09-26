import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';


@Injectable({providedIn: 'root'})
export class CountryService {
  //me creo una propiedad privada
  private baseUrl = 'https://restcountries.com/v3.1';

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ]

private http = inject(HttpClient);

get regions(): string[] {
  return [...this._regions];
}
getCountriesByRegion(region: string): Observable<Country[]> {
  if(!region) return of([]);
  console.log({region})

  const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
  return this.http.get<Country[]>(url);
}

getCountryByAlphaCode(alphaCode: string): Observable<Country> {
  const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
  return this.http.get<Country>(url);
}
getCountryBorderByAlphaCodes(borders: string[]) {
  //TODO: por hacer
}
}
