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
// 获取验证码接口
export const reqGetVerificationCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })
// 完成注册的接口
export const reqUserRegister = (data) => requests.post("/user/passport/register", data)
// 处理登录的接口
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', method: "POST", data })
// 获取用户信息（需要带上 token，放在 header 中）
export const reqGetUserInfo = () => requests.get("/user/passport/auth/getUserInfo")
// 通知服务器退出登录
export const reqLogOut = () => requests({ url: '/user/passport/logout', method: 'GET' })
// 获取用户地址信息
export const reqGetUerAddress = () => requests.get("/user/userAddress/auth/findUserAddressList")
// 获取用户的商品清单（trade组件）
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'GET' })
// 提交订单的接口（以后的接口，数据返回后直接在组件处展示，不使用Vuex）
export const reqCommitOrder = (tradeNo, data) => requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
// 获取支付信息（pay组件）
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })
// 获取支付的状态
export const reqPayStatus = (orderId) => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 获取个人中心的数据（Center 组件）
export const reqMyOrders = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' })
