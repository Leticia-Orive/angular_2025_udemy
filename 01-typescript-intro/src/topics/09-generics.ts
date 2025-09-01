
//es mejor no utilizar any porque le quita cualquier restrincion que tenga .ts
//sobre el tipo de dato
//export function whatsMyType<T>(argument: any): any{
//<T>poniendo eso ya estamos haciendo una funcion generica</T>
export function whatsMyType<T>(argument: T): T{

    return argument;
}
//lo podemos llamar const o let asi que lo vamos a cambiar a let
let amIString = whatsMyType<string>('Hola Mundo');
/**La funcion "whatsMyType debe ser capaz de hacer esto" */
let amINumber = whatsMyType<number>(100);
let amIArray = whatsMyType<number[]>([1, 2, 3, 4, 5]);

console.log(amIString.split(''));
console.log(amINumber.toFixed());
console.log(amIArray.join('-'));

/**si le pongo al split un 2 la console me va a tirar
 *  un error porque no existe el segundo elemento 
 * console.log(amIString.split2(''));*/
