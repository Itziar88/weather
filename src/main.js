import '@babel/polyfill';
import Vue from 'vue';
import '@/plugins/bootstrap-vue';
import App from './App.vue';
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://www.metaweather.com/api/';

new Vue({
  render: h => h(App),
}).$mount('#app');
