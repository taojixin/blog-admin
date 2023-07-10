<template>
  <div class="labels">
    <div class="headline">标 签</div>
    <div class="show-labels">
      <div class="have">已有标签:</div>
      <div class="labels-box">
        <template v-for="item in labels" :key="item.id">
          <el-tag size="large" class="ml-2" type="success">{{
            item.label
          }}</el-tag>
        </template>
      </div>
      <div class="create">创建新标签：</div>
      <el-input class="newlabel" type="text" v-model="label" />
      <el-button @click="create">创建</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getLabels, createLabel } from "../../services/index";
import {ElMessage} from "element-plus"

let labels = ref([]);

onMounted(() => {
  getLabels().then((res) => {
    labels.value = res.data.result;
  });
});

let label = ref("");
function create() {
  createLabel(label.value).then((res) => {
    if (res.code === 0) {
      ElMessage({type: "success", message: "创建成功！"});
      label.value = ""
      getLabels().then((res) => {
        labels.value = res.data.result;
      });
    } else {
      ElMessage({ type: "error", message: "创建失败！" });
    }
  });
}
</script>

<style lang="less" scoped>
.labels {

  .show-labels {
    .have,
    .create {
      margin: 0;
      font-size: 20px;
      color: #3f9eba;
      margin: 10px;
    }
    .labels-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      border-bottom: 5px dotted skyblue;
      padding: 20px;
      background-color: white;
      margin: 0 10px;
    }
    .newlabel {
      width: 200px;
      margin-left: 10px;
    }
    .el-button {
      margin: 20px;
    }
  }
}
</style>
