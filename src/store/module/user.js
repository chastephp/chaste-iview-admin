import auth from '@/libraries/auth'

export default {
  state: {
    user: auth.getUser()
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      return auth.setUser(user)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.login(data).then(res => {
          if (res.code === 0) {
            auth.setToken(res.data.access_token)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        api.user().then(res => {
          if (res.code === 0) {
            commit('setUser', res.data)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogout ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setUser', {})
        auth.logout()
        resolve()
      })
    }
  }
}
