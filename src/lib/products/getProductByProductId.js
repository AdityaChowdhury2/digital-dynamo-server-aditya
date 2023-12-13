
const Product = require("../../models/Products")

const getProductByProductId = async (productId) => {
    const cursor = await Product.findById(productId)
    return cursor;
}

module.exports = getProductByProductId