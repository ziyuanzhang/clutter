const processArr = (paramArr) => {
  //console.log("processArr-typeof:", Array.isArray(paramArr));
  let newArr = [];
  paramArr.forEach((item) => {
    // console.log("type:", typeof item);
    let tempItem = JSON.parse(item);
    newArr.push(tempItem[Object.keys(tempItem)[0]]);
  });
  //------------------
  let commonArr = [];
  let aloneArr = [];
  for (let i = 0; i < newArr.length; i++) {
    commonArr[i] = [];
    aloneArr[i] = [];
    //第j个书签(文件夹)
    for (let j = 0; j < newArr[i].length; j++) {
      if (newArr[i][j].name) {
        let isEqual = false;
        for (let m = i + 1; m < newArr.length; m++) {
          for (let n = 0; n < newArr[m].length; n++) {
            if (newArr[i][j].href === newArr[m][n].href) {
              isEqual = true;
              commonArr[i].push(newArr[i][j]);
              newArr[m].splice(n, 1);
              break;
            }
          }
        }
        if (!isEqual) {
          aloneArr[i].push(newArr[i][j]);
        }
      } else {
        const key = Object.keys(newArr[i][j])[0];
        const valueArr = Object.values(newArr[i][j])[0];
        let tempArr = [];
        let tempNotArr = [];
        let isEqual = false;
        //第j个书签的q项
        for (let q = 0; q < valueArr.length; q++) {
          isEqual = false;
          //浏览器
          for (let m = i + 1; m < newArr.length; m++) {
            //浏览器的书签
            for (let n = 0; n < newArr[m].length; n++) {
              if (newArr[m][n].name) {
                if (newArr[m][n].href === valueArr[q].href) {
                  tempArr.push(valueArr[q]);
                  isEqual = true;
                  newArr[m].splice(n, 1);

                  break;
                }
              } else {
                const tempKey = Object.keys(newArr[m][n])[0];
                const tempValueArr = Object.values(newArr[m][n])[0];
                for (let k = 0; k < tempValueArr.length; k++) {
                  if (tempValueArr[k].href === valueArr[q].href) {
                    tempArr.push(valueArr[q]);
                    isEqual = true;
                    tempValueArr.splice(k, 1);
                    // console.log(`333333:i-${i}, j-${j}, q-${q}`);
                    break;
                  }
                }
              }
            }
          }
          if (!isEqual) {
            tempNotArr.push(valueArr[q]);
          }
        }
        commonArr[i].push({ [key]: tempArr });
        aloneArr[i].push({ [key]: tempNotArr });
      }
    }
  }
  // console.log("commonArr:", commonArr);
  // console.log("aloneArr:", aloneArr);
  return { commonArr, aloneArr };
};

module.exports = { processArr };
