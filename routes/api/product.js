const express = require('express');
const router = express.Router();
const productInfo = require('../../services/eleven/productInfo');

router.get('/:code', async (req, res) => {
  res.json(
    await productInfo({
      opt: req.query.opt,
      code: req.params.code,
    }),
  );
});

module.exports = router;
