// 引入 vue 和 vue-router
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

// 根治 编程式路由跳转当前路由，多次执行后会抛出NavigationDuplicated错误
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

// 重写 push 和 replace
// 参数列表：跳转的目标、成功的回调、失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  // 如果传了回调
  if (resolve && reject) {
    // 改变 originPush 调用时 this的指向
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  // 如果传了回调
  if (resolve && reject) {
    // 改变 originPush 调用时 this的指向
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}


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
      path: "/search/:keyword?", // 占位
      component: Search,
      meta: { showFooter: true },
      // 路由组件可以传递props 参数
      // 布尔值写法：只能传递 params 参数
      // props: true,
      // 函数写法：都能传递
      props: ($route) => { return { keyword: $route.params.keyword, k: $route.query.k }; }
    },
    // 路由重定向，访问根式，默认展示 home 
    {
      path: "/",
      redirect: "/home"
    }
  ]
})