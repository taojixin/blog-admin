<template>
  <div class="image-upload">
    <div class="headline">图片上传</div>
    <div class="image-upload-box" v-loading="singleLoading">
      <div class="upload-single">
        <div class="single">单张图片上传：</div>
        <el-form label-width="120px" :model="formValue">
          <el-form-item label="图片名称：">
            <el-input
              v-model="formValue.imgName"
              placeholder="重命名后上传（可选）"
            />
          </el-form-item>
          <el-form-item label="图片相册：">
            <el-select placeholder="请选择标签" v-model="formValue.albumId">
              <template v-for="(item, index) in photoAlbums" :key="index">
                <el-option
                  :label="item.album_name"
                  :value="item.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
        <el-upload
          v-model:file-list="singleImg"
          ref="singleUploadRef"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          list-type="picture"
          :http-request="singleUpload"
        >
          <el-button type="primary">选择图片</el-button>
          <template #tip>
            <div class="el-upload__tip">
              图片应为png、jpg、gif格式图片(一次只能上传一张图片！)
            </div>
          </template>
        </el-upload>
        <el-button type="success" @click="submitUpload"> 上传 </el-button>
      </div>
      <div class="upload-more">
        <div class="more">多张图片上传：</div>
        <el-form label-width="120px" :model="formMoreValue">
          <el-form-item label="图片标签：">
            <el-select placeholder="请选择标签" v-model="formMoreValue.albumId">
              <template v-for="(item, index) in photoAlbums" :key="index">
                <el-option :label="item.album_name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
        <el-upload
          v-model:file-list="moreImgList"
          ref="moreUploadRef"
          :auto-upload="false"
          :limit="10"
          :on-exceed="handleExceed"
          list-type="picture"
          :http-request="moreUpload"
          :multiple="true"
        >
          <el-button type="primary">选择图片</el-button>
          <template #tip>
            <div class="el-upload__tip">
              图片应为png、jpg、gif格式图片(一次最多上传十张照片！)
            </div>
          </template>
        </el-upload>
        <el-button type="success" @click="submitSingleUpload"> 上传 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { getPhotoAlbum } from "../../services/modules/images";

const photoAlbums = ref([]);

// 单图片上传
const formValue = reactive({
  imgName: "",
  albumId: 0,
});
const singleUploadRef = ref();
const singleImg = ref([]);
const singleLoading = ref(false);
// 上传按钮
const submitUpload = () => {
  singleLoading.value = true;
  singleUploadRef.value.submit();
};
// 上传
const singleUpload = (param) => {
  let formData = new FormData();
  formData.append("image", param.file);
  formData.append("imgName", formValue.imgName);
  formData.append("albumId", formValue.albumId);
  axios
    .post("http://localhost:8000/admin/file/uploadimg", formData)
    .then((res) => {
      if (res.data.code === 0) {
        singleLoading.value = false;
        singleImg.value = [];
        ElMessage({ type: "success", message: "上传成功！" });
      }
    })
    .catch((err) => {
      singleLoading.value = false;
      ElMessage({ type: "error", message: "上传失败！" });
      console.log(err);
    });
};

// 多图片上传
const formMoreValue = reactive({
  albumId: 0,
});
const moreUploadRef = ref();
const moreImgList = ref([]);
const moreLoading = ref(false);
// 上传按钮
const submitSingleUpload = () => {
  moreLoading.value = true;
  moreUploadRef.value.submit();
};
// 上传
const moreUpload = (param) => {
  let formData = new FormData();
  formData.append("image", param.file);
  formData.append("albumId", formMoreValue.albumId);
  axios
    .post("http://localhost:8000/admin/file/uploadimg", formData)
    .then((res) => {
      if (res.data.code === 0) {
        moreLoading.value = false;
        moreImgList.value = [];
        ElMessage({ type: "success", message: "上传成功！" });
      }
    })
    .catch((err) => {
      moreLoading.value = false;
      ElMessage({ type: "error", message: "上传失败！" });
      console.log(err);
    });
};

// 获取标签信息
onMounted(async () => {
  await getPhotoAlbum().then((res) => {
    photoAlbums.value = res.photo_album;
  });
});
// 图片超出提示
const handleExceed = () => {
  ElMessage({ type: "warning", message: "图片数量超出范围！" });
};
</script>

<style lang="less" scoped>
.image-upload {
  border: 1px solid blue;
  .image-upload-box {
    .upload-single {
      border: 1px solid red;
      margin: 10px;
      padding: 10px;
      .single {
        font-size: 20px;
        font-weight: bold;
        margin: 10px;
      }
    }
    .upload-more {
      border: 1px solid red;
      margin: 10px;
      padding: 10px;
      .more {
        font-size: 20px;
        font-weight: bold;
        margin: 10px;
      }
    }
  }
}
</style>
