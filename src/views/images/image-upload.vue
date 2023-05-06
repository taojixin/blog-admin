<template>
  <div class="image-upload">
    <h1>图片上传</h1>
    <div class="image-upload-box" v-loading="loading">
      <el-form label-width="120px" :model="formValue">
        <el-form-item label="图片名称：">
          <el-input
            v-model="formValue.imgName"
            placeholder="重命名后上传（可选）"
          />
        </el-form-item>
        <el-form-item label="图片标签：">
          <el-select placeholder="请选择标签" v-model="formValue.imgLabel">
            <template v-for="(item, index) in labels" :key="index">
              <el-option :label="item.sort" :value="item.sort"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>

      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        ref="uploadRef"
        :auto-upload="false"
        :limit="1"
        :on-exceed="handleExceed"
        list-type="picture"
        :http-request="upload"
      >
        <el-button type="primary">选择图片</el-button>
        <template #tip>
          <div class="el-upload__tip">
            图片应为png、jpg、gif格式图片(暂时只支持单张上传！)
          </div>
        </template>
      </el-upload>
      <el-button type="success" @click="submitUpload"> 上传 </el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { getImgLabels } from "../../services/modules/images";

const formValue = reactive({
  imgName: "",
  imgLabel: "",
});
const uploadRef = ref();
const fileList = ref([]);
const loading = ref(false);
const labels = ref([]);
// 上传按钮
const submitUpload = () => {
  loading.value = true;
  uploadRef.value.submit();
};
// 图片超出提示
const handleExceed = () => {
  ElMessage({ type: "warning", message: "只能上传一张！" });
};
// 上传
const upload = (param) => {
  let formData = new FormData();
  formData.append("image", param.file);
  formData.append("imgName", formValue.imgName);
  formData.append("imgLabel", formValue.imgLabel);
  axios
    .post("http://localhost:8000/admin/file/uploadimg", formData)
    .then((res) => {
      if (res.data.code === 0) {
        loading.value = false;
        fileList.value = [];
        ElMessage({ type: "success", message: "上传成功！" });
      }
    })
    .catch((err) => {
      loading.value = false;
      ElMessage({ type: "error", message: "上传失败！" });
      console.log(err);
    });
};
// 获取标签信息
onMounted(async () => {
  await getImgLabels().then(res => {
    labels.value = res.labels
  })

})
</script>

<style lang="less" scoped>
.image-upload {
  border: 1px solid blue;
  .image-upload-box {
    border: 1px solid red;
  }
}
</style>
