import Main from '@/views/main'
import authority from './authority'

const system = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/', // 为了将/跳转至home
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      icon: 'md-apps',
      hideInBreadcrumb: true,
      hideInMenu: true,
      title: '首页',
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInBreadcrumb: true,
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/views/home')
      }
    ]
  },
  {
    path: '',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/password',
        name: 'password',
        meta: {
          hideInMenu: true,
          title: '修改密码',
          notCache: true
        },
        component: () => import('@/views/auth/admin/password.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/errors/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/errors/500.vue')
  },
  {
    path: '404',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/errors/404.vue')
  }
]

const routes = system.concat(authority)

export default routes
