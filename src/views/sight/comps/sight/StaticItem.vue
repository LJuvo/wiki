<template>
  <div class="static-item">
    <div class="static-item-block" :style="{background:blockColor}"></div>
    <div class="static-item-title" :style="{color:titleColor}">{{title}}</div>
    <div class="static-item-label" :style="{color:labelColor}">{{label}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    label: {
      type: String,
      default: "信息"
    },
    titleColor: {
      type: String,
      default: "#dddee1"
    },
    titleBorderColor: {
      type: String,
      default: "#ffbe34"
    },
    labelColor: {
      type: String,
      default: "#fff"
    },
    blockColor: {
      type: String,
      default: "#ffbe34"
    }
  },
  components: {
    BasicBtn: () => import("./BasicBtn")
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.static-item {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  &-block {
    width: 10px;
    height: 10px;
    margin: 0 auto;
  }
  &-title {
    text-align: left;
    padding: 0 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-label {
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>