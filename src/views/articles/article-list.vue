<template>
  <div class="article-list">
    <div class="headline">文章列表</div>
    <div class="container">
      <div class="add-artilce">
        <el-button type="primary" size="large" @click="addArticle"
          >新增文章</el-button
        >
        <el-button type="primary" size="large" @click="addLabel"
          >新增标签</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column type="index" label="索引" width="60px" />
        <!-- <el-table-column prop="id" label="文章id" width="70" /> -->
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="time" label="时间" width="165">
          <template #default="scope">
            {{ formatTime(scope.row.time) }}
          </template>
        </el-table-column>
        <el-table-column prop="labels" label="标签">
          <template #default="scope">
            <template v-for="item in scope.row.labels" :key="item.id">
              <el-tag class="tag" type="success">{{ item.label }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="管理" width="300">
          <template #default="scope">
            <el-button
              size="small"
              type="success"
              @click="viewArticleComments(scope.row.id)"
              >查看评论</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="viewArticleDetails(scope.row.id)"
              >查看详情</el-button
            >
            <el-button
              size="small"
              type="warning"
              @click="modifyArticle(scope.row.id)"
              >修改</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="deleteArticle(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="articleTotal"
      />
      <!-- 评论列表 -->
      <el-dialog v-model="dialogTableVisible" title="评论列表">
        <template v-if="messageList.length !== 0">
          <el-table :data="messageList" border>
            <el-table-column property="name" label="名称" />
            <el-table-column property="time" label="时间" width="170">
              <template #default="scope">
                {{ formatTime(scope.row.time) }}
              </template>
            </el-table-column>
            <el-table-column property="content" label="内容" />
            <el-table-column label="操作" width="90">
              <template #default="scope">
                <el-button
                  type="danger"
                  @click="deleteSomeMessage(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else>该文章没有评论</template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

import useArticleStore from "../../store/article";
import { formatTime } from "../../utils/formatTime";
import {
  deleteArticleSer,
  getArticleMessageSer,
  deleteArticleMessageSer,
} from "../../services/modules/articles";

const router = useRouter();

const articleTotal = ref(100);
const articleList = ref([]);
const articleStore = useArticleStore();

const offset = ref(0);
const count = ref(20);
onMounted(async () => {
  await articleStore.fetchArticleList(count.value, offset.value);
  articleList.value = articleStore.articlesList;
});

const dialogTableVisible = ref(false);
const messageList = ref([]);
const viewArticleId = ref(-1);
// 查看评论
function viewArticleComments(articleId) {
  dialogTableVisible.value = !dialogTableVisible.value;
  getArticleMessageSer(articleId, 0, 100).then((res) => {
    messageList.value = res.data.result;
  });
  viewArticleId.value = articleId;
}
// 删除文章
function deleteArticle(articleId) {
  ElMessageBox.confirm("确定删除吗?", "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteArticleSer(articleId).then(async (res) => {
        if (res.code === 0) {
          ElMessage({
            type: "success",
            message: "删除成功！",
          });
          await articleStore.fetchArticleList(count.value, offset.value);
          articleList.value = articleStore.articlesList;
        } else {
          ElMessage({
            type: "error",
            message: "删除失败！",
          });
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除！",
      });
    });
}
// 查看详情
function viewArticleDetails(articleId) {
  window.open(`http://localhost:5174/articledetails/${articleId}`);
}
// 修改文章
function modifyArticle(articleId) {
  router.push(`/articlemodify/${articleId}`);
}
// 删除评论
function deleteSomeMessage(articleId) {
  deleteArticleMessageSer(articleId).then(async (res) => {
    if (res.code === 0) {
      ElMessage({ type: "success", message: "删除成功！" });
      await getArticleMessageSer(viewArticleId.value, 0, 100).then((res) => {
        messageList.value = res.data.result;
      });
    } else {
      ElMessage({ type: "error", message: "删除失败！" });
    }
  });
}
// 新增文章
function addArticle() {
  router.push("/articlecreate")
}
// 新增标签
function addLabel() {
  router.push("/labels")
}
</script>

<style lang="less" scoped>
.article-list {
  .container {
    background-color: white;
    margin: 10px;
    padding: 10px;
    .add-artilce {
      margin: 10px 0;
    }
  }
  .tag {
    margin: 3px;
  }
}
</style>
