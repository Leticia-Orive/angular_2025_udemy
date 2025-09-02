import { Component, signal } from "@angular/core";


interface Character {
  id:number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball',
  templateUrl: './dragonball-page.component.html',

})
export class DragonballComponent {

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 15000 },
    { id: 2, name: 'Vegeta', power: 14000 },
    { id: 3, name: 'Gohan', power: 13000 },
    { id: 4, name: 'Trunks', power: 12000 },
  ])

}
