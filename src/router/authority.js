import Main from '@/views/main'

const R = function (option) {
  return {
    path: option.path,
    name: option.name || option.component || option.path,
    meta: {
      hideInMenu: option.hide,
      title: option.title,
      notCache: true
    },
    children: option.children || [],
    component: () => import(/* webpackMode: "lazy-once" */'@/views' + (option.component || option.path))
  }
}

export default [
  {
    path: '',
    name: '系统设置',
    component: Main,
    meta: {
      icon: 'ios-construct',
      title: '系统设置',
      notCache: true
    },
    children: [
      R({ title: '系统设置', path: '/app/config', component: '/app/config' }),
      R({ title: 'Banner', path: '/app/banner', component: '/app/banner' })
    ]
  },
  {
    path: '',
    name: '权限管理',
    component: Main,
    meta: {
      icon: 'ios-podium',
      title: '权限管理',
      notCache: true
    },
    children: [
      R({ title: '管理员列表', path: '/auth/admin/list', component: '/auth/admin/list' }),
      R({ title: '管理员编辑', path: '/auth/admin/edit/:id?', component: '/auth/admin/edit', hide: true }),
      R({ title: '角色列表', path: '/auth/role/list', component: '/auth/role/list' }),
      R({ title: '角色编辑', path: '/auth/role/edit/:id?', component: '/auth/role/edit', hide: true }),
      R({ title: '权限列表', path: '/auth/permission/list', component: '/auth/permission/list' })
    ]
  }
]
