
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

 addCharacter() {
  //condicion: si no hay nombre o poder o el poder es menor o igual a 0, NO se añade el personaje
  if(!this.name() || !this.power() || this.power() <= 0) {

    return;
  }
  //PERO SI TENEMOS PODER (numero), añadimos un nuevo personaje al array de personajes
    //crea un nuevo objeto de tipo Character que lo asigna a la constante newCharacter con los valores de name y power
  const newCharacter: Character = {
    id: this.characters().length + 1,
    name: this.name(),
    power: this.power()
  };


//añade el nuevo personaje al array de personajes y visualiza en memoria no fijo
    //this.characters().push(newCharacter);

  this.characters.update(list => [...list, newCharacter]);
  this.resetFields();
 }


 resetFields(){
  this.name.set('');
  this.power.set(0);
 }
}


