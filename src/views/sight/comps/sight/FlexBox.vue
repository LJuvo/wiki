<template>
  <div
    class="flexbox"
    :style="{
    'flex-direction':direction,
    'justify-content':justify,
    'align-items':align,
    'text-align':textAlign,
    'width':width,
   margin:margin
  }"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    direction: {
      type: String,
      default: "row"
    },
    justify: {
      type: String,
      default: "space-between"
    },
    align: {
      type: String,
      default: "center"
    },
    textAlign: {
      type: String,
      default: "center"
    },
    width: {
      type: String,
      default: "auto"
    },
    margin: {
      type: String,
      default: "0 0 10px 0"
    }
  }
};
</script>
<style lang="less" scoped>
.flexbox {
  display: flex;
  overflow: hidden;
}
</style>