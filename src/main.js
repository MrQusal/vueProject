import Vue from 'vue'
import App from './App.vue'

// 全局注册三级联动
import TypeNav from '@/components/TypeNav';
Vue.component(TypeNav.name, TypeNav);
// 全局注册轮播组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel);
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';
// 引入 mockServe --- mock数据
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css"


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