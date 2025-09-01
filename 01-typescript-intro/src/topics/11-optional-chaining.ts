//encadenamiento opcional 
export interface Passenger {
    name: string;
    children?: string[];
}

//pasajeros
const passenger1: Passenger = {
    name: 'John Doe'        
};

const passenger2: Passenger = {
    name: 'Fernando',
    children: ['Sara', 'Alex']
};
//tiene que devolver si los pasajeros tienen hijos(el numero de hijos y nombres) y si no tiene indicar 0
//si no tiene hijos entonces imprimir 'No tiene hijos'
//si tiene hijos entonces imprimir 'tiene ' + numero de hijos + ' hijos'
//y despues imprimir los nombres de los hijos separados por coma


function checkChildren(passenger: Passenger): void {
    if (!passenger.children || passenger.children.length === 0) {
        console.log(passenger.name, 'No tiene hijos');
    } else {
        console.log(passenger.name, 'tiene ' + passenger.children.length + ' hijos');
        console.log('son: ' + passenger.children.join(', '));
    }
}

checkChildren(passenger1);
checkChildren(passenger2);