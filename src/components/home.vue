<template>
  <div class="home">
    <el-container>
      <!-- 左侧 -->
      <el-aside>
        <!-- 顶部头像 -->
        <div class="aside-top">
          <img src="https://img.libertys.cn/blog/avatar.jpg" alt="" />
          <div class="title">Liberty's Blog Admin</div>
        </div>
        <!-- 菜单 -->
        <el-menu
          background-color="#68bed7"
          active-text-color="gray"
          text-color="white"
          :router="true"
          :unique-opened="true"
        >
          <template v-for="item in menuList" :key="item.id">
            <el-menu-item :index="item.path">
              <template #title>
                <i class="iconfont" :class="item.icon"></i>
                <span>{{ item.text }}</span>
              </template>
              <!-- 子菜单 -->
              <!-- <template v-for="child in item.menuItem" :key="child.id">
                <el-menu-item :index="child.path">
                  {{ child.text }}
                </el-menu-item>
              </template> -->
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <!-- 右侧 -->
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
const menuList = [
  {
    id: 1,
    text: "基本信息",
    path: "welcome",
    icon: "icon-shouye"
  },
  {
    id: 2,
    text: "文章",
    path: "articlelist",
    icon: "icon-liuyan"
  },
  {
    id: 3,
    text: "留言",
    path: "message",
    icon: "icon-pinglun"
  },
  {
    id: 4,
    text: "日常",
    path: "dailylist",
    icon: "icon-jibenxinxi"
  },
  {
    id: 5,
    text: "相册",
    path: "imagesshow",
    icon: "icon-tupian",
    menuItem: [
      { id: 1, path: "imagesshow", text: "图片列表" },
      { id: 2, path: "imageupload", text: "上传图片" },
    ],
  },
  {
    id: 6,
    text: "时间轴",
    path: "time",
    icon: "icon-shijianzhou",
  },
  {
    id: 7,
    text: "统计",
    path: "total",
    icon: "icon-tongji",
    menuItem: [
      { id: 1, path: "total", text: "基本统计" },
    ],
  },
];
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  width: 80vw;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: white;
  // overflow: hidden;

  .el-container {
    display: flex;
    box-sizing: border-box;
    .el-aside {
      width: 200px;
      margin: 30px 10px;
      background-color: skyblue;
      .aside-top {
        height: 100px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 20px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 60px;
          border: 1px solid white;
        }
        .title {
          font-size: 14px;
          color: white;
          font-weight: bold;
        }
      }

      .el-sub-menu {
        border: 1px solid gray;
        i {
          margin-right: 5px;
          font-size: 24px;
        }
      }
    }

    .el-main {
      flex: 1;
      height: 100vh;
      padding: 0;
      margin: 0 10px;
      background-color: rgb(252, 246, 246);
    }
  }
}
</style>
