import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 引入 登录页面
import Login from '@/components/Login'

// 引入 后台首页面
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    // {path: '/', component: HelloWorld},
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
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
