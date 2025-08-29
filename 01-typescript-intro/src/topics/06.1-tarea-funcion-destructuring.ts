// Definimos la interfaz para los productos
interface Product {
    description: string;
    price: number;
}


// Creamos dos productos usando la interfaz Product
const phone: Product = {
    description: 'Nokia A1',
    price: 150.0
};

const tablet: Product = {
    description: 'iPad Air',
    price: 250.0
};

// Interfaz para las opciones de cálculo de impuestos
interface TaxCalculationOptions {
    tax: number;
    products: Product[];
}

/**Esta es una forma de destructurar pero no es la mejor porque si tienes varios objetos se puede extender 
// Función que calcula el total y el impuesto usando destructuración
function taxCalculation({ tax, products }: TaxCalculationOptions): number[] {
    let total = 0;
    // Desestructuramos el producto dentro del forEach
    products.forEach(({ price }) => {
        total += price;
    });
    // Retornamos un arreglo con el total y el impuesto calculado
    return [total, total * tax];
}
*/
/**Esta es la mejor forma de destructurar */
function taxCalculation(options: TaxCalculationOptions): [number, number] {
    //const { tax, products } = options;
    let total = 0;
    options.products.forEach(({ price }) => {
        total += price;
    });
    return [total, total * options.tax];
}

// Creamos el carrito de compras y el valor del impuesto
const shoppingCart: Product[] = [phone, tablet];
const tax = 0.15;

// Llamamos a la función y desestructuramos el resultado
const [total, taxAmount] = taxCalculation({
    products: shoppingCart,
    tax
});

console.log('Total', total); // Mostramos el total
console.log('Tax', taxAmount); // Mostramos el impuesto

// Exportación vacía para convertir el archivo en un módulo
export {};