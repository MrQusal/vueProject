<template>
  <div>
    我是Search组件
    <h1>query参数：{{ $route.query }}----{{ keyword }}</h1>
    <h1>params参数：{{ $route.params }}-----{{ k }}</h1>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["keyword", "k"],
};
</script>

<style>
</style>