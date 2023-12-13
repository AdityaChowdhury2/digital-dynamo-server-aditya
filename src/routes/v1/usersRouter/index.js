const express = require('express');
const userUpdateController = require('../../../api/v1/user/controller');
const router = express.Router();

router.put('/api/v1/user/:uid', userUpdateController);

module.exports = router;