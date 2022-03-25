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
    <Floor />
    <Floor />
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
};
</script>

<style>
</style>