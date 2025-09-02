
import { Component, inject } from "@angular/core";
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { DragonballService } from '../../services/dragonball.service';


/*interface Character {
  id:number;
  name: string;
  power: number;
}*/

@Component({
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super-page.component.html',
  imports: [ CharacterListComponent, CharacterAddComponent ]


})
export class DragonballSuperPageComponent {


  //injectar mi servicio hay dos formas
  /**1-forma
  constructor(
    public dragonballService = DragonballService) { }*/

  /**2-forma */
  public DragonballService = inject(DragonballService);



//2- inicializar el array de personajes de dragonball interface con signal
  /*characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },

  ])

 addCharacter(character: Character) {
  this.characters.update(
    (list) => [...list, character]
  );

  }
addCharacter(character: Character) {
  this.dragonballService.addCharacter(character);
}*/

}


