const Banners = require("../../models/Banners");

const getBannerByBrand = async (brand) => {
    const query = {
        name: { $regex: brand, $options: 'i' }
    }
    console.log(query);
    const cursor = await Banners.findOne(query);
    return cursor
}

module.exports = getBannerByBrand