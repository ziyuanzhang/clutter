const fs = require("fs").promises; // 使用 promises 版本的 API 以支持 async/await
const path = require("path");

const readDirectoryAndRenameFiles = async (dir) => {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true }); // 使用 withFileTypes 获取文件信息
    for (const file of files) {
      if (file.isDirectory()) continue; // 如果是目录则跳过，只处理文件
      console.log(`Processing file: ${file.name}`);
      const oldPath = path.join(dir, file.name); // 构建文件的完整路径
      const newPath = file.name.replace(
        "【2024精华版教程】哭了，现在才知道，原来《软件设计师》得这么学！！！",
        "【2024精华版教程】"
      ); // 更新文件名
      const newFilePath = path.join(dir, newPath); // 构建新文件的完整路径
      await fs.rename(oldPath, newFilePath); // 使用 await 确保重命名完成后再进行下一步操作
      console.log("File renamed successfully."); // 重命名成功后输出信息
    }
  } catch (err) {
    console.error("An error occurred:", err); // 捕获并处理错误
  }
};

const dirPath = path.join("D:/教程/2024精华版教程-软件设计师-希赛网"); // 指定目录路径
readDirectoryAndRenameFiles(dirPath); // 调用函数处理目录中的文件
