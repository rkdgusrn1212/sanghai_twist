const express = require('express');
const router = express.Router();
const category = require('./category');

/**
 * API 요청에 대한 라우팅 정의
 */

router.use('/category', category);

module.exports = router;
