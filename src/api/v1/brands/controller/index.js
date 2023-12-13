const getAllBrands = require("../../../../lib/brands/getAllBrands")

const allBrands = async (req, res, next) => {
    try {
        console.log(req.url);
        const result = await getAllBrands();
        res.send(result)
    } catch (error) {
        next(error);
    }
}
module.exports = { allBrands }