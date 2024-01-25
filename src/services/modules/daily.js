import request from "../request";

// 时间轴***************************************
// 获取时间轴
export function getTimeline() {
  return request.get({
    url: "/timeline/list",
  });
}
// 新增时间轴
export function addTimeline(content) {
  return request.post({
    url: "/timeline/create",
    data: { content },
  });
}
// 删除时间轴
export function deleteTimelines(deleteId) {
  return request.post({
    url: "/timeline/deletee",
    data: {
      timelineId: deleteId,
    },
  });
}
// 修改时间轴
export function modifyTimeline(id, content) {
  return request.post({
    url: "/timeline/modify",
    data: {
      id,
      content,
    },
  });
}

// 日常***************************************
// 获取日常
export function getShare() {
  return request.get({
    url: "/dailies",
  });
}

// 删除日常
export function deleteDailySer(dailyId) {
  return request.post({
    url: "/daily/delete",
    data: {
      dailyId,
    },
  });
}
// 修改内容
export function modifyDailySer(id, content) {
  return request.post({
    url: "/daily/modify",
    data: { id, content },
  });
}
