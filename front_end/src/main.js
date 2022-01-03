import Vue from 'vue'
import App from './App.vue'
// 导入VueRouter
import router from './router'
// 导入全局样式表
import './assets/css/global.css'
// 导入elementUI
import ElementUI from 'element-ui'
// 导入elementUI样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入axios
import axios from 'axios'
// 导入Vuex
import Vuex from 'vuex'
// 导入store
import store from './store';
// 使用ElementUI
Vue.use(ElementUI)
// 使用Vuex
Vue.use(Vuex)

// 修改原型
Vue.prototype.$http = axios //axios

Vue.prototype.baseUrl = 'http://127.0.0.1:8833/api'

Vue.config.productionTip = false

// 配置拦截器
axios.interceptors.request.use(config=>{
  if (config.url ===Vue.baseUrl+'/userlogin')
  return config
  config.headers.authorization = 'Bearer ' + window.localStorage.getItem('token')
  return config
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
