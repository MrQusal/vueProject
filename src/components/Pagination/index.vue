<template>
  <div class="pagination">
    <button :disabled="pageInfo.pageNo === 1">上一页</button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('changePageNo', 1)"
      :class="{ active: pageInfo.pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button
      v-for="(num, index) in startNumAndEndNum.numArr"
      :key="index"
      @click="$emit('changePageNo', num)"
      :class="{ active: pageInfo.pageNo === num }"
    >
      {{ num }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('changePageNo', totalPage)"
      :class="{ active: pageInfo.pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="totalPage === pageInfo.pageNo">下一页</button>

    <button style="margin-left: 30px">共 {{ pageInfo.total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageInfo"],
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.pageInfo.total / this.pageInfo.pageSize);
    },
    // 连续的页码：起始与结束数字
    startNumAndEndNum() {
      const { pageNo, continues } = this.pageInfo;
      let start, end;
      // 不足 5 页
      if (continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        let cnt = Math.floor(continues / 2);
        start = pageNo - cnt;
        end = pageNo + cnt;
        // 当前页 - cnt < 1，纠正
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 当前页 + cnt > 总页码，纠正
        if (end > this.totalPage) {
          start = this.totalPage - continues + 1;
          end = this.totalPage;
        }
      }
      let numArr = [];
      for (let i = start; i <= end; i++) {
        numArr.push(i);
      }
      return { start, end, numArr };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>