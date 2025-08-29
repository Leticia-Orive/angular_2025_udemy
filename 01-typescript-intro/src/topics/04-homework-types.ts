/*
    ===== Código de TypeScript =====
*/
interface SuperHero {
    name:string;
    age:number;
    address:Address;
    showAddress: () => string;
}
/**cuando dentro de una interfaz haya un objecto es aconsejable que se 
 * haga otra interfaz para ese objeto
 */
interface Address {
    street: string;
    country: string;
    city: string;
}

const superHeroe: SuperHero = {
    name: 'Spiderman',
    age: 30,
    address: {
        street: 'Main St',
        country: 'USA',
        city: 'NY'
    },
    showAddress() {
        return this.name + ', ' + this.address.city + ', ' + this.address.country;
    }
}


const address = superHeroe.showAddress();
console.log( address );

//con f2 cambia todo de una vez lo que tenga el mismo nombre


export {};