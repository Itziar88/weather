import '@babel/polyfill'
import Vue from 'vue'
import '@/plugins/bootstrap-vue'
import axios from 'axios'
import App from './App.vue'

import store from '@/store/store'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://www.metaweather.com/api'

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
