import config from '../config'
import chaste from '@/libraries/chaste'

const key = config.tokenKey || 'admin-access-token'

export default {
  setUser (user) {
    return chaste.setStorageSync('user', user)
  },
  getUser () {
    return chaste.getStorageSync('user')
  },
  setToken: token => localStorage.setItem(key, token),
  removeToken: () => localStorage.removeItem(key),
  getToken: () => localStorage.getItem(key),
  logout () {
    this.setUser({})
    this.removeToken()
    window.location.reload()
  }
}
