import { Component, signal } from "@angular/core";




@Component({
  selector: 'app-counter',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {

  //valor de un contador
  counter = 10;
  counterSignal = signal(10)

  //Metodos
  incrementarOne(value: number) {
    this.counter++;
    //esta es una manera de incrementar el contador
    this.counter = this.counter + value;
    //esta es otra manera de incrementar el contador
    this.counter += value;

    //incrementa el signal del contador
    //this.counterSignal.set( this.counterSignal() + value );
    this.counterSignal.update( (current) => current + value );
  }

  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
