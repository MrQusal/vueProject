import { reqCartList, deleteGoodInCart, reqChangeGoodState } from '@/api/index'

export default {
  namespaced: true,
  state: {
    // 购物车数据（并不是最终展示的数据）
    cartList: []
  },
  actions: {
    // 获取购物车的所有商品
    async getCartList(context) {
      const res = await reqCartList()
      if (res.code === 200) {
        context.commit("GET_CARTLIST", res.data);
      }
    },
    // 删除购物车中的商品
    async deleteGoodInShopCart(_, skuId) {
      const res = await deleteGoodInCart(skuId);
      if (res.code === 200) {
        return res;
      } else {
        throw 'Fail';
      }
    },
    // 修改商品的选中状态
    async changeGoodState(_, { skuId, isChecked }) {
      const res = await reqChangeGoodState(skuId, isChecked);
      if (res.code === 200) {
        return res;
      } else {
        throw 'Fail';
      }
    },
    // 删除选中的所有商品
    async deleteAllCheckedGoods({ getters, dispatch }) {
      const cartInfoList = getters.cartList.cartInfoList
      let all = [];
      cartInfoList.filter(item => item.isChecked === 1).forEach(item => {
        all.push(dispatch('deleteGoodInShopCart', item.skuId));
      })
      return Promise.all(all);
    },
    // 勾选/取消勾选所有的商品（修改状态）
    updateAllGoodsState({ getters, dispatch }, isChecked) {
      const cartInfoList = getters.cartList.cartInfoList
      let all = []
      cartInfoList.forEach(item => {
        all.push(dispatch("changeGoodState", { skuId: item.skuId, isChecked }))
      })
      return Promise.all(all);
    }
  },
  mutations: {
    GET_CARTLIST(state, value) {
      state.cartList = value;
    }
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || {};
    }
  }
}