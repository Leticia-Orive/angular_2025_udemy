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

    // Constructor tradicional compatible con erasableSyntaxOnly
    constructor(name: string, address: string = 'No Address') {
        this.name = name;
        this.address = address;
    }

  
}

const ironman = new Person('Ironman', 'New York');
console.log(ironman);
