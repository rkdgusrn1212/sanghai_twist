const express = require('express');
const router = express.Router();
const dress = require('./dress');

/**
 * API 요청에 대한 라우팅 정의
 */
router.use('/dress', dress);

module.exports = router;
