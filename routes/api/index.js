const express = require('express');
const router = express.Router();
const category = require('./category');
const product = require('./product');

/**
 * API 요청에 대한 라우팅 정의
 */

router.use('/category', category);
router.use('/product', product);

module.exports = router;
