const { Schema, model } = require('mongoose');


const BrandSchema = new Schema({
    name: String,
    brand_image: String,
})

const Brands = model("Brand", BrandSchema);

module.exports = Brands;