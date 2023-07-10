<template>
  <div class="article-modify" v-loading="loading">
    <div class="headline">文章编辑</div>
    <div class="notes-container">
      <el-form label-width="120px" :model="formValue">
        <el-form-item label="文章标题：">
          <el-input v-model="formValue.title" />
        </el-form-item>
        <el-form-item label="内容标签：">
          <el-select placeholder="请选择标签" v-model="labelArr" multiple>
            <template v-for="item in labels" :key="item.id">
              <el-option :label="item.label" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="文章描述：">
          <el-input v-model="formValue.description" />
        </el-form-item>
        <el-form-item label="内容编辑："> </el-form-item>
      </el-form>
      <div class="box">
        <div class="left">
          <textarea
            class="textarea"
            placeholder="请输入内容..."
            spellcheck="false"
            v-model="textValue"
          ></textarea>
        </div>
        <div class="right markdown-body" v-html="htmlValue"></div>
      </div>
      <div class="btn">
        <el-button type="info" size="large" @click="cancelModif">取消</el-button>
        <el-button type="primary" size="large" @click="modifyArticle">修改</el-button>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { marked } from "marked";
import hljs from "highlight.js";

import {
  getLabels,
  getArticleDetail,
  modifyArticleSer,
} from "../../services/index";

const router = useRouter();
const route = useRoute();

// 获取数据
const loading = ref(true)
const articleId = ref(-1);
articleId.value = route.params.articleId;
getArticleDetail(articleId.value).then((res) => {
  textValue.value = res.data.articleDetail.content;
  formValue.title = res.data.articleDetail.title;
  formValue.description = res.data.articleDetail.description;
  labelArr.value = res.data.articleDetail.labels.map((item) => {
    return item.id;
  });
  loading.value = false
});

// markdown转html
marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value;
  },
});
const textValue = ref("");
let htmlValue = ref("预览");
watch(textValue, () => {
  htmlValue = marked.parse(textValue.value);
});

// 表单数据
const formValue = reactive({
  title: "",
  description: "",
});
const labelArr = ref([]);
// 获取标签信息
let labels = ref([]);
getLabels().then((res) => {
  labels.value = res.data.result;
});

// 修改
function modifyArticle() {
  modifyArticleSer(
    articleId.value,
    formValue.title,
    textValue.value,
    formValue.description,
    labelArr.value
  ).then(async (res) => {
    if (res.code === 0) {
      ElMessage({ type: "success", message: "修改成功！" });
      router.go(-1);
    } else {
      ElMessage({ type: "error", message: "修改失败" });
    }
  });
}
// 取消修改
function cancelModif() {
  router.go(-1);
  ElMessage({ type: "info", message: "取消修改！" });
}
</script>

<style lang="less" scoped>
.article-modify {
  .notes-container {
    position: relative;
    .box {
      min-height: 1000px;
      min-width: 1000px;
      box-sizing: border-box;
      display: flex;
      // position: relative;
      border: 2px solid skyblue;
      overflow: hidden;
      .left {
        flex: 1;
        width: 500px;
        min-height: 600px;
        // padding: 5px;
        border-right: 2px solid skyblue;
        .textarea {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          outline: none;
          min-height: 600px;
          border: none;
          resize: none;
          color: rgb(105, 94, 94);
          font-family: Times, serif;
        }
      }
      .right {
        padding: 5px;
        flex: 1;
        box-sizing: border-box;
        width: 500px;
        min-height: 600px;
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
    }
  }
}
</style>
