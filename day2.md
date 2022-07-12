1: 编程式路由跳转当前路由（参数不变），多次执行后会抛出NavigationDuplicated错误
  原因：‘veu-router’ 版本3最新版，引入了 promise。即push()方法返回值为 promise 对象
  只需要给push()方法传递相应成功、失败的回调，就可以解决改问题
  this.$router.push(location, resolve, reject) 即可

  此方法指标不治本。再别的组件进行此类跳转，都需要传入回调
  治本：重写 VueRouter原型上的push方法（this.$router 是VueRouter类的的实例）
  <b>this.$router.__proto__ === VueRouter.prototype</b>

2: 三级联动组件完成
  --- 由于三级联动，在Home、Search、Detail，把三级联动注册为全局组件
  好处：注册一次，全局使用

3：完成其余组件
  HTML 结构 + Css 样式 + 图片资源

4：axios 二次封装
  XMLHttpRequest、fetch、Jq、axios
  为什么要进行二次封装？
    配置请求、相响应拦截器（用于加token、直接返回data对象等）
    一般后代接口会配置代理，那么路径中就会有一些共有的配置 '/api' ...
  项目中axios 的二次封装一帮放在 API 文件夹中

5：接口统一管理
  项目小：可以在生命周期函数中调用，展示
  项目大：需要进行统一管理（在api中创建 index.js模块）

6：跨域问题
  前端服务器：http://localhost:8080/#/home
  后端服务器：http://39.98.123.211
  解决：在vue.config.js 配置 devServer 代理服务器


7：nprogress进度条的使用
  npm install --save nprogress
  用于实现效果：网络请求时出现，结果返回后消失
  在拦截器处使用

  start() 表开始、done()表结束、使用时还需要引入nprogress.css样式
  #nprogress .bar 样式可修改进度条样式

8：vuex：集中式管理组件共用的数据
  npm install --save vuex
  重要概念：state、mutations、actions、getters、modules（模块化）
  版本要对应 vue2 -- vuex3
  模块化、新建 Home、Login...等的各自小仓库

  