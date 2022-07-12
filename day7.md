## 图片懒加载

1. 使用 vue-lazyload 插件
2. 使用出错

## 表单验证

1. 使用 vee-validate 插件
2. 查看文档，书写验证规则

## 路由懒加载

1. 使用 import 函数即可

## 项目打包/上线

1. 打包：npm run build
2. 不生成 source-map 文件

   - 在 vue.config.js 中设置 productionSourceMap: false 即可

3. 将打包生成的 dist 目录放在 /home/theei/project/www/gmall 中

   - 下载 nginx： yum install nginx（下载后，在/etc/nginx 下修改配置文件）
   - vim /etc/nginx/nginx.conf 。增加如下代码
     1. location / {
        root /home/theei/project/www/gmall;
        index index.html;
        try_files $uri $uri/ /index.html;
        }
     2. location /api {
        proxy_pass http://gmall-h5-api.atguigu.cn;
        }
   - 重启 nginx ：/usr/sbin/./nginx -s reload

## 复习

### 组件通信方式

1. props

   - 场景：父子通信
   - 书写方式：3 种 ['todos'], {type: Array}, {type:Array, default: []}
   - 注意：路由组件也可传递 props。也是 3 种 布尔值|对象|函数（使用多）

2. 自定义事件

   - 场景：子父通信
   - 注意：$on 绑定事件 | $emit 触发事件 | $off 解绑事件

3. 全局事件总线

   - 场景：兄弟组件通信
   - 注意：在 beforeCreate 钩子中注册全局总线 Vue.prototype.$bus = this;

4. pubsub-js 订阅/发布（react 用的多）

5. vuex

   - 场景：万能（需要先保存数据，再从仓库中取数据）

6. slot 插槽

   - 场景：父子通信（父向子传递 html 结构。子组件展示）
   - 类型：3 中。默认插槽 | 具名插槽 | 作用域插槽

### event

1. 组件和 html 标签中的 @click 含义不同

   - 前者表示自定义事件 | 后者表示 onclick 事件

2. 想给组件绑定原生的 DOM 事件，需要加上修饰符 .native

   - 原理：利用了事件委派（给组件最外层的 div 绑定了事件）

### v-model

1. v-model 本质上就是语法糖

   - 对于表单元素 input type=text/ textarea 等，使用的是 value + oninput 事件
   - 对于 checkbox/radio 等，使用的 checked + onchange 事件

2. 下列表达式等价

   - <input v-model="searchText">
   - <input v-bind:value="searchText" v-on:input="searchText = $event.target.value" >

### 属性修饰符 .sync

1. 用于父子组件数据同步
2. :money.sync="money"

   - 表示父组件给子组件传递了 props[money]。还绑定了自定义事件 update:money

### $attrs 和 $listeners

1. $attrs 可以获取父组件传递给子组件的 props 属性（捡漏）

   - v-bind="$attrs" 获取父组件传递的全部属性（不用一个一个的获取）

2. $listeners 可以获取父组件传递给子组件的 自定义事件

   - v-on="$listeners" 绑定父组件传递给子组件的全部自定义事件（不用一个一个的绑定）

### $children 和 $parent

1. $children 可以获取当前组件的全部子组件（数组，尽量不要使用下标）
2. $parent 可以获取当前组件的父组件
3. 获取父组件/子组件后，可以操作父/子组件的数据和方法

### minin 混入

1. 将 vue 中相同的 js 代码（逻辑）单独提取为一个文件
2. 哪里使用，在那里引入即可 minins: ['']

### slot 插槽

1. 让父组件可以向子组件指定位置插入 html 结构
2. 3 种 默认插槽 | 具名插槽 | 作用域插槽
3. 使用方式：

   - 子组件中使用 <slot :row="item" name="header"> 占坑 :row="item" 传递数据给父组件
   - 父组件中使用 <template v-slot:header="item"> 传递结构 v-slot:header（可简写为 #header="item"） 获取传递的数据 header 指定插槽名。
