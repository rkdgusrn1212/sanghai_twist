const express = require('express');
const router = express.Router();
const api = require('./api');
const front = require('./front');

router.use('/stwist-api', api);

router.use('/stwist', front);

module.exports = router;
