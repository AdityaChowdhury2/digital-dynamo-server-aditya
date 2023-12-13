const Product = require("../../models/Products");

const updateProduct = async ({ product, productId }) => {
    const query = { _id: productId };
    const updatedProduct = {
        $set: {
            ...product
        }
    }
    const cursor = await Product.updateOne(query,updatedProduct)
    return cursor
}

module.exports = updateProduct