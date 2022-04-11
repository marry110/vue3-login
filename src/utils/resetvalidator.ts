import { reactive } from 'vue'
interface passForm {
  newPass: string
  confirmPass: string
}
export const passForm = reactive<passForm>({
  newPass: '',
  confirmPass: '',
})
// ? 确认密码校验回调函数
const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== passForm.newPass) {
    callback(new Error('请输入相同的密码'))
  } else {
    callback()
  }
}

interface Rules {
  newPass: (
    | {
        message: string
        required: boolean
        trigger: string
        min?: undefined
        max?: undefined
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
        required?: undefined
      }
  )[]
  confirmPass: {
    validator: (rule: any, value: string, callback: any) => void
    trigger: string
  }[]
}

export const passRules = reactive<Rules>({
  newPass: [
    // ! 键名必须与 template 中的 prop 属性保持一致
    {
      message: '密码不能为空',
      required: true,
      trigger: 'blur',
    },
    {
      min: 6,
      max: 30,
      message: '密码长度范围必须在 6~30 字符内',
      trigger: 'blur',
    },
  ],
  confirmPass: [
    // ! 键名必须与 template 中的 prop 属性保持一致
    {
      validator: validatePass2,
      trigger: 'blur',
    },
  ],
})
