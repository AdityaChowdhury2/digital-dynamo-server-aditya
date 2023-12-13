const Product = require("../../models/Products")

const getProductsByBrand = async (brand) => {
    const query = {
        brand: { $regex: brand, $options: 'i' }
    }
    const cursor = await Product.find(query);
    return cursor
}

module.exports = getProductsByBrand