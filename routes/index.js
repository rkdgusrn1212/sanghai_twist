const express = require('express');
const router = express.Router();
const path = require('path');
const api = require('./api');

router.use('/stwist-api', api);

router.use(
  '/stwist',
  express.static(path.join(__dirname, '../react-front-app/build')),
);

module.exports = router;
