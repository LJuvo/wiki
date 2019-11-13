<template>
  <div class="labelNum" :style="{width:width}">
    <div
      class="labelNum-title"
      :style="{
      'font-size':titleSize,
      background:titleBg,
      color:titleColor
    }"
    >{{title}}</div>
    <div class="labelNum-number" :style="{
'font-size':numSize,
      color:numColor
      }">
      {{count}}
      <span
        :style="{
        'font-size':numtxtSize,
      color:numtxtColor
        }"
      >{{unit}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%"
    },
    title: {
      type: String,
      default: "平均数值"
    },
    count: {
      type: String,
      default: "32900"
    },
    unit: {
      type: String,
      default: "元"
    },
    titleSize: {
      type: String,
      default: "0.8rem"
    },
    titleBg: {
      type: String,
      default: "rgb(58, 58, 58)"
    },
    titleColor: {
      type: String,
      default: "#FFFFFF"
    },
    numSize: {
      type: String,
      default: "1rem"
    },
    numColor: {
      type: String,
      default: "#fff"
    },
    numtxtSize: {
      type: String,
      default: "0.6rem"
    },
    numtxtColor: {
      type: String,
      default: "#9A9A9A"
    }
  }
};
</script>
<style lang="less" scoped>
.labelNum {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2);
  &-title {
    width: 100%;
    padding: 0.2rem 0.4rem;
  }
  &-number {
    margin: 0.25rem 0;
    padding-left: 0.4rem;
  }
}
</style>