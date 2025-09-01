import { Component } from "@angular/core";




@Component({
  selector: 'app-counter',
  template: `
  <h1> Counter: {{ counter }}</h1>
  <button (click)="incrementarOne(1)">+1</button>
  `,


})
export class CounterPageComponent {

  //valor de un contador
  counter = 10;

  //Metodos
  incrementarOne(value: number) {
    this.counter++;
    //esta es una manera de incrementar el contador
    this.counter = this.counter + value;
    //esta es otra manera de incrementar el contador
    this.counter += value;
  }
}
