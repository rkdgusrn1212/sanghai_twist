const axios = require('axios');
const convert = require('xml-js');
const iconv = require('iconv-lite');
const apiKey = require('../../config/apiKey.json');

/**
 * code 카테고리코드이다.
 * sortCd(CP:인기, A: 판매순, G:평가높은순, I:후기/리뷰순, L:낮은 가격순, H:높은 가격순, N: 최근 등록순),
 * @param {code, pg, srt, size} query
 * @returns 완성된 요청 url
 */
const getApiRequest = (query) => {
  let url = `http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${apiKey.key}&apiCode=CategoryInfo&option=Products`;
  if (query.code) url += `&categoryCode=${query.code}`;
  if (query.pg) url += `&pageNum=${query.pg}`;
  if (query.srt) url += `&sortCd=${query.srt}`;
  let pageSize = 12;
  if (query.size && query.size > 0) pageSize = query.size;
  url += `&pageSize=${pageSize}`;
  return url;
};

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
        }),
      ),
    )
    .then((result) => {
      console.log(result);
      return {
        products: {
          count: result.CategoryResponse.Products.TotalCount._text,
          items:
            result.CategoryResponse.Products.Product &&
            (result.CategoryResponse.Products.Product.map
              ? result.CategoryResponse.Products.Product.map((prod) => ({
                  code: prod.ProductCode._text,
                  name: prod.ProductName._cdata,
                  price: prod.ProductPrice._text,
                  image: prod.ProductImage300._cdata,
                }))
              : {
                  code: result.CategoryResponse.Products.Product.ProductCode
                    ._text,
                  name: result.CategoryResponse.Products.Product.ProductName
                    ._cdata,
                  price:
                    result.CategoryResponse.Products.Product.ProductPrice._text,
                  image:
                    result.CategoryResponse.Products.Product.ProductImage300
                      ._cdata,
                }),
        },
        category: {
          name: result.CategoryResponse.Category.CategoryName._cdata,
          code: result.CategoryResponse.Category.CategoryCode._text,
        },
      };
    })
    .catch((error) => console.log(error.message)); //response의 인코딩은 euc-kr이지만 axios에서 디코딩이 지원 안되기 때문에 iconv 사용
  return result;
};
