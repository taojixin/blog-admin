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
      label,
    },
  });
}
// 创建文章
export function createArticle(title, content, description, labelArr) {
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
// 获取文章列表
export function getArticles(count, offset) {
  return request.post({
    url: "/articles/getarticles",
    data: {
      count,
      offset,
    },
  });
}
// 删除文章
export function deleteArticleSer(articleId) {
  return request.post({
    url: "/articles/delarticle",
    data: {
      articleId,
    },
  });
}
// 获取文章信息
export function getArticleDetail(articleId) {
  return request.post({
    url: "/articles/getArticleDetail",
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
// 获取文章评论
export function getArticleMessageSer(articleId, offset, count) {
  return request.post({
    url: "/articles/getarticlemsg",
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
    url: "/articles/deleteartmsg",
    data: { articleId },
  });
}
