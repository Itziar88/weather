import '@babel/polyfill'
import Vue from 'vue'
import '@/plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import axios from './api'

Vue.config.productionTip = false

new Vue({
    store,
    axios,
    render: h => h(App),
}).$mount('#app')
