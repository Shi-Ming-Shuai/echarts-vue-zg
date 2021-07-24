import Vue from 'vue'
import App from './App.vue'
// Element 组件按需加载
import { Row, Col, Button } from 'element-ui'
// 引入echarts主题
import '@/echartsTheme/theme_lan.js'
import '@/echartsTheme/theme_qing.js'
Vue.use(Row).use(Col).use(Button)
Vue.config.productionTip = false
// 引入socket-io 在public html文件中
//   <script src="http://localhost:4000/socket.io/socket.io.js"></script>

new Vue({
  render: h => h(App),
}).$mount('#app')
