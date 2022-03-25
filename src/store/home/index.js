import { reqCatagoryList } from '@/api';

export default {
  namespaced: true,
  state: {
    categoryList: [],
  },
  mutations: {
    GETCATEGORYLIST(state, value) {
      state.categoryList = value;
    }
  },
  actions: {
    // 通过 API 里面的接口调用，发送请求
    async getCategoryList(context) {
      const res = await reqCatagoryList();
      if (res.code === 200) {
        context.commit("GETCATEGORYLIST", res.data);
      }
    }
  },
  getters: {}
}