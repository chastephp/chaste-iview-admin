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
    handleLogin ({ commit }, { account, password }) {
      account = account.trim()
      return new Promise((resolve, reject) => {
        api.login({
          account,
          password
        }).then(res => {
          if (res.code === 0) {
            commit('setUser', res.data)
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
        api.admin.info().then(res => {
          commit('setUser', res.data)
          resolve(data)
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
