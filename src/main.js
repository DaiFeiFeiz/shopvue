import Vue from 'vue'
import App from './App'
import router from './router'

// 引入当前项目的 全局 css 样式 控制文件
import './assets/css/global.css'

// 引入 element-ui 文件
import ElementUI from 'element-ui'

// 引入 font 字体图标
import './assets/fonts/iconfont.css'

// 引入 axios 文件
import axios from 'axios'

// 配置 axios
axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'
Vue.prototype.$http = axios

// 注册 element-UI 组件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
