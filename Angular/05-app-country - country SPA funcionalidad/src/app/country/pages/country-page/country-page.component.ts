import { firstValueFrom } from 'rxjs';
import { Component, inject } from '@angular/core';
import { resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';


@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  //esta son dos formas de obtener el parametro
  //countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code');
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = resource({
    loader: () => firstValueFrom(this.countryService.searchCountryByAlphaCode(this.countryCode))
  });
}
