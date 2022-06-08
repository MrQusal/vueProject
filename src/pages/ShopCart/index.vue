<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="good in cartInfoList" :key="good.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="good.isChecked === 1"
              @change="handlerStateChange(good, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">
              {{ good.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="handlerNumChange('mins', -1, good)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="good.skuNum"
              minnum="1"
              class="itxt"
              @blur="handlerNumChange('change', $event.target.value * 1, good)"
            />
            <a @click="handlerNumChange('plus', 1, good)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.skuPrice * good.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleGood(good.skuId)" class="sindelet" href="#">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="totalChecked"
          @change="checkOrUncheckAllGoods"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#" @click="deleteCheckedAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { throttle } from "lodash";
export default {
  name: "ShopCart",
  mounted() {
    // 获取个人购物车商品
    this.getData();
  },
  computed: {
    ...mapGetters("shopCart", ["cartList"]),
    // 最终展示的数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 所有商品的总价
    totalPrice() {
      return this.cartInfoList.reduce(
        (pre, cur) => pre + cur.skuNum * cur.skuPrice,
        0
      );
    },
    // 计算是否全选
    totalChecked() {
      return (
        this.cartInfoList.length &&
        this.cartInfoList.every((item) => item.isChecked === 1)
      );
    },
  },
  methods: {
    // 获取购物车的所有商品
    getData() {
      this.$store.dispatch("shopCart/getCartList");
    },
    ...mapActions("detail", ["addGoodtoShopCart"]),
    // 修改商品数量（需要节流）
    handlerNumChange: throttle(function (type, diffNum, good) {
      switch (type) {
        case "plus":
          diffNum = 1;
          break;
        case "mins":
          diffNum = good.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 非法：非数字
          if (isNaN(diffNum)) {
            diffNum = 0;
            // 非法：负数
          } else if (diffNum <= 0) {
            diffNum = 0;
          } else {
            // 非法：小数
            diffNum = parseInt(diffNum) - good.skuNum;
          }
          break;
        default:
          diffNum = 0;
          break;
      }
      // addGoodtoShopCart 需要的 skuNum 是变化的量
      this.addGoodtoShopCart({ skuId: good.skuId, skuNum: diffNum }).then(
        () => {
          this.getData();
        },
        (reason) => {
          console.warn(reason);
        }
      );
    }, 1000),

    // 删除购物车的商品
    deleGood(id) {
      this.$store.dispatch("shopCart/deleteGoodInShopCart", id).then(
        (value) => {
          console.log(value);
          this.getData();
          this.$router.replace({ name: "shopCart" });
        },
        (reason) => {
          console.warn(reason);
        }
      );
    },
    // 修改商品的选中状态
    handlerStateChange(good, event) {
      const { skuId } = good;
      const isChecked = event.target.checked ? 1 : 0;
      this.$store
        .dispatch("shopCart/changeGoodState", { skuId, isChecked })
        .then(
          () => {
            // 再次获取数据，跟新页面
            this.getData();
          },
          (reason) => {
            console.warn(reason);
          }
        );
    },
    // 删除选中的所有选中商品
    async deleteCheckedAll() {
      try {
        await this.$store.dispatch("shopCart/deleteAllCheckedGoods");
        this.getData();
      } catch (error) {
        console.warn(error);
      }
    },
    // 勾选/取消勾选所有的商品
    checkOrUncheckAllGoods(event) {
      const isChecked = event.target.checked ? 1 : 0;
      this.$store.dispatch("shopCart/updateAllGoodsState", isChecked).then(
        () => {
          this.getData();
        },
        (reason) => {
          console.warn(reason);
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>