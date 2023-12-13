const Product = require("../../models/Products")

const addProduct = async (product) => {
    const cursor = await Product.create(product);
    return cursor
}
module.exports = addProduct