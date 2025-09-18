import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';

//Me creo dos clientes
const client1 = {
  name: 'Leticia',
  gender: 'female',
  age: 31,
  address: 'Calle Luna Calle Sol',
};
const client2 = {
  name: 'Cristian',
  gender: 'male',
  age: 37,
  address: 'Calle Sol Calle Luna',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe,
  ],
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

  //i18n Plural
  //otro objecto literal
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente',
    '=1': 'tenemos un cliente',
    '=2': 'tenemos dos clientes',
    other: 'tenemos # clientes',
  });
  clients = signal([
    'Leticia',
    'Cristian',
    'Ana',
    'Pepe',
    'Maria',
    'Juan',
    'Laura',
    'Alberto',
    'Sofia',
    'Alvaro',
    'Marta',
  ]);

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }

  //Nueva entrada KeyValue Pipe
  //objeto literal propiedad corriente

  profile = {
    name: 'Leticia',
    age: 31,
    address: 'Calle Luna Calle Sol',
  };

  //Async Pipe para que funcione necesito algo asincrono trabaja con observables y promesas
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Tenemos un error en la data');
      //resolve('Tenemos data en la promesa');
      console.log('Tenemos data en la promesa');
    }, 3500);
  });
}
