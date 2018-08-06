import Vue from 'vue'
import App from './App'
import router from './router'
import './directives'
import './components'
import $ from 'jquery'
import 'chosen-js/chosen.css'
import 'chosen-js'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
