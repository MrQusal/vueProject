<template>
  <div>
    <Header> </Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 读取路由元信息 -->
    <Footer v-show="$route.meta.showFooter"> </Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    // 通知 vuex 发送请求。获取数据并存储到state中（考虑性能，只执行一次即可）
    this.$store.dispatch("home/getCategoryList");
  },
};
</script>

<style scope>
</style>
