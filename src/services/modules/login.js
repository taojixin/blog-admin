import request from "../request";

export function login(name, password) {
  return request.post({
    url: "/login",
    data: {
      name,
      password,
    },
  });
}

export function loginTest() {
  return request.post({
    url: "/login/test"
  })
}

export function verifyToken() {
  return request.post({
    url: "/login/verifytoken"
  })
}
