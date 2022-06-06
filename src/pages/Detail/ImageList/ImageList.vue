<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        v-for="(item, index) in skuImageList"
        class="swiper-slide"
        :key="item.id"
      >
        <img
          :src="item.imgUrl"
          :class="{ active: index === chosenImgIndex }"
          @click="changeImgIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      chosenImgIndex: 0,
    };
  },
  methods: {
    changeImgIndex(index) {
      this.chosenImgIndex = index;
      // 通知 Zoom 组件，改变展示的鼠标
      this.$bus.$emit("changeImg", index);
    },
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs["cur"], {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 一次展示多少图片（默认为1）
          slidesPerView: 3,
          // 一次滚动多少张图片（默认为1）
          slidesPerGroup: 3,
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>