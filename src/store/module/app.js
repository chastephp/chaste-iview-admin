import routes from '@/router/routes'

const hasChild = (item) => {
  return item.children && item.children.length !== 0
}
const getMenuByRouter = (list) => {
  const res = []
  list.forEach((item, key) => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      const menu = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (hasChild(item)) {
        menu.children = getMenuByRouter(item.children)
      }
      res.push(menu)
    }
  })
  return res
}

export default {
  state: {},
  getters: {
    menuList: (state, getters, rootState) => {
      // todo 根据权限筛选菜单
      return getMenuByRouter(routes)
    }
  },
  mutations: {}
}
