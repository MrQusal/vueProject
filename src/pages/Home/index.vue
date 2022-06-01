<template>
  <div>
    <!-- 全局组件 TypeNav 使用-->
    <TypeNav></TypeNav>
    <!-- ListContainer 轮播图组件 -->
    <ListContainer />
    <!-- 今日推荐组件 -->
    <Recommend />
    <!-- 热门排行组件 -->
    <Rank />
    <!-- 猜你喜欢组件 -->
    <Like />
    <!-- Floor 组件 -->
    <Floor v-for="item in floorDataList" :key="item.id" :floorData="item" />
    <!-- 商标组件 -->
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapActions, mapState } from "vuex";
export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // home 组件挂咋时，发送获取 floorlist 请求，然后传递给不同的 Floor 组件即可
    this.getFloorDataList();
  },
  methods: {
    ...mapActions("home", ["getFloorDataList"]),
  },
  computed: {
    // 获取 floorlist 数据
    ...mapState("home", ["floorDataList"]),
  },
};
</script>

<style>
</style>