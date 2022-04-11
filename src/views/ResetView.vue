<template>
  <div>
    <el-form
      ref="resetPassForm"
      :model="passForm"
      :rules="passRules"
      label-width="120px"
      class="container"
    >
      <el-form-item label="新的密码" prop="newPass">
        <el-input
          type="password"
          v-model="passForm.newPass"
          placeholder="请输入新的密码"
        />
      </el-form-item>
      <el-form-item label="新的密码" prop="confirmPass">
        <el-input
          type="password"
          v-model="passForm.confirmPass"
          placeholder="请再次输入密码"
        />
      </el-form-item>
      <el-form-item>
        <!-- 提交前进行校验 -->
        <el-button
          @click="handleResetPassword(resetPassForm)"
          type="primary"
          class="submit-btn"
          >重设密码</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { passForm, passRules } from '@/utils/resetvalidator'
export default defineComponent({
  setup() {
    const axios = inject('axios')
    const router = useRouter()
    const route = useRoute()
    console.log(route.params.id)
    const resetPassForm = ref<FormInstance>()

    const handleResetPassword = (formEl: FormInstance | undefined) => {
      console.log(formEl)
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          // @ts-ignore
          axios

            // api =='https://imissu.herokuapp.com/api/',
            .put('/api/v1/auth/resetpassword/', route.params.id, {
              password: passForm.newPass,
            })
            .then((res: any) => {
              // 注册成功
              console.log('密码修改成功')
              console.log(res)
              console.log(route.params.id)
              router.push('/')
              if (res.data.success) {
                router.push('/')
              }
            })
          console.log('submit!')
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return { resetPassForm, passForm, handleResetPassword, passRules }
  },
})
</script>

<style scoped>
.container {
  width: 50%;
  margin: 200px auto;
}
.submit-btn {
  width: 100%;
}
</style>
