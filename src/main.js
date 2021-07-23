import Vue from 'vue'
import App from './App.vue'
// Element 组件按需加载
import { Row, Col, Button } from 'element-ui'
Vue.use(Row).use(Col).use(Button)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
