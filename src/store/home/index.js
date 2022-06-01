import { reqCatagoryList, reqBannerList, reqFloorList } from '@/api';

export default {
  namespaced: true,
  state: {
    // 分类列表数据
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    // Floor 组件的数据
    floorDataList: []
  },
  mutations: {
    GETCATEGORYLIST(state, value) {
      state.categoryList = value;
    },
    GET_BANNERLIST(state, value) {
      state.bannerList = value;
    },
    GET_FLOOR_DATA_LIST(state, value) {
      state.floorDataList = value;
    }
  },
  actions: {
    // 通过 API 里面的接口调用，发送请求
    async getCategoryList(context) {
      const res = await reqCatagoryList();
      if (res.code === 200) {
        context.commit("GETCATEGORYLIST", res.data);
      }
    },
    async getBannerList(context) {
      const res = await reqBannerList();
      if (res.code === 200) {
        context.commit("GET_BANNERLIST", res.data);
      }
    },
    async getFloorDataList(context) {
      const res = await reqFloorList();
      if (res.code === 200) {
        context.commit("GET_FLOOR_DATA_LIST", res.data);
      }
    }
  },
  getters: {}
}