//creamos una interface
interface Character {
    name: string;
    hp: number;
    //funcion dentro de una interface
    showHp: () => void;
}
//A character: Character se lo pongo para añadir tipado

const healCharacter = (character: Character, amount: number) => {
    character.hp += amount;
}

/**Vamos a definir ese personaje */
const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp: () => {
        console.log(`Puntos de vida ${strider.hp}`);
        //seria ${this.hp} pero a mi me da un error y asi como lo tengo me funciona bien
    }
};

//para curar
healCharacter(strider, 10);
healCharacter(strider, 50);

strider.showHp();

export {}; // para que no tome las variables globales de otros archivos