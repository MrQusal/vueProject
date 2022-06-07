// 引入 vue 和 vue-router
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入路由表
import routes from './routes'
// 引入 store
import store from '@/store'

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




const router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为：路由跳转后，默认在顶部
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部 r3 --> y: 0。r4 --> top: 0
    return { y: 0 }
  },
})

// 设置全局前置路由守卫
router.beforeEach((to, from, next) => {
  const { token } = store.state.user;
  // 有 token 代表登陆了
  if (token) {
    // 登录了就不能去 login 了
    if (to.path === '/login') {
      // 去首页
      next("/");
    } else {
      // 其他情况，需要看仓库中是否有用户信息，有则直接方向，没有需要发请求
      const { loginName } = store.state.user.userInfo;
      if (loginName) {
        next();
      } else {
        store.dispatch("user/getUserInfo").then(() => {
          // 获取成功，则放行
          next();
        }, () => {
          // 失败：服务器给的 token 过期了。那么就需要清除本地存储的 token
          store.dispatch("user/userLogOut");
        })
      }
    }
  } else {
    // 没登陆，跳转到登录页
    // next("/login");
    next()
  }
})
// 暴露对象
export default router