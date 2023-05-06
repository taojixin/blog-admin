import request from "../request";

// 上传图片
export function uploadImage() {
  return request.get({
    url: "/uploadimg",
  });
}

// 获取图片标签信息
export function getImgLabels() {
  return request.get({
    url: "/file/imglabels"
  })
}