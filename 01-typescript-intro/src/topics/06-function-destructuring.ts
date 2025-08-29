
export interface Product{
    description: string;
    price: number;
}

const phone: Product = {
    description: 'Nokia A1',
    price: 150.0
}

const tablet: Product = {
    description: 'iPad Air',
    price: 250.0
};

 interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

//creamos una función que le voy a mandar un objeto
function taxCalculation( options: TaxCalculationOptions ): number[] {
    let total = 0;
    options.products.forEach( product  => {
        /*ESTA ES UNA FORMA 
        total = total + product.price;*/
        /*OTRA FORMA*/
        total += product.price;    
});
    return [total, total * options.tax];

}

//creamos una constante
const shoppingCart = [phone, tablet];
const tax = 0.15;

const result = taxCalculation({
    products: shoppingCart,
    /**Esta es una opcion cuando se repite el mismo valor 
    tax: tax*/
    /**para simplificarlo y ponerlo bonito */
    tax
});

console.log('Total', result[0]);
console.log('Tax', result[1]);

