import './style.css'

//Aqui requerimos un modulo que esta encapsulado

//mando referencia a la carpeta topics y su archivo
//import './topics/01-basic-types';
//import './topics/02-object-interface';
//import './topics/03-functions';
//import './topics/03.1-funciones-con-objectos-argumentos'
//import './topics/04-homework-types'
//import './topics/05-basic-destructuring-objects';
//import './topics/05.1-basic-destructuring-areglos';
//import './topics/06-function-destructuring';
//import './topics/06.1-tarea-funcion-destructuring';
//import './topics/07-import-export';
//import './topics/08-classes';
//import './topics/08.1-classes-constructor';
//import './topics/08.2-clases-herencia';
//import './topics/08.3-clases-priorizar-herencia';
import './topics/09-generics';

const app = document.querySelector<HTMLDivElement>('#app')!;


app.innerHTML = `Hola Mundo`;
  

console.log("Hola Mundo");
