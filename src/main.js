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

// 引入 面包屑 文件
import Crumb from './components/breadcrumb/Crumb.vue'

// 配置 axios
axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'

// 设置 请求拦截器
axios.interceptors.request.use(function(config) {
  // console.dir(config)
  //! config：是一个对象，是 axios 的一个子级成员，可以对其进行配置，这个配置信息会直接作用给 axios
  var token = window.sessionStorage.getItem('token')
  config.headers.Authorization = token
  return config
}, function(error) {
  return Promise.reject(error)
})

Vue.prototype.$http = axios

// 注册 element-UI 组件
Vue.use(ElementUI)

Vue.config.productionTip = false

// 引入公共组件 --- 面包屑
Vue.component('com-crumb', Crumb)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
