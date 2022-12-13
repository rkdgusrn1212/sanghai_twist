//const product = require('./eleven/productSearch');

/**
 * 전체 의류 카테고리 집합을 반환
 */
/*
module.exports = async () => {
  let result = await product({});
  if (!result) {
    //애러일땐 undefined or null
    return null;
  }
  let selected = [];
  for (let cat of result.categories) {
    if (cat.name.includes('의류') || cat.name.includes('패션')) {
      selected.push({
        name: cat.name,
        code: cat.url.slice(cat.url.indexOf('dispCtgrNo=') + 11), //code가 despCtgtNo=뒤에옴
      });
    }
  }
  return selected;
};
*/
//검색에 안나오는 카테고리가 태반이고, Child 카테고리가 안뜨므로 직접 사이트 카테고리를 따옴
const categories = [
  {
    name: '브랜드 남성의류',
    code: 1001296,
    child: [
      { name: '셔츠/남방', code: 1001718, top: true },
      { name: '티셔츠', code: 1001719, top: true },
      { name: '바지/팬츠', code: 1001721, top: false },
      { name: '조끼/베스트', code: 1001717, top: true },
      { name: '니트/스웨터', code: 1001716, top: true },
      { name: '카디건', code: 1001715, top: true },
      { name: '재킷', code: 1001713, top: true },
      { name: '코트', code: 1001712, top: true },
      { name: '점퍼', code: 1001714, top: true },
    ],
  },
  {
    name: '브랜드 여성의류',
    code: 1001295,
    child: [
      { name: '원피스', code: 1001768, top: true },
      { name: '블라우스', code: 1001764, top: true },
      { name: '티셔츠', code: 1001766, top: true },
      { name: '셔츠', code: 1001765, top: true },
      { name: '니트/스웨터', code: 1001762, top: true },
      { name: '카디건', code: 1001761, top: true },
      { name: '베스트/조끼', code: 1001763, top: true },
      { name: '바지/팬츠', code: 1001770, top: false },
      { name: '스커트/치마', code: 1001769, top: true },
      { name: '청바지', code: 1001771, top: false },
      { name: '레깅스', code: 1001767, top: false },
      { name: '점퍼', code: 1001760, top: true },
      { name: '재킷', code: 1001759, top: true },
      { name: '코트', code: 1001758, top: true },
      {
        name: '트레이닝복',
        code: 1001773,
        child: [
          {
            name: '트레이닝 상의',
            code: 1010261,
            top: true,
          },
          {
            name: '트리이닝 하의',
            code: 1010263,
            top: false,
          },
        ],
      },
    ],
  },
];

const classifyTop = (category, top, pants) => {
  let [tempTop, tempPants] = [[], []];
  if (category.child) {
    for (let subCat of category.child) {
      classifyTop(subCat, tempTop, tempPants);
    }
    top.push({ name: category.name, code: category.code, child: tempTop });
    pants.push({ name: category.name, code: category.code, child: tempPants });
  } else {
    if (category.top) {
      top.push(category);
    } else {
      pants.push(category);
    }
  }
};

module.exports = () => {
  let top = [];
  let pants = [];
  for (let category of categories) {
    classifyTop(category, top, pants);
  }
  return {
    categories: categories,
    top: top,
    pants: pants,
  };
};
