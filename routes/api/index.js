const express = require('express');
const router = express.Router();
const productSearch = require('../../services/eleven/productSearch');
const categoryInfo = require('../../services/eleven/categoryInfo');
const getCatSet = require('../../services/getCatSet');


/**
 * API 요청에 대한 라우팅 정의
 */
router.use('/product', async (req, res)=>{
    res.send(await productSearch(req.query));
});


router.use('/category', async (req, res)=>{
    res.send(await categoryInfo(req.query));
});

router.use('/set', async (req, res)=>{
    res.send(await getCatSet());
});

module.exports = router;
