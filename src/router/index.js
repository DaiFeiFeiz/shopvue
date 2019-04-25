import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 引入 登录页面
import Login from '@/components/Login'

// 引入 后台首页面
import Home from '@/components/Home'

// 引入 第三级页面
import Welcome from '@/components/Welcome'
import User from '@/components/User'
import Rights from '@/components/Rights'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/login', component: Login},
    {path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {path: '/welcome', component: Welcome},
        {path: '/users', component: User},
        {path: '/rights', component: Rights}]
    }
  ]
})

// 设置路由守卫
router.beforeEach((to, from, next) => {
  var token = window.sessionStorage.getItem('token')
  if (token === null && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router
