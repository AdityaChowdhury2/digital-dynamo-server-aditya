const express = require('express');
const { productByBrandName } = require('../../../api/v1/product/controller');
const router = express.Router();

router.get('/api/v1/get-product/:brand', productByBrandName)


module.exports = router;