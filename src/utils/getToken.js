// 获取用户token   用户设置 axios 请求头携带
import { getItem } from './storage'

export const getToken = () => {
  const token = getItem('token')
  // 判断用户是否登录 并且 token存在
  if (token) return token
  return null
}
