import { effect, inject, Injectable, signal } from "@angular/core";
import { Character } from "../interfaces/character.interface";
//Se puede crear tanto como funcion como con const

const loadFromLocalStorage = (): Character[] => {
  //const characters = localStorage.getItem('characters') ?? [];
  const characters = localStorage.getItem('characters')

  return characters ? JSON.parse(characters) : [];

}

@Injectable({providedIn: 'root'})
export class DragonballService {

  characters = signal<Character[]>(loadFromLocalStorage());

saveToLocalStorage = effect(() => {
  localStorage.setItem('characters', JSON.stringify(this.characters()));
});


 addCharacter(character: Character) {
  this.characters.update(
    (list) => [...list, character]
  );

  }


}

//DI
//Misma instancia
