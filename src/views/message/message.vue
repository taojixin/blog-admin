<template>
  <div class="message">
    <div class="headline">留言列表</div>
    <div class="show-box">
      <!-- 表格 -->
      <div class="table-box">
        <el-table :data="messageList" stripe border style="width: 100%">
          <el-table-column type="index" label="#" width="50" />
          <el-table-column prop="name" label="名称" width="160">
            <template #default="scope">
              <el-tooltip
                :content="scope.row.name"
                placement="bottom"
                effect="light"
                :hide-after="0"
              >
                <p class="name-box">{{ scope.row.name }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" width="300">
            <template #default="scope">
              <el-tooltip
                :content="scope.row.content"
                placement="bottom"
                effect="light"
                :hide-after="0"
              >
                <p class="content-box">{{ scope.row.content }}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="qq" label="QQ" width="120" />
          <el-table-column prop="time" label="时间" width="170">
            <template #default="scope">
              {{ formatTime(scope.row.time) }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="small"
                type="success"
                @click="checkContent(scope.row.id, scope.row.replyMsg)"
                >查看回复</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="delMessage(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination-box">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          :current-page="currentPage"
          @update:current-page="updataeCurrentPage"
        />
      </div>
      <!-- 评论的回复 -->
      <el-dialog v-model="dialogTableVisible" title="回复">
        <template v-if="subContentList.length !== 0">
          <el-table :data="subContentList">
            <el-table-column type="index" label="#" width="50" />
            <el-table-column property="name" label="名称" width="150" />
            <el-table-column property="content" label="内容" width="300" />
            <el-table-column property="qq" label="QQ" width="120" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="delSubMessage(scope.row.id, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else>
          <p>此评论没有回复！</p>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getMessage, deleteMessage } from "../../services/modules/message";
import { ElMessage, ElMessageBox } from "element-plus";
import {formatTime} from '../../utils/formatTime'

const messageList = ref([]);
const total = ref(0);
const currentPage = ref(1);
function updataeCurrentPage(num) {
  currentPage.value = num;
  const offset = (currentPage.value - 1) * 10;
  getMessage(10, offset).then((res) => {
    messageList.value = res.data.messageList;
  });
}
getMessage(10, 0).then((res) => {
  total.value = res.data.total;
  messageList.value = res.data.messageList;
  console.log(res);
});

// 查看回复内容
const dialogTableVisible = ref(false);
const subContentList = ref([]);
const subContentId = ref(-1);
function checkContent(id, content) {
  dialogTableVisible.value = !dialogTableVisible.value;
  subContentList.value = content;
  subContentId.value = id;
}
// 删除评论
function delMessage(messageId) {
  ElMessageBox.confirm("确定删除吗?", "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteMessage(messageId).then(async (res) => {
        if (res.code === 0) {
          ElMessage({
            type: "success",
            message: "删除成功！",
          });
          const offset = (currentPage.value - 1) * 10;
          await getMessage(10, offset).then((res) => {
            messageList.value = res.data.messageList;
            total.value = res.data.total;
          });
        } else {
          ElMessage({
            type: "error",
            message: "删除失败",
          });
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "warning",
        message: "删除取消",
      });
    });
}
// 删除回复
function delSubMessage(messageId, item) {
  ElMessageBox.confirm("确定删除吗?", "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteMessage(messageId).then(async (res) => {
        if (res.code === 0) {
          ElMessage({
            type: "success",
            message: "删除成功！",
          });
          const offset = (currentPage.value - 1) * 10;
          await getMessage(10, offset).then((res) => {
            messageList.value = res.data.messageList;
            messageList.value.map((item) => {
              if (item.id === subContentId.value) {
                subContentList.value = item.replyMsg;
              }
            });
          });
        } else {
          ElMessage({
            type: "error",
            message: "删除失败",
          });
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "warning",
        message: "删除取消",
      });
    });
}
</script>

<style lang="less" scoped>
.message {
  .table-box {
    margin: 10px;
  }
  .pagination-box {
    display: flex;
    justify-content: center;
  }
  .content-box {
    // 文字超出省略
    overflow: hidden;
    text-overflow: ellipsis; // 产出部分省略
    display: -webkit-box;
    -webkit-line-clamp: 2; // 最多显示四行
    -webkit-box-orient: vertical;
    &:hover {
      cursor: pointer;
    }
    margin: 0;
  }
  .name-box {
    // 文字超出省略
    overflow: hidden;
    text-overflow: ellipsis; // 产出部分省略
    display: -webkit-box;
    -webkit-line-clamp: 1; // 最多显示四行
    -webkit-box-orient: vertical;
    &:hover {
      cursor: pointer;
    }
    margin: 0;
  }
}
</style>
