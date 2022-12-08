const axios = require('axios');
const convert = require('xml-js');
const iconv = require('iconv-lite');
const apiKey = require('../../config/apiKey.json');

/**
 * code 상품코드이다.
 * option
 * - QAs: 상품Q&A 조회 결과 요청
 * - PostScripts: 사용후기 조회 결과 요청
 * - PdOption: 상품 옵션 정보 조회 결과 요청
 * @param {code, opt} query
 * @returns 완성된 요청 url
 */
const getApiRequest = (query) => {
  let url = `http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${apiKey.key}&apiCode=ProductInfo`;
  if (query.code) url += `&productCode=${query.code}`;
  if (query.opt) url += `&option=${query.opt}`;
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
    .then((result) => ({
      code: result.ProductInfoResponse.Product.ProductCode._text,
      name: result.ProductInfoResponse.Product.ProductName._cdata,
      price: {
        origin: result.ProductInfoResponse.Product.ProductPrice.Price._text,
        lowest:
          result.ProductInfoResponse.Product.ProductPrice.LowestPrice._text,
      },
      image: result.ProductInfoResponse.Product.BasicImage._cdata,
      shipFee: result.ProductInfoResponse.Product.ShipFee._text,
      satisfaction: result.ProductInfoResponse.Product.SellSatisfaction._text,
    }))
    .catch((error) => console.log(error.message)); //response의 인코딩은 euc-kr이지만 axios에서 디코딩이 지원 안되기 때문에 iconv 사용
  return result;
};
