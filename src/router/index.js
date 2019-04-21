import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 引入 登录页面
import Login from '@/components/Login'

// 引入 后台首页面
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/', component: HelloWorld},
    {path: '/login', component: Login},
    {path: '/home', component: Home}
  ]
})
