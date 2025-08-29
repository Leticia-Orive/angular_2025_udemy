

//destructuracion de arreglos
/**1.primera forma 
const dbz: string[] = ['Goku', 'Vegeta', 'Trunk'];

console.log('Personaje 3:', dbz[2]);

si lo quiero poner como error
console.error('Personaje 3:', dbz[2]);

en caso de no haber personaje 
console.error('Personaje 3:', dbz[3] || 'No hay personaje');

otra forma 
const trunk = dbz[3] || 'No hay personaje';
console.error('Personaje 3:', trunk);*/

/**2. segunda forma */
/*1.const la mejor
const [, , trunks]: string[] = ['Goku', 'Vegeta', 'Trunk'];*/
/*esta es otra forma de poner la const
const [p1, p2, trunks]: string[] = ['Goku', 'Vegeta', 'Trunk'];*/
/*se pone trunks porque es la persona 3
console.error('Personaje 3:', trunks);*/
//cuando no existe el valor trunks va recibir un not found
const [, , trunks = 'Not Found'] = ['Goku', 'Vegeta'];
console.error('Personaje 3:', trunks);
export {};