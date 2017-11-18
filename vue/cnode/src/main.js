// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import VueScroller from 'vue-scroller'
import * as filters from './filters/'
Vue.use(VueScroller)

Vue.config.productionTip = false

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 注册过滤器
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
