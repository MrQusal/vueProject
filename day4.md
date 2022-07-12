1. 商品分类列表加上过渡动画
  - 只有用v-if|v-show 的元素或组件才能使用过渡动画
  - 要在外层包裹 transition

2. 对三级列表进行优化
  本项目中三级列表为全局组件，并且保存在 store 中。所以只需要请求一次（放在App组件即可）

3. 合并 param 与 query 参数
  路由跳转前，查看是否已经携带了 query/params，有则合并

4. 开发 Home 首页中的 ListContainer 和 Floor 组件
  - 服务器没有上述组件数据，使用 mockjs 造数据
  1. npm i mockjs -D
  2. 在 src 下创建 mock 目录，其中配主不同的 .json 文件
  3. 把mock数据所需要的图片都放置在 public 文件夹中【public在打包时会原封不动的打包到dist目录下】
  4. 使用 mock 模拟数据（创建 mockServe.js ）
  5. 在入口文件引入，使其执行一次

5. 使用 swiper 实现轮播图
  1. npm i swiper、import 'swiper/css/swiper.css'
  2. 页面结构必须要有
  3. 初始化 swiper 实例
  4. watch + $nextTick 实现：初始化 swiper 实例时，页面结构以存在（v-for 已经遍历完）

6. 开发 floor 组件
  1. 组件通信的方式
    - props（父->子）
    - 自定义事件 $on $emit（子->父）
    - 全局事件总线 $bus （全）
    - pubsub-js（全）
    - 插槽 slot
    - vuex