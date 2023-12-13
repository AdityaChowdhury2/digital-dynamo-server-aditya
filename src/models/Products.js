const { model, Schema } = require('mongoose')

const ProductSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Phone', 'TV', 'Monitor', 'Kitchen Appliance', 'Gaming Console', 'Camera', 'Watch', 'Laptop', 'Accessories', 'Tablet', 'Headphone', 'PC'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0.5,
        max: 5.0,
        required: true,
    }
})

const Product = model('Product', ProductSchema)

module.exports = Product;