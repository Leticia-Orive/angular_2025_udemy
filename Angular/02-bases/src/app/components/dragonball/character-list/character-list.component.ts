import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  imports: [],
  templateUrl: './character-list.component.html',

})
export class CharacterListComponent {
  /**Informacion del padre al hijo
   * tambien decirle que esos personajes son obligatorios
   * la manera que se recomienda es usando una funcion Input
   */
  characters = input.required<Character[]>();
  listName = input.required<string>();

 }
