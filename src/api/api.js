import chaste from '../libraries/chaste'

const r = chaste.request

export default {
  login: r('/auth/login', 'POST'),
  app: {
    config: {
      list: r('/app/config/list'),
      info: r('/app/config/info'),
      update: r('/app/config/update')
    }
  },
  permission: {
    list: r('/permission/list', 'POST')
  },
  role: {
    list: r('/role/list', 'POST'),
    create: r('/role/create', 'POST'),
    update: r('/role/update', 'POST')
  },
  admin: {
    list: r('/admin/list', 'POST'),
    create: r('/admin/create', 'POST'),
    update: r('/admin/update', 'POST'),
    delete: r('/admin/delete', 'POST'),
    current: r('/admin/current', 'POST'),
    changePassword: r('/admin/password/change', 'POST')
  }
}
