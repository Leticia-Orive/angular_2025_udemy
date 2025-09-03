
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

  // Inyectar el servicio usando la forma recomendada
  public DragonballService = inject(DragonballService);

  // Exponer la propiedad characters para el template
  public characters = this.DragonballService.characters;

  // Exponer el método addCharacter para el template
  public addCharacter(character: any) {
    this.DragonballService.addCharacter(character);
  }

}


//esto es parte de lo corregido
