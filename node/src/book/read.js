const fs = require("fs");
const path = require("path");

const getFiles = (dir) => {
  const files = fs.readdirSync(dir);
  let fileArr = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const readHtmlFile = fs.readFileSync(filePath, "utf-8");
    fileArr.push(readHtmlFile);
  });
  return fileArr;
};
module.exports = { getFiles };
