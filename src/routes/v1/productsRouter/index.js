const express = require('express');
const { productByBrandName, productAdd, productUpdate, productDetails, productDelete } = require('../../../api/v1/product/controller');
const router = express.Router();

router.get('/api/v1/get-product/:brand', productByBrandName)
router.post('/api/v1/products', productAdd);
router.patch('/api/v1/products/:productId', productUpdate);
router.get('/api/v1/products/:productId', productDetails)
router.delete('/api/v1/products/:productId', productDelete)

module.exports = router;