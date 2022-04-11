<template>
  <!-- form 表单容器  -->
  <div class="container" :class="{ 'sign-up-mode': signUpMode }">
    <div class="forms-container">
      <div class="signin-signup">
        <!-- 登录   -->

        <el-form
          label-width="120px"
          class="loginForm sign-in-form"
          :model="loginUser"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item label="邮箱" prop="email">
            <span>{{ loginUser.email }}</span>
            <el-input placeholder="请输入邮箱..." v-model="loginUser.email" />
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <span>{{ loginUser.password }}</span>
            <el-input
              type="password"
              placeholder="请输入密码..."
              v-model="loginUser.password"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              @click="submitForm(ruleFormRef)"
              type="primary"
              class="submit-btn"
              >提交</el-button
            >
          </el-form-item>
          <div class="tiparea">
            <p>忘记密码? <a>立即找回</a></p>
          </div>
        </el-form>

        <!-- 注册  -->
      </div>
    </div>

    <!-- 左右切换动画  -->
    <div class="panels-container">
      <!-- 左边 -->

      <div class="panel left-panel">
        <div class="content">
          <h3>学习是为了有更多的选择,让生活变的更美好!</h3>
          <p>何以解忧,唯有米修</p>
          <button @click="signUpMode = !signUpMode" class="btn transparent">
            注册
          </button>
        </div>
        <img src="@/assets/img/log.svg" class="image" alt="" />
      </div>

      <!-- 右边  -->

      <div class="panel right-panel">
        <div class="content">
          <h3>以人为镜,可明得失, 以代码为镜,可通逻辑!</h3>
          <p>学习编程,让你的生活更有趣</p>
          <button @click="signUpMode = !signUpMode" class="btn transparent">
            登录
          </button>
        </div>
        <img src="@/assets/img/register.svg" class="image" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { FormInstance } from 'element-plus'

import { loginUser, rules } from '@/utils/Loginvalidator'
export default defineComponent({
  setup() {
    const signUpMode = ref(false)
    const ruleFormRef = ref<FormInstance>()
    const submitForm = (formEl: FormInstance | undefined) => {
      console.log(formEl)
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    return {
      signUpMode,
      loginUser,
      rules,
      submitForm,
      ruleFormRef,
    }
  },
})
</script>
<style scoped>
/* form */
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  z-index: 10;
}

.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
