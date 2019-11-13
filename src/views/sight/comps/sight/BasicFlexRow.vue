<template>
  <div class="flexbox" :style="flexSty">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    flexSty: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="less" scoped>
.flexbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
</style>