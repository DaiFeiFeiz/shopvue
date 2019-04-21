import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 引入 登录页面
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: HelloWorld},
    {path: '/login', component: Login}
  ]
})
