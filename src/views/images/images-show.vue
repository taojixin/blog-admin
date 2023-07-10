<template>
  <div class="images-show">
    <div class="headline">图片统计</div>
    <div class="images-show-box">
      <div class="select">
        选择一个相册：
        <el-select
          v-model="selectObj"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="(item, index) in photosList"
            :key="item.id"
            :label="item.objName"
            :value="index"
          />
        </el-select>
      </div>
      <el-table
        :data="photosList[selectObj]?.photoList"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="索引" width="60px" />
        <el-table-column prop="name" label="图片名称" />
        <el-table-column prop="httpsUrl" label="访问地址">
          <template #default="scope">
            <a :href="scope.row.httpsUrl" target="_blank">{{
              scope.row.httpsUrl
            }}</a>
          </template>
        </el-table-column>
        <!-- <el-table-column label="预览" width="180px">
          <template #default="scope">
            <el-image
              style="width: 150px; height: 100px"
              loading="lazy"
              :src="scope.row.httpsUrl"
              fit="contain"
            />
          </template>
        </el-table-column> -->
        <el-table-column label="管理" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="viewPhoto(scope.row.httpsUrl)"
              >查看</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="deletePhoto(scope.row.name)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 提示对话框 -->
      <el-dialog v-model="dialogVisible" title="浏览" width="40%">
        <el-image
            :src="viewPhotoUrl"
            fit="contain"
          />
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import usePhotosStore from "../../store/photos";
import { delPhoto } from "../../services/index";

import { ElMessage, ElMessageBox } from "element-plus";

const photosStore = usePhotosStore();

const selectObj = ref(0);
const photosList = ref([]);
onMounted(async () => {
  await photosStore.fetchPhotosList();
  photosList.value = photosStore.photosList;
});

// 删除图片
function deletePhoto(imgObjName) {
  ElMessageBox.confirm("确定删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await delPhoto(imgObjName)
        .then(async (res) => {
          await photosStore.fetchPhotosList();
          photosList.value = photosStore.photosList;
          ElMessage({
            type: "success",
            message: "删除成功！",
          });
        })
        .catch((err) => {
          console.log(err);
          ElMessage({
            type: "error",
            message: "删除失败！",
          });
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消！",
      });
    });
}
// 查看图片
const dialogVisible = ref(false)
const viewPhotoUrl = ref("")
function viewPhoto(url) {
  dialogVisible.value = true
  viewPhotoUrl.value = url
}
</script>

<style lang="less" scoped>
.images-show {
  .images-show-box {
    padding: 10px;
    .select {
      margin: 10px 0;
    }
  }
}
</style>
