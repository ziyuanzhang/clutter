const fs = require("fs");
const path = require("path");
// 读取json文件内容
let bookmarks = fs.readFileSync(
  path.join(__dirname, "./static/compate/终章.json"),
  "utf-8"
);
bookmarks = JSON.parse(bookmarks);

// 初始化html内容
let html = `
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!--This is an automatically generated file.
    It will be read and overwritten.
    Do Not Edit! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<Title>Bookmarks</Title>
<H1>Bookmarks</H1>
<DL><p>
<DT><H3  ADD_DATE="" LAST_MODIFIED="" PERSONAL_TOOLBAR_FOLDER="true">收藏夹栏</H3>
<DL><p>
`;
// 生成书签的html字符串
for (let bookmark of bookmarks[Object.keys(bookmarks)[0]]) {
  if (bookmark.name) {
    html += `<DT><A HREF="${bookmark.href}" ADD_DATE="" ICON="">${bookmark.name}</A>\n`; // 换行符必须加，
  } else {
    html += `<DT><H3  ADD_DATE="" LAST_MODIFIED="">${
      Object.keys(bookmark)[0]
    }</H3>
    <DL><P>\n`; // 换行符必须加，

    for (let item of bookmark[Object.keys(bookmark)[0]]) {
      html += `<DT><A HREF="${item.href}" ADD_DATE="" ICON="">${item.name}</A>\n`; // 换行符必须加，
    }

    html += `</DL><p>\n`; // 换行符必须加，
  }
}

html += `</DL><p></DL><p>`;

// 写入html文件
fs.writeFileSync(
  path.join(__dirname, "./static/compate/终章-bookmarks.html"),
  html
);
