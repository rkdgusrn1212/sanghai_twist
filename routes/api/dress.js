const express = require('express');
const router = express.Router();
const axios = require('axios');
const convert = require('xml-js');
const iconv = require('iconv-lite');
const apiKey = require('../../config/apiKey.json');

//옷 검색에 대한 요청 결과를 반환.
/**
 * key, apiCode, keyword, pageNum(default 1) 필수
 * pageSize(default 50)
 * sortCd(CP:인기, A: 판매순, G:평가높은순, I:후기/리뷰순, L:낮은 가격순, H:높은 가격순, N: 최근 등록순),
 * option 부가 정보 요청(Categories: 카테고리 검색 결과 요청),
 * targetSearchPrd 검색 대상(ENG 영문 상품, (Default) KOR 국문 상품)
 */
const getApiRequest = (query) => {
  let url = `http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${apiKey.key}&apiCode=ProductSearch`;
  for (const key in query) {
    console.log(key);
    url += `&${key}=${query[key]}`;
  }
  return url;
};

router.get('/', async (req, res) => {
  let result = await axios({
    method: 'get',
    url: getApiRequest(req.query),
    responseType: 'arraybuffer', //arraybuffer를 해야 size가 정의되고 iconv.decode를 사용가능.
  }).then((response) =>
    convert.xml2json(iconv.decode(response.data, 'euc-kr')),
  );//response의 인코딩은 euc-kr이지만 axios에서 디코딩이 지원 안되기 때문에 iconv 사용.
  res.send(result);
});
module.exports = router;
