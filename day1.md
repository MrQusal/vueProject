1: vue-cli脚手架初始化项目
node + webpack + 淘宝镜像

node_modules文件夹：项目依赖文件夹

public文件夹：放置静态资源（webpack打包时，会原封不动的打包到dist文件夹中）

src文件夹（源代码）

  assets文件夹：一般放置静态资源（多个组件公用的、webpack打包时会把静态资源当作一个模块，打包到JS文件中）

  components文件夹：放置非路由组件（全局组件）

  App.vue：唯一的根组件
  main.js：程序的入口文件

babel.config.js：配置文件（babel相关）

package.json文件：认为项目的身份证，记录项目叫什么，有什么依赖，怎么运行等

package-lock.json文件：缓存文件，说明依赖从哪来

readme.md文件：项目的说明文件


2: 项目配置

2.1 项目运行起来时，让浏览器自动打开
  "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },

2.2 eslint校验功能关闭
  创建 vue.config.js 文件（查看vue-cli官网）

2.3 src文件夹简写方法，配置别名
jsconfig.json 配置别名@提示【@就代表src文件夹】
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}



3: 项目路由的分析
vue-router
key：URL（路径）
value：路由组件
注意：项目是上、中、下结构

路由组件：
Home、Search、login、Register
非路由组件
Header【首页、搜索页】
Footer【首页、搜索页】，但在登录、注册页没有

4：完成Header与Footer组件业务
开发项目：
  1：写静态页面
  2：拆分组件
  3：获取服务器数据
  4：完成业务逻辑

  注意点1：创建组件的时候，结构 + 样式 + 图片资源

  注意点2：若采用 less 样式，安装 less-loader 5版本进行处理
    npm install --save less less-loader@5

  注意点3：使用less 样式，还需要再 style 上加上 lang=less

5：路由组件的搭建
使用 vue-router@3、vue2 不支持 4以上的vue-router
- componens：一般放非路由组件
- pages/views：一般放路由组件

  5.1 配置路由
  一般放在router文件夹（index.js）中

6：小总结
路由和非路由组件的区别？
  1. 路由组件一帮放在pages/views文件夹中，非路由组件放在components文件夹中
  2. 路由组件需要在router文件夹中注册，页面中还需要配合router-view标签使用。而非路由组件，直接写标签名
  3. 注册完路由，不管是路由还是非路由组件，都有$route、$router属性

$route：一般用于获取路由信息（路径、query、params参数等）
$router：一般用于编程式导航进行路由跳转【push/replace】

7：路由跳转
  1. 声明式导航 router-link
  2. 编程时导航 push/replace。还可以增加一些业务逻辑


8: Footer 组件的显示与隐藏
  在Home、Search 时显示
  在Login、Register 时隐藏
  可以在 Footer 标签处 直接判断 router.path
  更好的方式：配置路由元 showFooter 来控制


9: 路由组件相关面试题
  1. 路由传参时（对象写法），path是否可以结合params参数一起使用
    答：不能，如果使用对象写法，并且传递params参数，就必须使用 name
  2. 如何指定params参数可传可不传？
    如果占位了，但是没传，那么URL会出现问题
    解决：在占位符的后面加上?（正则中?表出现一次或不出现）
  3. 如果params参数传递的空串，如何解决？
    如果传递的是空串，URL也会出现问题
    解决：使用 undefined。 params: { keyword: "" || undefined },