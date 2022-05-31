<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="resetIndex">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <div class="all-sort-list2">
            <div
              @click="goSearch($event)"
              class="item"
              v-for="(cat1, index) in categoryList"
              :key="cat1.categoryId"
              :class="{ cur: curIndex === index }"
            >
              <!-- :class动态添加类名 -->
              <h3 @mouseenter="changeIndex(index)">
                <!-- 给每个 a 标签都添加 data-xxx 自定义属性 -->
                <a
                  href=""
                  :data-category-name="cat1.categoryName"
                  :data-category1Id="cat1.categoryId"
                  >{{ cat1.categoryName }}</a
                >
              </h3>
              <!-- 二三级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: curIndex === index ? 'block' : 'none' }"
              >
                <!-- :style 动态添加样式 -->
                <div
                  class="subitem"
                  v-for="cat2 in cat1.categoryChild"
                  :key="cat2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        href=""
                        :data-category-name="cat2.categoryName"
                        :data-category2Id="cat2.categoryId"
                        >{{ cat2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="cat3 in cat2.categoryChild"
                        :key="cat3.categoryId"
                      >
                        <a
                          href=""
                          :data-category-name="cat3.categoryName"
                          :data-category3Id="cat3.categoryId"
                          >{{ cat3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      curIndex: -1,
    };
  },
  methods: {
    // 使用 lodash 提供的节流
    changeIndex: throttle(function (index) {
      // 鼠标移入，改变index
      this.curIndex = index;
    }, 50),
    // 鼠标移除，重置index
    resetIndex() {
      this.curIndex = -1;
    },
    // 点击 a 标签，跳转到 search 组件
    goSearch(event) {
      let elem = event.target;
      if (elem.nodeName === "A") {
        console.log(elem.dataset);
        const { categoryName, category1id, category2id, category3id } =
          elem.dataset;
        if (categoryName) {
          let location = { name: "search" };
          let query = { categoryName };
          // 点击的一级分类
          if (category1id) {
            query.category1id = category1id;
          }
          // 点击的二级分类
          else if (category2id) {
            query.category2id = category2id;
          }
          // 点击的三级分类
          else if (category3id) {
            query.category3id = category3id;
          }
          // 合并路由参数
          location.query = query;
          // 进行跳转
          this.$router.push(location);
        }
      }
      event.preventDefault();
    },

    ...mapActions("home", ["getCategoryList"]),
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  mounted() {
    // 通知 vuex 发送请求。获取数据并存储到state中
    this.getCategoryList();
  },
};
</script>

<style lang="less" scope>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>