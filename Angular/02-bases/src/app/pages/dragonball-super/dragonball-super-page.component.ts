
import { Component,  signal } from "@angular/core";
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";


interface Character {
  id:number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super-page.component.html',
  imports: [ CharacterListComponent, CharacterAddComponent ]


})
export class DragonballSuperPageComponent {
  //añadir signal a name y power
  name = signal('');
  power = signal(0);


//2- inicializar el array de personajes de dragonball interface con signal
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },

  ])

 addCharacter(character: Character) {
  this.characters.update(
    (list) => [...list, character]
  );

  }



 resetFields(){
  this.name.set('');
  this.power.set(0);
 }
}


