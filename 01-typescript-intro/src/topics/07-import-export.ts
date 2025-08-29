
//Tambien lo podiamos a ver llamado modulos

import type { Product } from "./06-function-destructuring";
import { taxCalculation } from "./06.1-tarea-funcion-destructuring";

const shoppingCart: Product[] = [
    {
        description: 'Nokia',
        price: 100,
    },
    
    {
        description: 'iPad',
        price: 150,
    }
    
];
// Tax = 0.15%
const [total, tax] = taxCalculation({
    products: shoppingCart,
    tax: 0.15
});

console.log('Total', total);
console.log('Tax', tax);


