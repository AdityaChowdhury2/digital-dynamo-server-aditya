const getBannerByBrand = require("../../../../lib/banners/getBannersByBrand");

const bannerByBrand = async (req, res, next) => {
    try {
        const brand = req.params.brand;
        const result = await getBannerByBrand(brand);
        res.send(result);
    } catch (error) {
        next(error);
    }
}

module.exports = bannerByBrand;