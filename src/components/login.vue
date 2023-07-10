<template>
  <div class="login">
    <div class="login-container">
      <h1>后台管理系统</h1>
      <el-form
        class="login-ruleForm"
        ref="formRef"
        :rules="rules"
        :model="formValue"
      >
        <el-form-item label="账号" prop="name">
          <el-input type="text" v-model="formValue.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formValue.password" />
        </el-form-item>
        <div class="button">
          <el-button type="primary">游客</el-button>
          <el-button type="primary" @click="loginClick(formRef)"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services";

const router = useRouter();

const formRef = ref();
const formValue = reactive({
  name: "tjx",
  password: "123456",
});

// 验证规则
const rules = reactive({
  name: [
    { required: true, trigger: "blur", message: "请输入用户名" },
    {
      min: 3,
      max: 12,
      message: "用户名长度为3-12位数字或字符！",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, trigger: "blur", message: "请输入密码！" },
    {
      min: 6,
      max: 20,
      message: "密码长度为6-20位！",
      trigger: "blur",
    },
  ],
});

const loginClick = function (formRef) {
  formRef.validate((valid) => {
    if (valid) {
      login(formValue.name, formValue.password).then((res) => {
        console.log(res)
        localStorage.setItem("adminToken", res.data.token)
        ElMessage({
          type: "success",
          message: "登录成功！",
        });
        router.push("/home");
      });
    } else {
      ElMessage({
        type: "error",
        message: "登录失败！",
      });
    }
  });
};
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-container {
    width: 350px;
    height: 300px;
    border: 1px solid #dcdfe6;

    h1 {
      text-align: center;
    }

    .login-ruleForm {
      width: 300px;
      margin: 0 auto;

      .button {
        margin: 30px 80px;
      }
    }
  }
}
</style>
