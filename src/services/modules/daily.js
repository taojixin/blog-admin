import request from "../request";

// 获取时间轴
export function getTimeline() {
  return request.get({
    url: "/daily/gettimeline",
  });
}
// 新增时间轴
export function addTimeline(content) {
  return request.post({
    url: "/daily/addtimeline",
    data: { content },
  });
}
// 删除时间轴
export function deleteTimelines(deleteId) {
  return request.post({
    url: "/daily/deltimeline",
    data: {
      timelineId: deleteId,
    },
  });
}
// 修改时间轴
export function modifyTimeline(id, content) {
  return request.post({
    url: "/daily/modifytimeline",
    data: {
      id,
      content,
    },
  });
}
// 获取日常
export function getShare() {
  return request.get({
    url: "/daily/getshare",
  });
}

// 删除日常
export function deleteDailySer(dailyId) {
  return request.post({
    url: "/daily/deleteDaily",
    data: {
      dailyId,
    },
  });
}
// 修改内容
export function modifyDailySer(id, content) {
  return request.post({
    url: "/daily/modifydaily",
    data: { id, content },
  });
}
