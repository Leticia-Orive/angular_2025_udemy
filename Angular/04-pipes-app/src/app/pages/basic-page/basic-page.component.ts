import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import {  Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { LocaleService, AvailableLocale } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',

})
export default class BasicPageComponent {

localService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));
  //Me creo tres señales
  nameLower = signal('leticia ');
  nameUpper = signal('LETICIA ');
  fullName = signal('leTicIa OriVe ');

  //Creamos algo de valor fecha
  customDate = signal(new Date());

  //poenemos un efecto
  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log('tick');
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  //me creo un metodo para cambiar el locale
  changeLocale(locale: AvailableLocale) {
    console.log(locale);
    this.localService.changeLocale(locale);
  }
}
