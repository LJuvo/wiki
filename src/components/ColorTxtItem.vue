<template>
  <div class="color-txt-item-pane">
    <div class="color-txt-item-pane-show" :style="{background:color}"></div>
    <div class="color-txt-item-pane-label">{{color}}</div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#333333"
    }
  }
};
</script>

<style lang="less" scoped>
.color-txt-item-pane {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &-show {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #d8d8d8;
  }
  &-label {
    margin: 10px 0;
    font-size: 14px;
    color: #aaaaaa;
  }
}
</style>

