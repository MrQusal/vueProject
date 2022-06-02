// 对接口API进行统一管理

import requests from './request';
import mockRequests from './mockAjax'

// 
/*
  三级联动接口
  查看文档：/api/product/getBaseCategoryList  get请求 无参数
  注意：/api在 baseUrl 处加上了，这里发送时不用书写
  axios 发请求，返回的结果是 promise 对象
*/
// 获取 TypeNav 的三级列表数据
export const reqCatagoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'GET' })
// 获取 ListContainer 组件的轮播图数据
export const reqBannerList = () => mockRequests({ url: "/banner", method: 'GET' })
// 获取 Floor 组件的数据
export const reqFloorList = () => mockRequests.get("/floor")
/*
  获取 Search 组件的数据
  请求需要携带参数（非必选）
*/
export const reqSearchData = (params) => requests({ url: '/list', method: 'POST', data: params })

