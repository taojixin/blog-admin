<template>
  <div class="daily-list">
    <div class="headline">分享列表</div>
    <div class="show-box">
      <div class="add-timeline">
        <el-button type="primary" size="large" @click="addDaily"
          >新增日常</el-button
        >
       </div>
      <el-table :data="dailyList" border style="width: 100%">
        <el-table-column prop="time" label="时间" width="165" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="photo_array" label="图片">
          <template #default="scope">
            <template v-if="scope.row.photo_array.length !== 0">
              <template
                v-for="(item, index) in scope.row.photo_array"
                :key="index"
              >
                <el-link
                  :href="item"
                  type="success"
                  target="_blank"
                  style="
                    background-color: #e3edf2;
                    margin: 0 1px;
                    font-size: 12px;
                  "
                  >{{ item }}</el-link
                >
              </template>
            </template>
            <template v-else> 暂无图片 </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="modifyDaily(scope.row)"
              >修改</el-button
            >
            <el-popconfirm
              width="220"
              confirm-button-text="是"
              cancel-button-text="否"
              icon-color="#626AEF"
              title="是否删除?"
              @confirm="deleteDaily(scope.row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 修改框 -->
      <el-dialog v-model="dialogTableVisible" title="修改">
        <el-form :model="form">
          <el-form-item label="内容：">
            <el-input v-model="form.content" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogTableVisible = !dialogTableVisible"
              >取消</el-button
            >
            <el-button type="primary" @click="modify"> 确定 </el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 新增框 -->
      <el-dialog v-model="addDialogVisible" title="修改">
        <el-form :model="addForm">
          <el-form-item label="内容：">
            <el-input v-model="addForm.content" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="addDialogVisible = !addDialogVisible"
              >取消</el-button
            >
            <el-button type="primary" @click="modify"> 确定 </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { getShare, modifyDailySer, deleteDailySer } from "../../services";
import { ref } from "vue";
import { formatTime } from "../../utils/formatTime";
import { ElMessage } from "element-plus";

const dailyList = ref([]);
getShare().then((res) => {
  dailyList.value = res.data.map((item) => {
    item.time = formatTime(item.time);
    return item;
  });
  console.log(res);
});

// 删除
function deleteDaily(dailyId) {
  console.log(dailyId);
  deleteDailySer(dailyId).then((res) => {
    if (res.code === 0) {
      getShare().then((res) => {
        dailyList.value = res.data.map((item) => {
          item.time = formatTime(item.time);
          return item;
        });
      });
      ElMessage({ type: "success", message: "删除成功！" });
    } else {
      console.log(res);
      ElMessage({ type: "error", message: "删除失败！" });
    }
  });
}

// 修改
const dialogTableVisible = ref(false);
const form = ref({});
function modifyDaily(daily) {
  form.value = daily;
  dialogTableVisible.value = !dialogTableVisible.value;
}
function modify() {
  modifyDailySer(form.value.id, form.value.content)
    .then((res) => {
      if (res.code === 0) {
        ElMessage({ type: "success", message: "修改成功！" });
        dialogTableVisible.value = !dialogTableVisible.value;
        getShare().then((res) => {
          dailyList.value = res.data.map((item) => {
            item.time = formatTime(item.time);
            return item;
          });
        });
      } else {
        ElMessage({ type: "error", message: "修改失败！" });
      }
    })
    .catch((err) => {
      ElMessage({ type: "error", message: "修改失败！" });
    });
}

// 新增
const addDialogVisible = ref(false)
const addForm = ref({})
function addDaily() {
  addDialogVisible.value = !addDialogVisible.value
}
</script>

<style lang="less" scoped>
.daily-list {
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
