import request from "../request";

// 获取留言
export function getMessage(count, offset) {
  return request.post({
    url: "/message/list",
    data: {
      count,
      offset,
    },
  });
}
// 删除留言
export function deleteMessage(messageId) {
  return request.post({
    url: "/message/delete",
    data: { messageId },
  });
}
