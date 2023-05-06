<template>
  <div class="article-create">
    <h1>文章编辑</h1>
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
      <el-button type="primary" @click="submitArticle">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";

import { getLabels, createArticle } from "../../services/index";
import { ElMessage } from "element-plus";

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

const formValue = reactive({
  title: "",
  description: ""
});
const labelArr = ref([])

let labels = ref([]);
getLabels().then((res) => {
  labels.value = res.data.result;
});

function submitArticle() {
  createArticle(formValue.title, textValue.value,formValue.description, labelArr.value).then(
    (res) => {
      if (res.code === 0) {
        console.log("创建成功");
        ElMessage({ type: "success", message: "创建成功！" });
      } else {
        console.log(res);
        ElMessage({ type: "error", message: "创建失败！请检查参数是否正确！" });
      }
    }
  );
}
</script>

<style lang="less" scoped>
.article-create {
  border: 1px solid blue;
  

  .notes-container {
    border: 1px solid red;
    position: relative;
    .box {
      min-height: 1000px;
      min-width: 1000px;
      box-sizing: border-box;
      display: flex;
      // position: relative;
      border: 2px solid gray;
      overflow: hidden;
      .left {
        flex: 1;
        width: 500px;
        min-height: 600px;
        padding: 5px;
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
        border-left: 1px solid gray;
        // color: gray;
      }
    }
    .el-button {
      width: 100px;
      position: absolute;
      // bottom: 10px;
      margin: 20px 0;
      padding: 20px 0;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
