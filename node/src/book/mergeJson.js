let SArr = [];
let keyArr = [];
const transformObject = (arr) => {
  let obj = {};
  arr.forEach((item) => {
    if (item.name) {
      SArr.push(item);
    } else {
      if (Object.values(item)[0].length > 0) {
        obj = Object.assign(obj, item);

        keyArr.push(Object.keys(item));
      }
    }
  });
  return obj;
};

const fn = (paramArr) => {
  if (paramArr.length === 1) {
    // console.log("-----------");
    return { 书签栏: paramArr };
  } else {
    let tempArr = [];
    let tempObj = [];
    for (let i = 0; i < paramArr.length; i++) {
      let obj = transformObject(paramArr[i]);
      if (Object.keys(obj).length > 0) {
        tempArr.push(obj);
      }
    }
    // console.log("tempArr:", tempArr);
    keyArr = [...new Set(keyArr)];
    // console.log("keyArr:", keyArr);

    tempArr.forEach((obj) => {
      keyArr.forEach((key) => {
        if (tempObj[key]) {
          if (obj[key]) {
            tempObj[key] = [...tempObj[key], ...obj[key]];
          }
        } else {
          tempObj[key] = obj[key];
        }
      });
    });
    // console.log("tempObj:", tempObj);

    let finalArr = Object.keys(tempObj).map((key) => {
      return { [key]: tempObj[key] };
    });
    finalArr = [...finalArr, ...SArr];
    // console.log("finalArr:", finalArr);
    // console.log("-----2------");
    return { 书签栏: finalArr };
  }
};
module.exports = { fn };
