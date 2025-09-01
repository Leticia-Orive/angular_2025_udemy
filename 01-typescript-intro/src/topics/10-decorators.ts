//Un decorador es una simple funcion
//El classDecorator se puede poner en las propiedades de una clase y tambien en los metodos de la clase
function classDecorator<T extends {new (...args:any[]) : {}}>(
    constructor: T){
        return class extends constructor {
            newProperty = 'new property';
            hello = 'override';
            //Tambien puede ser simbolos

        }
}


@classDecorator
export class SuperClass {
    //@classDecorator
    public myProperty: string = 'Abc123';

    //@classDecorator
    print(){
        console.log('Hello World');
    }
}

console.log( SuperClass);

// creamos una instancia de eso

const myClass = new SuperClass();
console.log(myClass);