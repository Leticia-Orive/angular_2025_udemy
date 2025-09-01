import { Component } from "@angular/core";




@Component({
  selector: 'app-counter',
  templateUrl: './counter-page.component.html',
  styles: './counter-page.component.css'
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

  resetCounter() {
    this.counter = 10;
  }
}
