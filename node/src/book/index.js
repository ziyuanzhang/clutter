const path = require("path");
const read = require("./read");
const transformJson = require("./transformJson");
const matchArrange = require("./matchArrange");
const write = require("./write");
const mergeJson = require("./mergeJson");
const transformHtml = require("./transformHtml");
//----读取--------
const htmlArr = read.getFiles(path.join(__dirname, "./original"));
// console.log(htmlArr.length);
//----转为json--------
const jsonArr = transformJson.getJsonArr(htmlArr);
// write.writeFile(path.join(__dirname, "./intermediateSteps/jsonArr"), jsonArr);

//----比较过滤--------
const { commonArr, aloneArr } = matchArrange.processArr(jsonArr);
write.writeFile(
  path.join(__dirname, "./intermediateSteps/commonArr"),
  commonArr
);
write.writeFile(path.join(__dirname, "./intermediateSteps/aloneArr"), aloneArr);

// //----合并json-----------------
// let mark = mergeJson.fn([...commonArr, ...aloneArr]);
// // write.writeFile(path.join(__dirname, "./intermediateSteps/finalJson"), [mark]);
// //----输出结果-----------------
// let html = transformHtml.outputHtml(mark);
// write.writeFile(path.join(__dirname, "./finalHtml"), [html]);
