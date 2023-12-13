const express = require('express');
const { allBrands } = require('../../../api/v1/brands/controller');
const router = express.Router();

// get all brands for homepage
router.get('/api/v1/brands', allBrands);

module.exports = router;

