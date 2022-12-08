const product = require('./eleven/productSearch');

/**
 * 전체 의류 카테고리 집합을 반환
 */
module.exports = async () => {
  let result = await product({});
  if (!result) {
    //애러일땐 undefined or null
    return null;
  }
  let selected = [];
  for(let cat of result.categories){
    if(cat.name.includes("의류")||cat.name.includes("패션")){
      selected.push(({
        name : cat.name,
        code : cat.url.slice(cat.url.indexOf("dispCtgrNo=")+11)//code가 despCtgtNo=뒤에옴
      }));
    }
  }
  return selected;
};
