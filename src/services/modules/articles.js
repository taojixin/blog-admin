import request from "../request";

// 获取标签列表
export function getLabels() {
  return request.get({
    url: "/articles/getlabels",
  });
}

// 创建标签
export function createLabel(label) {
  return request.post({
    url: "/articles/createlabel",
    data: {
      label
    }
  })
}

// 创建文章
export function createArticle(title, content,description, labelArr) {
  return request.post({
    url: "/articles/createarticle",
    data: {
      title,
      content,
      description,
      labelArr,
    },
  });
}
