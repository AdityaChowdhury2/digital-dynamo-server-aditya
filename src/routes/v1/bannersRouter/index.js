const express = require('express');
const bannerByBrand = require('../../../api/v1/banner/controller');
const router = express.Router();

router.get('/api/v1/banners/:brand', bannerByBrand)

module.exports = router