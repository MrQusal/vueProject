// 引入 vue 和 vue-router
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入路由表
import routes from './routes'

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




// 暴露对象
export default new VueRouter({
  // 配置路由
  routes,
  // 滚动行为：路由跳转后，默认在顶部
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部 r3 --> y: 0。r4 --> top: 0
    return { y: 0 }
  },
})