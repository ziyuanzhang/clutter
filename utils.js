import qs from "qs";
export const checkEmail = (mail) => {
  const strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  return strRegex.test(mail);
};
export const numberReg = /^[0-9]+\d$/;
export const phoneReg = /^1[3-9]\d{9}$/;
export const checkPhone = (tel) => {
  return /^1[3456789]\d{9}$/.test(tel);
};
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
export const checkFixesTel = (tel) => {
  tel = tel.replace(/[^-|\d]/g, "");
  return /^((\+86)|(86))?(1)\d{10}$/.test(tel) || /^0[0-9-]{10,13}$/.test(tel);
};
export const checkNumber = (val) => {
  return /^\d+$/.test(val);
};
export const checkNumber2 = (val) => {
  return /(^[0-9]\d*$)/.test(val);
};
export const checkPostCode = (val) => {
  if (val.length === 6) {
    return /^\d+$/.test(val);
  } else {
    return false;
  }
};
//-----验证码---------
export const checkVerificationCode = (val) => {
  if (val.length !== 4) {
    return false;
  }
  return /(^[0-9]\d*$)/.test(val);
};
//-----正整数---------
export const checkPositiveInteger = (val) => {
  return /(^[1-9]\d*$)/.test(val);
};
/* 校验身份证号  */
export const checkIdCard = (id) => {
  let flag = true;

  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(id) === false) {
    flag = false;
  }
  return flag;
};
//  身份证匹配替换
export function encryptionID() {
  // let idCard = "23012119870130221X";
  // idCard.replace(/(.{6}).\*(.{4})/, '$1**\*\*\*\***$2')--》错误
  // idCard.replace(/^(\d{6})\d{8}(.{4}$)/g, `$1${Array(9).join('\*')}$2`)--》正确
}
// 下载图片
export const getBase64Image = (img) => {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  let dataURL = canvas.toDataURL("image/" + ext);
  return dataURL;
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
//---------
export const uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};
export let guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};
//-------------------
export const getUrlParams = (url) => {
  var params = url.split("?")[1].split("&");
  var obj = {};
  params.map((item) => (obj[item.split("=")[0]] = item.split("=")[1]));
  return obj;
};
export let getUrlParams2 = (key) => {
  let url = window.location.href;
  let arr = url.split("?");
  if (arr[1]) {
    let data = qs.parse(arr[1]);
    return data[key] ? data[key] : "";
  } else {
    return "";
  }
};
export const getQueryString = (param: string): string | null => {
  const urlObj = new URL(window.location.href);
  return urlObj.searchParams.get(param);
};
