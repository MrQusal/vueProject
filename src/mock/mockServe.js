// 引入 mock
import Mock from 'mockjs'
// 把 json 数据格式引入（webpack默认对外暴露：图片，json 数据格式）
import banner from './banner.json'
import floor from './floor.json'

/*
  接收两个参数，第一个为请求的 url 第二个为响应
*/
// 此处模拟ListContainer轮播图的数据
Mock.mock("/mock/banner", {
  code: 200,
  data: banner
})

// 此处模拟 Floor 组件数据
Mock.mock("/mock/floor", {
  code: 200,
  data: floor
})