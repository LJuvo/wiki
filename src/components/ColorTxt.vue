<template>
  <div class="color-txt-pane">
    <div class="color-txt-pane-title">字体颜色</div>
    <div class="color-txt-pane-tip"></div>
    <div class="color-txt-pane-content">
      <color-txt-item v-for="(item,key) in colorTxtArr" :key="key" :color="item.color"></color-txt-item>
    </div>
  </div>
</template>

<script>
import ColorTxtItem from "./ColorTxtItem";
export default {
  components: { ColorTxtItem },
  data() {
    return {
      colorTxtArr: [
        { color: "#333333" },
        { color: "#666666" },
        { color: "#999999" },
        { color: "#BFBFBF" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.color-txt-pane {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &-title {
    font-size: 18px;
    font-weight: 600;
  }
  &-tip {
    margin-top: 10px;
    width: 20px;
    height: 4px;
    background: #cc3d3d;
  }
  &-content {
    margin: 30px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>

