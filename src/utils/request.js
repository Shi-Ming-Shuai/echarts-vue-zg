import axios from 'axios'


// 导出自己封装的方法
export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 8000, // 超时时间(请求超过这个时间 直接报错)
  })
  // axios拦截器
  // 1.请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    console.log('请求拦截错误' + error)
  })

  // 2. 响应拦截
  instance.interceptors.response.use(resolve => {
    return resolve.data
  }, error => {
    console.log('响应拦截器错误')
    console.dir(error)
    // 将错误信息传递下去  （却保 try catch 能捕获到 错误的响应）
    return Promise.reject(error)
  }

  )

  // 把实例传递出去
  return instance(config)
}
