import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { I18nSelectPipe } from '@angular/common';

//Me creo dos clientes
const client1 = { name: 'Leticia', gender: 'female', age: 31, address: 'Calle Luna Calle Sol' };
const client2 = { name: 'Cristian', gender: 'male', age: 37, address: 'Calle Sol Calle Luna' };

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe],
  templateUrl: './uncommon-page.component.html',

})
export default class UncommonPageComponent {

  //Creo una señal
  //i18n Select
  client = signal(client1);

  //Objecto literal
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }
}
