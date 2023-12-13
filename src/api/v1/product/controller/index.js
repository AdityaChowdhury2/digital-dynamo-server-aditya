const addProduct = require("../../../../lib/products/addProduct");
const deleteProductById = require("../../../../lib/products/deleteProductById");
const getProductByProductId = require("../../../../lib/products/getProductByProductId");
const getProductsByBrand = require("../../../../lib/products/getProductsByBrand");
const updateProduct = require("../../../../lib/products/updateProduct");

const productByBrandName = async (req, res, next) => {
    try {
        const brand = req.params.brand;
        const result = await getProductsByBrand(brand);
        res.send(result);

    } catch (error) {
        next(error);
    }
}

const productAdd = async (req, res, next) => {
    try {
        const product = req.body;
        const result = await addProduct(product)
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const productUpdate = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = req.body;
        const result = await updateProduct({ productId, product })
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const productDetails = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const result = await getProductByProductId(productId);
        res.send(result);
    } catch (error) {
        next(error)
    }
}

const productDelete = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const result = await deleteProductById(productId);
        res.send(result);
    } catch (error) {
        next(error)
    }
}

module.exports = { productByBrandName, productAdd, productUpdate, productDetails, productDelete }