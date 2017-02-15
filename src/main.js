import Vue from 'vue'
import App from './App'
import toastr from 'toastr'
import axios from 'axios'
import VueMaterial from 'vue-material'
import router from './router'
import 'vue-material/dist/vue-material.css'
import './assets/material.font.css'
import 'toastr/build/toastr.min.css'

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
// Vue.filter('imgUrlPrefix',(value) => {
//   const url = value.substr(7)
//   const prefix = "https://images.weserv.nl/?url="
//   return prefix + url
// })

Vue.use(VueMaterial)
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  created(){
    toastr.success('启动成功!')
  },
  router,
  render: h => h(App)
}).$mount('#app')
