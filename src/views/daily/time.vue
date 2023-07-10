<template>
  <div class="time">
    <div class="headline">时间轴</div>
    <div class="show-box">
      <div class="add-timeline">
        <el-button type="primary" size="large" @click="addTimelines"
          >新增时间轴</el-button
        >
        <el-alert title="提示：点击某个事件可修改！" type="info" />
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in timeLine"
          :key="index"
          :timestamp="formatTime(activity.time)"
          placement="top"
          class="timeline-item"
        >
          <el-card class="card" @click="modifyContent(activity)">
            <h4>{{ activity.content }}</h4>
            <!-- <p>Tom committed 2018/4/12 20:46</p> -->
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <!-- 修改对话框 -->
      <el-dialog v-model="modifyDialogVisible" title="修改" width="30%">
        <el-form :model="modifyItemMsg">
          <el-form-item label="事 件 :">
            <el-input v-model="modifyItemMsg.content" />
          </el-form-item>
          <el-form-item label="时 间 :">
            <el-input v-model="modifyItemMsg.time" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="danger" @click="deleteTimeline">删除</el-button>
            <el-button @click="modifyDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="modify"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 新增对话框 -->
      <el-dialog v-model="addDialogVisible" title="新增事件" width="30%">
        <div class="addContent">
          <div>事 件：</div>
          <el-input v-model="addContent" />
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="add"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getTimeline,
  addTimeline,
  modifyTimeline,
  deleteTimelines,
} from "../../services";
import { ElMessage, ElMessageBox } from "element-plus";
import { formatTime } from "../../utils/formatTime";

const timeLine = ref([]);
onMounted(async () => {
  await getTimeline().then((res) => {
    // console.log(res);
    timeLine.value = res.data;
  });
});

// 修改
const modifyDialogVisible = ref(false);
const modifyItemMsg = ref({});
function modifyContent(activity) {
  modifyItemMsg.value = activity;
  modifyDialogVisible.value = !modifyDialogVisible.value;
  deleteId.value = activity.id;
}
function modify() {
  modifyTimeline(modifyItemMsg.value.id, modifyItemMsg.value.content)
    .then(async (res) => {
      if (res.code === 0) {
        modifyDialogVisible.value = !modifyDialogVisible.value;
        await getTimeline().then((res) => {
          timeLine.value = res.data;
        });
        ElMessage({ type: "success", message: "修改成功！" });
      } else {
        ElMessage({ type: "error", message: "修改失败,请联系管理员！" });
      }
    })
    .catch((err) => {
      ElMessage({ type: "error", message: "修改失败！" });
    });
}

// 删除
const deleteId = ref(-1);
function deleteTimeline() {
  ElMessageBox.confirm("确定删除吗?", "再次确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteTimelines(deleteId.value)
        .then(async (res) => {
          modifyDialogVisible.value = !modifyDialogVisible.value;
          await getTimeline().then((res) => {
            timeLine.value = res.data;
          });
          ElMessage({
            type: "success",
            message: "删除成功！",
          });
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: "删除失败！",
          });
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除！",
      });
    });
}

// 新增
const addDialogVisible = ref(false);
const addContent = ref("");
function addTimelines() {
  addDialogVisible.value = !addDialogVisible.value;
}
function add() {
  if (addContent.value.trim().length !== 0) {
    addTimeline(addContent.value)
      .then(async (res) => {
        addDialogVisible.value = !addDialogVisible.value;
        ElMessage({ type: "success", message: "新增成功!" });
        await getTimeline().then((res) => {
          timeLine.value = res.data;
        });
        addContent.value = "";
      })
      .catch((err) => {
        ElMessage({ type: "error", message: "新增失败!" });
      });
  } else {
    ElMessage({ type: "error", message: "内容不能为空！" });
  }
}
</script>

<style lang="less" scoped>
.time {
  .show-box {
    // border: 1px solid blue;
    background-color: white;
    margin: 10px;
    padding: 10px;
    .add-timeline {
      margin: 10px 0;
      // display: flex;
      .el-button {
        margin-bottom: 10px;
      }
    }
    .timeline-item {
      .card {
        flex: 1;
        &:hover {
          cursor: pointer;
          transform: scale(1.05);
        }
      }
    }

    .addContent {
      display: flex;
      align-items: center;
      div {
        width: 50px;
      }
      .el-input {
        flex: 1;
      }
    }
  }
}
</style>
