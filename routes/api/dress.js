const express = require('express');
const router = express.Router();

//옷 검색에 대한 요청 결과를 반환.
/**
 * key, apiCode, keyword, pageNum 필수
 * pageSize, sortCd, option, targetSearchPrd 옵션
 */
router.get('/', (req, res) => {
  res.send('옷 요청 결과!');
});
module.exports = router;
