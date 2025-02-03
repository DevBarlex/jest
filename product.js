let products = [] //lista vacía
let id = 0

// Reinicia la lista de productos
function resetProducts() {
    products = [];
    id = 0;
}


// Agrega un producto
function addProduct(name, price) {
    if (!name || !price) {
        throw new Error('El nombre y el precio del producto son obligatorios.');
    }
    if (isNaN(price) || price <= 0) {
        throw new Error('El precio debe ser un número positivo.');
    }
    if (products.some(product => product.name === name)) {
        throw new Error('El producto ya existe.');
    }

    id++; // Incrementamos el id
    products.push({ id, name, price });
}


// Elimina un producto
function removeProduct(id) {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
        throw new Error('El producto no existe.');
    }
    products.splice(index, 1);
}

// Obtiene todos los productos
function getProducts() {
    return products;
}

// Obtiene un producto por su id
function getProduct(id) {
    const product = products.find(product => product.id === id);
    if (!product) {
        throw new Error('El producto no existe.');
    }
    return product;
}

// Actualiza un producto por su id
function updateProduct(id, name, price) {
    const product = products.find(product => product.id === id);
    if (!product) {
        throw new Error('El producto no existe.');
    }
    if (name) product.name = name;
    if (price) product.price = price;
}

module.exports = { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct };
