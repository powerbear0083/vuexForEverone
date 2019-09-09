// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store } from '@/store/store'
import { currency } from '@/currency'

Vue.config.productionTip = false
/* eslint-disable no-new */
// 只要在 root instance 注入 store 
// 就可以在所有元件存取到 store 
// 這樣就有全域的 store 透過 this.$store 存取

Vue.filter('currency', currency)
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
