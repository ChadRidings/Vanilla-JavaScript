'use strict';

function onReady() {
    const products = [
        { vendor: 'A', product: 'Widget', price: 10, sku: '00123' },
        { vendor: 'A', product: 'Gadget', price: 15, sku: '00625' },
        { vendor: 'B', product: 'Widget', price: 8, sku: '007589' },
        { vendor: 'B', product: 'Gadget', price: 20, sku: '00328' },
        { vendor: 'A', product: 'Widget', price: 5, sku: '00235' },
        { vendor: 'D', product: 'Gadget', price: 13, sku: '00659' },
        { vendor: 'A', product: 'Widget', price: 5, sku: '00946' },
        { vendor: 'C', product: 'Widget', price: 5, sku: '003498' },
        { vendor: 'C', product: 'Gadget', price: 12, sku: '00648' }
    ];

    const lowestVendorsPerProduct = products.reduce((acc, item) => {
        const { product, price } = item;

        if (!acc[product] || price < acc[product][0].price) {
            acc[product] = [item]; // Start a new array with the lowest price product
        } else if (price === acc[product][0].price) {
            acc[product].push(item); // Add if the price matches the lowest found
        }

        return acc;
    }, {});

    // Flatten to an array
    const result = Object.values(lowestVendorsPerProduct).flat();

    console.log(result);
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
