<template>
  <div class="spec-preview" ref="container">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- 放大图 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      showedImgIndex: 0,
    };
  },
  mounted() {
    // 改变索引，展示的图片跟着换
    this.$bus.$on("changeImg", (index) => {
      this.showedImgIndex = index;
    });
  },
  computed: {
    // 特殊情况处理：skuImageList 为空数组
    imgObj() {
      return this.skuImageList[this.showedImgIndex] || {};
    },
  },
  methods: {
    handler(event) {
      let mask = this.$refs["mask"];
      let container = this.$refs["container"];
      let big = this.$refs["big"];
      const { left, top } = container.getBoundingClientRect();
      let newLeft = event.clientX - left - mask.offsetWidth / 2;
      let newTop = event.clientY - top - mask.offsetHeight / 2;
      // 约束范围
      if (newLeft < 0) newLeft = 0;
      if (newLeft > mask.offsetWidth) newLeft = mask.offsetWidth;
      if (newTop < 0) newTop = 0;
      if (newTop > mask.offsetHeight) newTop = mask.offsetHeight;
      // 修改 mask的 left 和 top
      mask.style.left = newLeft + "px";
      mask.style.top = newTop + "px";
      // 修改放大图的 left 和 top
      big.style.left = newLeft * -2 + "px";
      big.style.top = newTop * -2 + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>