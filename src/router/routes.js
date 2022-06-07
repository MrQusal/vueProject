import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default [
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
    meta: { showFooter: false },
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
    props: ($route) => { return { keyword: $route.params.keyword }; }
  },
  // 路由重定向，访问根式，默认展示 home 
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/detail/:skuId",
    component: Detail
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: AddCartSuccess,
    meta: { showFooter: true }
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: ShopCart
  }
]