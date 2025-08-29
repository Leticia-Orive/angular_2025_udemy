/** La pablabra public se va poder ve desde el mundo exterior 
     * Si seria private no se podria ver desde el mundo exterior
     * Si seria protected solo se podria ver desde la clase y las clases que heredan de ella
    */
/**En angular si que se pone asi pero TypesScript se pone de otra manera
 * public name: string ; // añades | undefined para que no te de error y otra forma es poner ?
    private address: string;
 */

export class Person {
    public name: string;
    private address: string;

    constructor(){
        this.name = 'Leticia';
        this.address = 'Calle Falsa 123';
    }
}

const ironman = new Person();
console.log( ironman );