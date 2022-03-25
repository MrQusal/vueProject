import Vue from 'vue'
import App from './App.vue'

// 全局注册三级联动
import TypeNav from '@/components/TypeNav';
Vue.component(TypeNav.name, TypeNav);
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';


// 测试。存在跨域问题。解决：在veu.config.js中配置代理服务器
// import { reqCatagoryList } from '@/api';
// reqCatagoryList().then((res) => {
//   console.log(res);
// })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
