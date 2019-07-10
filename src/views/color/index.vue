<template>
  <div class="color-wrapper">
    <div class="color-wrapper-left">
      <color-information></color-information>
    </div>
    <div class="color-wrapper-right"></div>
  </div>
</template>

<script>
import ColorInformation from "./ColorInformation";
// import HiGeroo from "higeroo";
export default {
  components: { ColorInformation },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.color-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  &-left {
    width: 800px;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
  &-right {
    flex: 1;
  }
}
</style>

