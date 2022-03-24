// 引入 vue 和 vue-router
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';

// 暴露对象
export default new VueRouter({
  // 配置路由
  routes: [
    {
      path: "/home",
      component: Home,
      // 配置路由元信息，控制 Footer组件显示与隐藏
      meta: { showFooter: true }
    },
    
    {
      path: "/login",
      component: Login,
      meta: { showFooter: false }
    },
    {
      path: "/register",
      component: Register,
      meta: { showFooter: false }
    },
    {
      // 进行编程式路由跳转，且传递params参数，必须使用name
      name: "search",
      path: "/search/:keyword", // 占位
      component: Search,
      meta: { showFooter: true }
    },
    // 路由重定向，访问根式，默认展示 home 
    {
      path: "/",
      redirect: "/home"
    }
  ]
})