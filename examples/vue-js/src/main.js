import antd from 'ant-design-vue';
import Vue from 'vue';
import App from './App.vue';

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(antd);

new Vue({
  render: h => h(App),
}).$mount('#app');
