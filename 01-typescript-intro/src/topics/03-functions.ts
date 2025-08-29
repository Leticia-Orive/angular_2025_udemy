

//Definicon de una variable basica, funcion tradicional
//cuando se pone :void es el valor de retorno significa que no regresa
function addNumbers(a:number, b:number): number {
    return a + b;
    //return undefined cuando pone undefined es porque no regresa nada
}

//Ahora lo voy hacer con una funcion de flecha
const addNumberArrow = (a:number, b:number):string => {
    return `${a + b}`;
}
/**si pongo esto me tira error
 * const addNumberArrow = (a:number, b:number):string => {
    return a + b;
    para que funcione se pone pero ya no se utiliza mucho
    return (a + b).toString();
    el que se utiliza es este con los backtick ` `
    return `${a + b}`;
}
 */

function multiply(firstNumber: number, secondNumber?: number, base: number = 2)  {
    return firstNumber * base;
}

/*addNumber(1, 2);
const result = addNumber(1, 2);*/

/*de esta forma no funciona si le paso un string
const result: string = addNumber("1", "2");
*/

/*pero de esta forma si funciona
const result: string = addNumber(1, 2).toString();*/

/**Pero queda mas bonito asi */
const result: number = addNumbers(1, 2);
const resultArrow: string = addNumberArrow(1, 2);
const multiplyResult:number = multiply(5);

//lo pongo con {} para que lo defina y ponga como objecto
//si yo no le pongo las llaves me imprime solo el 3
console.log({result, resultArrow, multiplyResult});


export {}; // para que no tome las variables globales de otros archivos