import './style.css'

//Aqui requerimos un modulo que esta encapsulado

//mando referencia a la carpeta topics y su archivo
//import './topics/01-basic-types';
//import './topics/02-object-interface';
import './topics/03-functions';

const app = document.querySelector<HTMLDivElement>('#app')!;


app.innerHTML = `Hola Mundo`;
  

console.log("Hola Mundo");
