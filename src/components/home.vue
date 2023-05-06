<template>
  <div class="home">
    <el-container>
      <!-- 左侧 -->
      <el-aside class="aside" width="200px">
        <!-- 顶部头像 -->
        <div class="aside-top">
          <img src="../assets/images/head.gif" alt="" />
          <h1>Libertys blog</h1>
        </div>
        <!-- 菜单 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#68bed7"
          active-text-color="blue"
          text-color="white"
          :router="true"
          :unique-opened="true"
        >
          <!-- 基本信息 -->
          <el-sub-menu index="baseMessage">
            <template #title>
              <span>基本信息</span>
            </template>
            <el-menu-item index="welcome">首页</el-menu-item>
          </el-sub-menu>
          <!-- 笔记 -->
          <el-sub-menu index="article">
            <template #title>
              <span>笔记</span>
            </template>
            <el-menu-item index="labels">标签信息</el-menu-item>
            <el-menu-item index="articlecreate">创建文章</el-menu-item>
          </el-sub-menu>
          <!-- 留言 -->
          <el-sub-menu index="note">
            <template #title>
              <span>留言</span>
            </template>
            <el-menu-item index="a">查看留言</el-menu-item>
            <el-menu-item index="e">管理留言</el-menu-item>
          </el-sub-menu>
          <!-- 图片管理 -->
          <el-sub-menu index="image">
            <template #title>
              <span>图片管理</span>
            </template>
            <el-menu-item index="imagesshow">图片列表</el-menu-item>
            <el-menu-item index="imageupload">上传图片</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <!-- 右侧 -->
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.home {
  height: 100vh;
  box-sizing: border-box;
  border: 1px solid pink;
  overflow: hidden;

  .el-container {
    display: flex;
    .aside {
      width: 200px;
      height: calc(100vh - 20px);
      margin: 10px 10px;
      border: 1px solid gray;

      .aside-top {
        border: 1px solid black;
        height: 100px;
        position: relative;
        img {
          width: 100px;
          height: 100px;
          border: 1px solid black;
        }
      }

      .el-sub-menu {
        border: 1px solid gray;
      }
    }

    .el-main {
      flex: 1;
      height: 100vh;
      padding: 0;
      margin: 0 10px;
      // border: 1px solid purple;
      overflow-x: scroll;
    }
  }
}
</style>
