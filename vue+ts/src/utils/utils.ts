export function checkPhone(value: string) {
  const reg =
    /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
  if (value) {
    if (reg.test(value)) {
      return true;
    } else {
      return false;
    }
  } else {
    false;
  }
}
export const numberReg = /^[0-9]+\d$/;
export const phoneReg = /^1[3-9]\d{9}$/;

export const getQueryString = (param: string): string | null => {
  const urlObj = new URL(window.location.href);
  return urlObj.searchParams.get(param);
};
export const downloadImg = (imgPath: string, imgName: string) => {
  const image = new Image();
  image.crossOrigin = "anonymous"; // 设置跨域属性，避免出现跨域问题
  image.src = imgPath;
  image.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL(
      `image/${imgName.split(".")[1] ?? "jpeg"}`
    );
    downloadLink.download = imgName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
};

// ## 身份证匹配替换
export function checkID() {
  // let idCard = "23012119870130221X";
  // idCard.replace(/(.{6}).\*(.{4})/, '$1**\*\*\*\***$2')--》错误
  // idCard.replace(/^(\d{6})\d{8}(.{4}$)/g, `$1${Array(9).join('\*')}$2`)--》正确
}
