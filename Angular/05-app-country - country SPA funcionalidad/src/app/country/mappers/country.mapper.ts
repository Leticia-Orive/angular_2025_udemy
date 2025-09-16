import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";


export class CountryMapper {
  //creo unos metodos estaticos para mapear los datos
  // static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      population: restCountry.population,

      region: restCountry.region,
      subRegion: restCountry.subregion,

    };
  }

  //static RestCountry[] => Country[]
  static mapRestCountryArrayToCountryArray(
    restCountries: RESTCountry[]
  ): Country[] {
    //esto es una forma
    //return restCountries.map(CountryMapper.mapRestCountryToCountry);
    return restCountries.map(this.mapRestCountryToCountry);
  }

}
