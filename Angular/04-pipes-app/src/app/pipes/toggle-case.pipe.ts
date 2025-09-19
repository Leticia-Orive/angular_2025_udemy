import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase'
})

export class ToggleCasePipe implements PipeTransform {
  transform(value: string, upper:boolean = true): string {
    //console.log({value, upper});

    //Voy hacer la condicion
    return upper ? value.toUpperCase() : value.toLowerCase();
  }
}
