import request from "../request";

// 上传图片
export function uploadImage() {
  return request.get({
    url: "/uploadimg",
  });
}

// 获取图片标签信息
export function getPhotoAlbum() {
  return request.get({
    url: "/file/phonealbum",
  });
}

// 获取所有图片
export function getAllPhoto() {
  return request.get({
    url: "/file/getallphone",
  });
}

// 获取所有阿里云图片列表
export function getAllPhotos() {
  return request.get({
    url: "/alioss/getallphoto",
  });
}

// 删除某个图片
export function delPhoto(imgObjName) {
  return request.post({
    url: "/alioss/deletePhoto",
    data: { imgObjName },
  });
}
