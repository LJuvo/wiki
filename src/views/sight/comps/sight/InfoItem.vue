<template>
  <div class="info-item">
    <BasicBtn
      :color="titleColor"
      :bordercolor="titleBorderColor"
      padding="4px 8px"
      background="none"
      :label="title"
      :sty="{'border-radius':'2px'}"
    ></BasicBtn>
    <div class="info-item-content" :style="{color:labelColor}">{{label}}</div>
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
.info-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &-content {
    flex: 1;
    text-align: left;
    padding: 0 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>