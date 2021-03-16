// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VModal from 'vue-js-modal'
import App from './App'
import router from './router'
require('../../node_modules/bootstrap/dist/css/bootstrap.css')
require('../../node_modules/bootstrap/dist/js/bootstrap.min.js')

Vue.config.productionTip = false
Vue.use(VModal)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
