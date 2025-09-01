/** La pablabra public se va poder ve desde el mundo exterior 
     * Si seria private no se podria ver desde el mundo exterior
     * Si seria protected solo se podria ver desde la clase y las clases que heredan de ella
    */
/**En angular si que se pone asi pero TypesScript se pone de otra manera
 * public name: string ; // añades | undefined para que no te de error y otra forma es poner ?
    private address: string;
 */


export class Person {
    //public name: string;
    //private address: string;
    public firstName: string;
    public lastName: string;
    private address: string;

    // Constructor tradicional compatible con erasableSyntaxOnly
    constructor(firstName: string,
        lastName: string,
        address: string = 'No Address') {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }

  
}
/*export class Hero extends Person {
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
    ) {
        //super: funcion especial que le indica .ts que tiene que llamar al
    //constructor padre
        super(realName, 'New York');
    }    
}*/
export class Hero {
    //creamos una nueva propiedad
    //public person: Person;
    public alterEgo: string;
    public age: number;
    public realName: string;
    public person: Person;
    
    constructor(
        alterEgo: string,
        age: number,
        realName: string,
        person: Person,
    ) {
        this.alterEgo = alterEgo;
        this.age = age;
        this.realName = realName;
        this.person = person;
       //this.person = new Person(realName);
    }
}
const person = new Person('Leticia','lopez', 'New York');
const ironman = new Hero('Ironman',45, 'New York', person);
console.log(ironman);