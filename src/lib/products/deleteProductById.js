const Product = require("../../models/Products")

const deleteProductById = async (productId) => {
    const cursor = await Product.deleteOne({ _id: productId })
    return cursor
}
module.exports = deleteProductById