const Brands = require("../../models/Brands")

const getAllBrands = async () => {
    const cursor = await Brands.find();
    return cursor
}

module.exports = getAllBrands