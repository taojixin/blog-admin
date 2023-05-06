import { createRouter, createWebHistory } from "vue-router";
import { verifyToken } from "../services/modules/login";
import { ElMessage } from "element-plus";

import Login from "../components/login.vue";
import Home from "../components/home.vue";
import Welcome from "../views/welcome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      redirect: "/welcome",
      component: Home,
      children: [
        {
          path: "/welcome",
          component: Welcome,
        },
        // 文章相关
        {
          path: "/articlecreate",
          component: () => import("../views/articles/article-create.vue"),
        },
        {
          path: "/labels",
          component: () => import("../views/articles/labels.vue"),
        },
        // 图片相关
        {
          path: "/imageupload",
          component: () => import("../views/images/image-upload.vue"),
        },
        {
          path: "/imagesshow",
          component: () => import("../views/images/images-show.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.fullPath !== "/login") {
    verifyToken().then((res) => {
      if (res.code !== 0) {
        ElMessage.error("登录信息过期，请重新登录！");
        router.push("/login");
        return false;
      }
      return true;
    });
  }
  return true;
});

export default router;
