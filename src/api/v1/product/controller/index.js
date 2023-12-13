const getProductsByBrand = require("../../../../lib/products/getProductsByBrand");

const productByBrandName = async (req, res, next) => {
    try {
        const brand = req.params.brand;
        const result = await getProductsByBrand(brand);
        res.send(result);

    } catch (error) {
        next(error);
    }
}

module.exports = { productByBrandName }