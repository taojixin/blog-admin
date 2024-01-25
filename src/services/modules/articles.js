import request from "../request";

// 标签**********************************************
// 获取标签列表
export function getLabels() {
  return request.get({
    url: "/labels",
  });
}
// 创建标签
export function createLabel(label) {
  return request.post({
    url: "/label/create",
    data: {
      label,
    },
  });
}

// 文章**********************************************
// 创建文章
export function createArticle(title, content, description, labelArr) {
  return request.post({
    url: "/article/create",
    data: {
      title,
      content,
      description,
      labelArr,
    },
  });
}
// 删除文章
export function deleteArticleSer(articleId) {
  return request.post({
    url: "/article/delete",
    data: {
      articleId,
    },
  });
}
// 修改文章
export function modifyArticleSer(
  articleId,
  title,
  content,
  description,
  labelArr
) {
  return request.post({
    url: "/articles/modifyarticle",
    data: { articleId, title, content, description, labelArr },
  });
}
// 获取文章列表
export function getArticles(count, offset) {
  return request.get({
    url: "/articles",
    params: {
      count,
      offset,
    },
  });
}
// 获取文章信息
export function getArticleDetail(articleId) {
  return request.post({
    url: "/article/origin",
    data: {
      articleId,
    },
  });
}
// 获取文章评论
export function getArticleMessageSer(articleId, offset, count) {
  return request.post({
    url: "/article/comment",
    data: {
      articleId,
      offset,
      count,
    },
  });
}
// 删除文章评论
export function deleteArticleMessageSer(articleId) {
  return request.post({
    url: "/article/comment/delete",
    data: { articleId },
  });
}
