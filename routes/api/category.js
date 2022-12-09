const express = require('express');
const router = express.Router();
const categoryInfo = require('../../services/eleven/categoryInfo');
const getCatSet = require('../../services/getCatSet');

router.get('/', async (req, res) => {
  res.json(await getCatSet());
});

router.get('/:code', async (req, res) => {
  res.json(
    await categoryInfo({
      pg: req.query.pg,
      srt: req.query.srt,
      code: req.params.code,
    }),
  );
});

module.exports = router;
