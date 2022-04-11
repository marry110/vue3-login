import { reactive } from 'vue'

interface RegisterUser {
  name: string
  email: string
  password: string
  password2: string
  role: string
}
// 登录
export const registerUser = reactive<RegisterUser>({
  name: '',
  email: '',
  password: '',
  password2: '',
  role: '',
})
// 登录校验密码

const validatePass2 = (rule: registerRules, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== registerUser.password2) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

interface registerRules {
  name: (
    | {
        message: string
        required: boolean
        trigger: string
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
      }
  )[]
  email: {
    type: string
    message: string
    required: boolean
    trigger: string
  }[]
  password: (
    | {
        message: string
        required: boolean
        trigger: string
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
      }
  )[]
  password2: (
    | {
        message: string
        required: boolean
        trigger: string
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
      }
    | {
        validator: (rule: any, value: any, callback: any) => void
        trigger: string
      }
  )[]
}

// 规则
export const registerRules = reactive<registerRules>({
  name: [
    {
      message: 'user name cannot be empty',
      required: true,
      trigger: 'blur',
    },
    {
      min: 2,
      max: 30,
      message: '长度在2到30个字符之间',
      trigger: 'blur',
    },
  ],
  email: [
    {
      type: 'email',
      message: 'Email is incorrect',
      required: true,
      trigger: 'blur',
    },
  ],
  password: [
    {
      message: 'Password could not empty',
      required: true,
      trigger: 'blur',
    },
    {
      min: 6,
      max: 30,
      message:
        'please keep your password length between 6 to 30 characters long',
      trigger: 'blur',
    },
  ],
  password2: [
    {
      message: 'Password could not empty',
      required: true,
      trigger: 'blur',
    },
    {
      min: 6,
      max: 30,
      message:
        'please keep your password length between 6 to 30 characters long',
      trigger: 'blur',
    },
    { validator: validatePass2, trigger: 'blur' },
  ],
})
