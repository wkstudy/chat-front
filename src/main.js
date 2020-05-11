import Vue from 'vue'
import 'normalize.css'
import './assets/css/base.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api/config'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
