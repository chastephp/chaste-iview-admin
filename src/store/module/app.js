import routes from '@/router/routes'

const hasChild = (item) => {
  return item.children && item.children.length !== 0
}
const getMenuByRouter = (list, user) => {
  const ret = []
  list.forEach((item, key) => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      const menu = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (hasChild(item)) {
        menu.children = getMenuByRouter(item.children, user)
        ret.push(menu)
        return
      }

      if (user && (user.is_super || user.permissions.includes(item.name))) {
        ret.push(menu)
      }
    }
  })

  return ret.filter(item => {
    if (item.meta.hideInMenu === false) return true
    return !item.children || item.children.length > 0
  })
}

const getBreadcrumbs = (route) => {
  const routeMatched = route.matched

  return routeMatched.filter(item => {
    return item.meta === undefined || !item.meta.hideInBreadcrumb
  }).map(item => {
    return {
      name: item.name,
      meta: item.meta
    }
  })
}

export default {
  state: {
    breadcrumbs: []
  },
  getters: {
    menuList: (state, getters, rootState) => {
      return getMenuByRouter(routes, rootState.user.user)
    }
  },
  mutations: {
    setBreadCrumbs (state, route) {
      state.breadcrumbs = getBreadcrumbs(route, { name: 'home' })
    }
  }
}
