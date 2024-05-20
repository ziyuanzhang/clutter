var fs = require("fs");
const path = require("path");

const readJsonFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
};
const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};
const getArrayFromJson = (jsonData) => {
  return jsonData[Object.keys(jsonData)[0]];
}; //------------------------------------------------------
const bookmarksRes = readJsonFile(
  path.join(__dirname, "./static/output-chrome.json")
);
const bookmarksArr = getArrayFromJson(bookmarksRes);

const favoritesRes = readJsonFile(
  path.join(__dirname, "./static/output-edge.json")
);
const favoritesArr = getArrayFromJson(favoritesRes);
//----------------------------------------------------------
const bookmarksPathCompate = path.join(
  __dirname,
  "./static/compate/bookmarks_chrome_output.json"
);
const favoritesPathCompate = path.join(
  __dirname,
  "./static/compate/bookmarks_edge_output.json"
);
const equalPathCompate = path.join(
  __dirname,
  "./static/compate/bookmarks_equal_output.json"
);
//--------------------------------------------
const processArr = (arr1, arr2, aloneArr1, equalArr) => {
  arr1.forEach((item) => {
    if (item.name) {
      const isEqual = arr2.some((ele) => item.href === ele.href);
      if (isEqual) {
        equalArr.push(item);
      } else {
        aloneArr1.push(item);
      }
    } else {
      const key = Object.keys(item)[0];
      const itemArr = item[key];
      let tempArr = [];
      let tempNotArr = [];
      let tempisEqual = arr2.some((OO) => Object.keys(OO)[0] == key);
      if (tempisEqual) {
        arr2.forEach((ele) => {
          if (ele[key]) {
            itemArr.forEach((obj) => {
              const isEqual = ele[key].some((OO) => OO.href === obj.href);
              if (isEqual) {
                tempArr.push(obj);
              } else {
                tempNotArr.push(obj);
              }
            });
          }
        });
        aloneArr1.push({ [key]: tempNotArr });
      } else {
        aloneArr1.push(item);
      }
      equalArr.push({ [key]: tempArr });
    }
  });
};

const compareArrays = (arr1, arr2) => {
  let equalArr = [];
  let aloneArr1 = [];
  let aloneArr2 = [];

  processArr(arr1, arr2, aloneArr1, equalArr);
  equalArr = []; //丢掉一份
  processArr(arr2, arr1, aloneArr2, equalArr);

  return {
    equalArr,
    aloneArr1,
    aloneArr2
  };
};

const result = compareArrays(bookmarksArr, favoritesArr);
writeJsonFile(bookmarksPathCompate, result.aloneArr1);
writeJsonFile(favoritesPathCompate, result.aloneArr2);
writeJsonFile(equalPathCompate, result.equalArr);
