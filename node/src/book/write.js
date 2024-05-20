var fs = require("fs");
const path = require("path");
// JSON.stringify(data, null, 4)
const writeFile = (filePath, arr) => {
  arr.forEach((item, index) => {
    let data = typeof item === "string" ? item : JSON.stringify(item, null, 4);
    fs.writeFileSync(path.join(filePath, `./${index}.js`), data);
  });
};
module.exports = { writeFile };
