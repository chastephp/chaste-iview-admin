import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import config from './config'
import chaste from '@/libraries/chaste'
import api from '@/api/api'
import 'view-design/dist/styles/iview.css'

window.chaste = chaste
window.api = api

Vue.use(ViewUI)

Vue.config.productionTip = false
Vue.prototype.$config = config

if (process.env.NODE_ENV !== 'production') require('@/api/mock')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
