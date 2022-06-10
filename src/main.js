import Vue from 'vue'
import App from './App.vue'

// 全局注册三级联动
import TypeNav from '@/components/TypeNav';
Vue.component(TypeNav.name, TypeNav);
// 全局注册轮播组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel);
// 全局注册分页组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';
// 引入 mockServe --- mock数据
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css"
// 引入所有的Api 接口
import * as API from '@/api'
//  element-ui 按需引入 
import { Button, MessageBox, Message } from 'element-ui';
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message
// 使用图片懒加载 (报错：无法识别 v-lazy 指令)
// import VueLazyload from "vue-lazyload"
// import loadimage from "@/assets/gx.gif"
// Vue.use(VueLazyload, {
//   loading: loadimage,
// });
// 引入 vee-validate 插件
import '@/plugins/validate'

// 测试。存在跨域问题。解决：在veu.config.js中配置代理服务器
// import { reqCatagoryList } from '@/api';
// reqCatagoryList().then((res) => {
//   console.log(res);
// })

new Vue({
  render: h => h(App),
  router,
  store,
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 将所有的接口都挂载到 vm 身上
    Vue.prototype.$API = API;
  },
}).$mount('#app')