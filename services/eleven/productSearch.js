const axios = require('axios');
const convert = require('xml-js');
const iconv = require('iconv-lite');
const apiKey = require('../../config/apiKey.json');

/**
 * key, apiCode, keyword, pageNum(default 1) 필수
 * pageSize(default 50)
 * sortCd(CP:인기, A: 판매순, G:평가높은순, I:후기/리뷰순, L:낮은 가격순, H:높은 가격순, N: 최근 등록순),
 * option 부가 정보 요청(Categories: 카테고리 검색 결과 요청),
 * targetSearchPrd 검색 대상(ENG 영문 상품, (Default) KOR 국문 상품)
 *
 * 사용자로부터 kwd, pg, srt 파라미터만 받음.
 */
const getApiRequest = (query) => {
  let url = `http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${apiKey.key}&apiCode=ProductSearch&pageSize=12&option=Categories`;
  let keyword = ''; //키워드는 반드시 있어야함
  if (query.kwd) keyword += query.kwd;
  url += `&keyword=${keyword}`;
  if (query.pg) url += `&pageNum=${query.pg}`;
  if (query.srt) url += `&sortCd=${query.srt}`;
  return url;
};

/**
 * 11번가의 상품검색을 수행한 결과를 비동기로 반환.
 * @param {kwd, pg, srt} query
 * @returns 키워드를 포함한 product와 그를 포함한 카테고리들을 반환.
 */
module.exports = async (query) => {
  let result = await axios({
    method: 'get',
    url: getApiRequest(query),
    responseType: 'arraybuffer', //arraybuffer를 해야 size가 정의되고 iconv.decode를 사용가능.
  })
    .then((response) =>
      JSON.parse(
        convert.xml2json(iconv.decode(response.data, 'euc-kr'), {
          compact: true,
          ignoreAttributes: true,
          ignoreDeclaration: true,
        }), //response의 인코딩은 euc-kr이지만 axios에서 디코딩이 지원 안되기 때문에 iconv 사용.
      ),
    )
    .then((result) => ({
      products: {
        count: result.ProductSearchResponse.Products.TotalCount._text,
        items: result.ProductSearchResponse.Products.Product.map((prod) => ({
          code: prod.ProductCode._text,
          name: prod.ProductName._cdata,
          price: prod.ProductPrice._text,
          image: prod.ProductImage300._cdata,
        })),
      },
      categories: result.ProductSearchResponse.Categories.Category.map(
        (cat) => ({
          count: cat.CategoryPrdCnt._text,
          name: cat.CategoryName._cdata,
          url: cat.CategoryUrl._text,
        }),
      ),
    }))
    .catch((error) => console.log(error.message));
  return result;
};
