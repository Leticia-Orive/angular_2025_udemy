import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import {  Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',

})
export default class BasicPageComponent {

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
}
