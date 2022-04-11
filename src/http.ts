import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'

let loading: any
const startloading = () => {
  interface Options {
    lock: boolean
    text: string
    background: string
  }
  const option: Options = {
    lock: true,
    text: '加载中.......',
    background: 'rgba(0,0,0,.7)',
  }
  loading = ElLoading.service(option)
}

const endloading = () => {
  loading.close()
}

// 请求拦截

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  //加载
  startloading()

  return config
})

// 相应拦截

axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    //结束loading
    endloading()
    return response
  },
  (errors) => {
    // 错误提醒
    endloading()
    return Promise.reject(errors)
  }
)

export default axios
