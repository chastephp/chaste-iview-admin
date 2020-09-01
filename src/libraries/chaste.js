import axios from 'axios'
import config from '../config/'
import auth from './auth'
import ViewUI from 'view-design'
import dayjs from 'dayjs'

export default {
  request (url, method = 'POST') {
    return (data = {}, options = {}) => {
      options.headers = Object.assign({
        'Content-Type': 'application/json', // 默认值,
        Accept: 'application/json',
        Authorization: 'Bearer ' + auth.getToken()
      }, options.headers || {})

      const conf = Object.assign({
        baseURL: config.apiBaseUrl,
        timeout: options.timeout || 5000,
        url,
        data,
        method
      }, options)

      if (!conf.method || conf.method.toUpperCase() === 'GET') {
        conf.params = conf.data
        conf.data = null
      }

      // 处理日期数据
      for (const i in data) {
        if (data[i] instanceof Date) {
          data[i] = dayjs(data[i]).format('YYYY-MM-DD HH:mm:ss')
        }
      }

      const instance = axios.create()

      instance.interceptors.response.use(function (res) {
        if (res.status === 200) {
          // 如果返回未登录，跳转login
          if (res.data.code === 40001) {
            auth.logout()
          }
          if (res.data.code !== 0) {
            ViewUI.Message.error(res.data.message)
          }
          return res.data
        }
        return res.data
      }, function (error) {
        // that falls out of the range of 2xx
        // 对响应错误做点什么
        ViewUI.Message.error('request error:' + error.message)
        console.log('api request error:', error)
        return Promise.resolve(error) // 不抛出错误
      })

      return instance.request(conf)
    }
  },
  setStorageSync (key, value) {
    window.localStorage.setItem(config.appName + ':' + key, JSON.stringify(value))
  },
  getStorageSync (key) {
    const val = window.localStorage.getItem(config.appName + ':' + key)
    if (val === null) return null
    if (val === 'undefined') return undefined
    return JSON.parse(val)
  }
}
