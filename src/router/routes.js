export default [
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    // 配置路由元信息，控制 Footer组件显示与隐藏
    meta: { showFooter: true }
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { showFooter: false }
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { showFooter: false },
  },
  {
    // 进行编程式路由跳转，且传递params参数，必须使用name
    name: "search",
    path: "/search/:keyword?", // 占位
    component: () => import("@/pages/Search"),
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
    component: () => import("@/pages/Detail")
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: () => import("@/pages/AddCartSuccess"),
    meta: { showFooter: true }
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: () => import("@/pages/ShopCart")
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import("@/pages/Trade"),
    // 配置独享守卫
    beforeEnter: (to, from, next) => {
      const fromPath = from.path;
      // 交易页面，只能从购物车（点击结算时，并且携带orderId）
      if (fromPath === '/shopCart') {
        next();
      } else {
        // 停留在当前页
        next(false);
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import("@/pages/Pay"),
    beforeEnter: (to, from, next) => {
      const fromPath = from.path;
      // 只能从 trade 页面跳转至 pay 页面
      if (fromPath === '/trade') {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import("@/pages/PaySuccess"),
  },
  {
    path: '/center',
    name: 'center',
    component: () => import("@/pages/Center"),
    children: [
      {
        path: 'myorder',
        name: 'myorder',
        component: () => import("@/pages/Center/MyOrder")
      },
      {
        path: 'grouporder',
        name: 'grouporder',
        component: () => import("@/pages/Center/GroupOrder")
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  }
]