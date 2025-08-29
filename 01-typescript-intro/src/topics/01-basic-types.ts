// Tipos básicos de TypeScript
// string, number, boolean, array, object, etc.
//let name = 'Leticia';

// Declaración de una constante de tipo string
// TypeScript infiere automáticamente el tipo 'string' para la variable name
const name: string = 'Leticia';

//creo una variable 
//let hpPoints: number = 95;

//Hay varias formas que puede ayudar a que no salga ese error 
//1. Usar un tipo de unión o utilizando la palabra .
let hpPoints: number | 'FULL' = 95;
//2. Cambiar el tipo de la variable con el caracter de tuberia
//let hpPoints: string | number = 95;

//Quiero que permita dos tipos de datos
hpPoints = 'FULL';

//Creamos otra variable
const isAlive: boolean = true;

//hacemos un console.log para definir un objecto
console.log({ name, hpPoints, isAlive });
export {};