<template>
  <div>
    <!-- 注册  -->
    <el-form
      label-width="120px"
      class="registerForm sign-up-form"
      :model="registerUser"
      :rules="registerRules"
      ref="ruleFormRefRegister"
    >
      <el-form-item label="用户名" prop="name">
        <span>{{ registerUser.name }}</span>
        <el-input placeholder="请输入用户名..." v-model="registerUser.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <span>{{ registerUser.email }}</span>
        <el-input placeholder="请输入用户名..." v-model="registerUser.email" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <span>{{ registerUser.password }}</span>
        <el-input
          type="password"
          placeholder="请输入密码..."
          v-model="registerUser.password"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <span>{{ registerUser.password2 }}</span>
        <el-input
          type="password"
          placeholder="请确认密码..."
          v-model="registerUser.password2"
        />
      </el-form-item>
      <el-form-item label="选择身份">
        <el-select v-model="registerUser.role" placeholder="请选择身份...">
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="用户" value="user"></el-option>
          <el-option label="游客" value="visitor"></el-option>
          <el-option>user</el-option>
          <el-option>visitors</el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          @click="RegistersubmitForm(ruleFormRefRegister)"
          type="primary"
          class="submit-btn"
          >注册</el-button
        >
      </el-form-item>
      <div class="tiparea">
        <p>忘记密码? <a>立即找回</a></p>
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
    registerUser: {
      type: Object,
      required: true,
    },
    registerRules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    const axios = inject('axios')
    const router = useRouter()
    //  const props = defineProps()
    //  登录提交
    const ruleFormRefRegister = ref<FormInstance>()
    const RegistersubmitForm = (formEl: FormInstance | undefined) => {
      console.log(formEl)
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          // @ts-ignore
          axios

            // api =='https://imissu.herokuapp.com/api/',
            .post('/api/v1/auth/register', props.registerUser)
            .then((res: any) => {
              // 注册成功
              console.log('注册成功')

              router.push('/')
            })
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return {
      // 会抽离到register 登录页面

      // 验证密码
      ruleFormRefRegister,
      RegistersubmitForm,
    }
  },
})
</script>

<style scoped>
/* register */
.registerForm {
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
