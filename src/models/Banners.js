const { Schema, model } = require('mongoose');


const BannerSchema = new Schema({
    name: String,
    banner_images: [String],
})

const Banners = model("Banner", BannerSchema);

module.exports = Banners;