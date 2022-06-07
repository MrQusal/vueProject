import Vuex from "vuex";
import Vue from "vue";

// 导入各自的小仓库
import home from './home';
import search from './search';
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
// 使用插件
Vue.use(Vuex);


// 暴露
export default new Vuex.Store({
  // 模块式开发
  modules: {
    home,
    search,
    detail,
    shopCart,
    user
  }
})