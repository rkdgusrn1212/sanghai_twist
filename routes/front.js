const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/list/*/*/*/', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-front-app/build/index.html'));
});

router.get('/detail/*/*/', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-front-app/build/index.html'));
});

router.get('/closet', (req, res) => {
  res.sendFile(path.join(__dirname, '../react-front-app/build/index.html'));
});

router.use(
  '/',
  express.static(path.join(__dirname, '../react-front-app/build')),
);

module.exports = router;
