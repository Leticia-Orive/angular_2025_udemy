
import { Component,  signal } from "@angular/core";


interface Character {
  id:number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super-page.component.html',


})
export class DragonballSuperPageComponent {

  //Creamos dos señales independientes
  name = signal('');
  power = signal(0);



  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },

  ])

 addCharacter() {
  //añadir un personaje vamos hacer distintas validaciones
  if(!this.name() || !this.power() || this.power() <= 0) {

    return;
  }
  const newCharacter: Character = {
    id: this.characters().length + 1,
    name: this.name(),
    power: this.power()
  };
  //esto es una forma pero no le gusta mucho a la gente
  //this.characters().push(newCharacter);

  //lo que se recomienda:
  this.characters.update(list => [...list, newCharacter]);
  //el resetFields lo voy a mandar llamar tan pronto se inserte en nuestro arreglo
  this.resetFields();
 }

 //para pulgarlo hariamos un nuevo metodo
 resetFields(){
  this.name.set('');
  this.power.set(0);
 }
}


