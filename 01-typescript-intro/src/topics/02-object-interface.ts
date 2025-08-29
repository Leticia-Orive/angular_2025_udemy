
/*puras hablidades de un personaje de el señor de los anillos
va a tener un arreglo de habilidades
asi estaria bien
let skills = ['Bash', 'Counter', 'Healing', true, 123];*/

/*Ahora solo quiero habilidades de tipo string pero el true y 123 me da error
let skills: string[] = ['Bash', 'Counter', 'Healing',true,123];*/

/*Ahora solo quiero habilidades de tipo string
let skills: string[] = ['Bash', 'Counter', 'Healing',true,123];*/

/*si sabemos que nuestra variable nunca va a cambiar de tipo es mejor usar una constante
si sabemos que cambia variable let*/
const skills: string[] = ['Bash', 'Counter', 'Healing'];

/*Creamos un objecto
const strider = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash', 'Counter']
}*/

//tipar un objeto de manera estricta
/*Utilizamos una interfaz */
interface Character {
    name: string;
    hp: number;
    skills: string[];
    /**Indica que es opcional ? */
    hometown?: string;
    /**otra forma de  indicar que es opcional
     * hometown: string | undefined;
     */
}

const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash', 'Counter'],
    
};
/**Hago referencia a mi objeto */
strider.hometown = 'Rivendel';

/**Imprimo el elemento en formato tabla */
console.table(strider);

export {};