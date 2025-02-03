const { resetProducts,  addProduct, removeProduct, getProducts, getProduct, updateProduct} = require('./product');

beforeEach(() => {
    resetProducts(); // Resetear la lista antes de cada prueba
});

describe('Adding Products', () => {
    test('should add a product', () => {
        addProduct('Laptop', 1000);
        const products = getProducts();
        expect(products).toHaveLength(1);
        expect(products[0].name).toBe('Laptop');
        expect(products[0].price).toBe(1000);
        expect(() => addProduct('Laptop')).toThrow('El nombre y el precio del producto son obligatorios.');
    });

    test('should increment the id by 1 each time a product is added', () => {
        addProduct('Laptop', 1000);
        addProduct('Phone', 500);
        const products = getProducts();
        expect(products[1].id).toBe(2);
    });

    test('should throw an error if the name or price is not defined', () => {
        expect(() => addProduct('Laptop')).toThrow('El nombre y el precio del producto son obligatorios.');
        expect(() => addProduct(null, 1000)).toThrow('El nombre y el precio del producto son obligatorios.');
    });

    test('should throw an error if the product already exists', () => {
        addProduct('Laptop', 1000);
        expect(() => addProduct('Laptop', 1000)).toThrow('El producto ya existe.');
    });
});

describe('Removing Products', () => {
    test('should remove a product', () => {
        addProduct('Laptop', 1000);
        const productsBefore = getProducts();
        expect(productsBefore).toHaveLength(1);
        
        removeProduct(1);
        const productsAfter = getProducts();
        expect(productsAfter).toHaveLength(0);
    });

    test('should throw an error if the product does not exist', () => {
        expect(() => removeProduct(1)).toThrow('El producto no existe.');
    });
});

describe('Getting a Product', () => {
    test('should return a product by its id', () => {
        addProduct('Laptop', 1000);
        const product = getProduct(1);
        expect(product.name).toBe('Laptop');
        expect(product.price).toBe(1000);
    });

    test('should throw an error if the product does not exist', () => {
        expect(() => getProduct(1)).toThrow('El producto no existe.');
    });
});

describe('Updating Products', () => {
    test('should update a product by its id', () => {
        addProduct('Laptop', 1000);
        updateProduct(1, 'Gaming Laptop', 1500);
        const product = getProduct(1);
        expect(product.name).toBe('Gaming Laptop');
        expect(product.price).toBe(1500);
    });

    test('should throw an error if the product does not exist', () => {
        expect(() => updateProduct(1, 'Gaming Laptop', 1500)).toThrow('El producto no existe.');
    });

    test('should only update the name if the price is not provided', () => {
        addProduct('Laptop', 1000);
        updateProduct(1, 'Gaming Laptop');
        const product = getProduct(1);
        expect(product.name).toBe('Gaming Laptop');
        expect(product.price).toBe(1000);
    });

    test('should only update the price if the name is not provided', () => {
        addProduct('Laptop', 1000);
        updateProduct(1, null, 1500);
        const product = getProduct(1);
        expect(product.name).toBe('Laptop');
        expect(product.price).toBe(1500);
    });
});