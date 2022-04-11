<template>
  <div>
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
        <p>
          忘记密码?
          <button @click.prevent="handleForgot"><a>立即找回</a></button>
        </p>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    loginUser: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    const axios = inject('axios')
    const router = useRouter()
    const ruleFormRef = ref<FormInstance>()
    // 触发登录的方法
    const submitForm = (formEl: FormInstance | undefined) => {
      console.log(formEl)
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          // @ts-ignore
          axios

            // api =='https://imissu.herokuapp.com/api/',
            .post('/api/v1/auth/login', props.loginUser)
            .then((res: any) => {
              // 注册成功
              console.log('登录成功')

              // 存储tocken 到 ts
              const { token } = res.data

              // const token=res.data.token

              localStorage.setItem('msToken', token)

              router.push('/')
            })
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    const handleForgot = () => {
      // ? 跳转路由
      router.push('/forget')
    }
    return {
      submitForm,
      ruleFormRef,
      handleForgot,
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
