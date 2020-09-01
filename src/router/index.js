import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import auth from '@/libraries/auth'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'hash'
})
const LOGIN_PAGE_NAME = 'login'
const HOME_PAGE_NAME = 'home'

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    return next({ replace: true, name: 'error_404' })
  }

  const token = auth.getToken()

  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: HOME_PAGE_NAME // 跳转到home页
    })
  } else {
    // 其它页面
    next()
  }
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
