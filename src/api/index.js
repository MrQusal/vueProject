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
// 获取 Detail 组件的所需的数据
export const reqGoodInfo = (skuId) => requests.get(`/item/${skuId}`)
// 将产品加入购物车（获取更新，某个产品的格式）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })
// 获取购物车所有的商品数据
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'GET' })
// 删除购物车中的商品
export const deleteGoodInCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
// 修改商品选中状态
export const reqChangeGoodState = (skuId, isChecked) => requests.get(`/cart/checkCart/${skuId}/${isChecked}`);