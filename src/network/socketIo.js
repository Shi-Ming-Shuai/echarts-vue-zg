// 封装soket io方法
// 建立连接
let wsObj = io('http://localhost:4000')
const socketMessage = (url) => {
  return new Promise((resolve, reject) => {
    // 使用 emit 向服务器发送消息
    wsObj.emit('message', url)
    // 使用on url为 emit自己传出去的信息 接收服务器返回的消息
    wsObj.on(url, res => {
      const result = JSON.parse(res)
      // 将从socket接收的信息 返回出去
      resolve(result)
    })
  })
}
export { socketMessage }