<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类名称的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键词的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">x</i>
            </li>
            <!-- 属性 props 的面包屑 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[2] }}<i @click="removeProp(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @getTradeInof="getTradeInof"
          @getPropsInfo="getPropsInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <!-- 价格、销量。。。 -->
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isActiveOne }" @click="changeOrder('1')">
                  <a href="#"
                    >综合 <span v-show="isActiveOne" :class="isUpOrDown"></span
                  ></a>
                </li>
                <li :class="{ active: isActiveTwo }" @click="changeOrder('2')">
                  <a href="#"
                    >价格 <span v-show="isActiveTwo" :class="isUpOrDown"></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <!-- 商品列表 -->
            <ul class="yui3-g">
              <!-- 每个商品 -->
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页组件 -->
          <Pagination
            :pageInfo="{
              pageNo: searchParams.pageNo,
              pageSize: searchParams.pageSize,
              continues: 5,
              total: total,
            }"
            @changePageNo="changePageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        // 分类id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 分类名称
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页
        pageNo: 1,
        pageSize: 3,
        // 选择的参数（尺寸、价格。。。）
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },

  beforeMount() {
    // 合并参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getSearchData(this.searchParams);
  },
  methods: {
    ...mapActions("search", ["getSearchData"]),
    // 删除 分类名称
    removeCategoryName() {
      // 重置参数，重新发送请求（参数为undefined）
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getSearchData(this.searchParams);
      // 修改路径（自己跳自己）:删除了 query 参数，params 参数不应该修改
      this.$router.push({
        name: "search",
        params: this.$route.params,
      });
    },
    // 删除搜索关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getSearchData(this.searchParams);
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });
      // 通知 Header 组件删除 keyword
      this.$bus.$emit("removeHeaderKeyword");
    },
    // 删除品牌关键字
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getSearchData(this.searchParams);
    },
    // 删除属性关键字
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.getSearchData(this.searchParams);
    },
    // 自定义事件 getTradeInof 的回调
    getTradeInof(tarde) {
      // 格式化参数 形式  "ID:名称"
      this.searchParams.trademark = `${tarde.tmId}:${tarde.tmName}`;
      this.getSearchData(this.searchParams);
    },
    // 自定义事件 getPropsInfo 的回调
    getPropsInfo(attr, attrValue) {
      // 格式化参数 形式  ["ID:name:value"]
      let params = `${attr.attrId}:${attr.attrName}:${attrValue}`;
      // 要先判断数组是否已存在
      if (this.searchParams.props.includes(params)) return;
      this.searchParams.props.push(params);
      console.log(this.searchParams);
      this.getSearchData(this.searchParams);
    },
    // 排序操作
    changeOrder(flag) {
      // flag 标识点击的是 综合还是价格
      let [preFlag, preOrder] = this.searchParams.order.split(":");
      if (preFlag !== flag) {
        preOrder = "desc";
      } else {
        preOrder = preOrder === "desc" ? "asc" : "desc";
      }
      this.searchParams.order = `${flag}:${preOrder}`;
      this.getSearchData(this.searchParams);
    },
    // 点击不同页码的回回调
    changePageNo(newPageNo) {
      this.searchParams.pageNo = newPageNo;
      this.getSearchData(this.searchParams);
    },
  },
  computed: {
    ...mapGetters("search", ["goodsList", "total"]),
    // 价格还是综合高亮
    isActiveOne() {
      return this.searchParams.order.includes("1");
    },
    isActiveTwo() {
      return this.searchParams.order.includes("2");
    },
    //
    isUpOrDown() {
      return this.searchParams.order.includes("desc")
        ? "iconfont icon-down"
        : "iconfont icon-up";
    },
  },

  watch: {
    // 监听路由的变化，参数变化时，再次发起请求
    $route(newV, _) {
      Object.assign(this.searchParams, newV.query, newV.params);
      this.getSearchData(this.searchParams);
      // 请求完毕后，清理id（可能第一次点3级id，后续点了2级id，需求清空上次的3级id）
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>