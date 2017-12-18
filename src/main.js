// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from '../node_modules/vue-resource';
import './common/stylus/base.styl';
import 'font-awesome/css/font-awesome.css';
Vue.use(VueResource);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',   // 组件挂载
  router,
  template: '<App/>',
  components: { App }
});
