<template>
  <div
    class="goldbtn"
    :style="{
    padding:padding,
    width:width,
    height:height,
    'line-height':height,
    color:checked?checkedColor:color,
    border:checked?'1px solid '+(checked?checkedColor:color):'none',
    background:background,
    ...sty
  }"
  >{{label}}</div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "总览"
    },
    padding: {
      type: String,
      default: "8px 10px"
    },
    width: { type: String, default: "auto" },
    height: {
      type: String,
      default: "auto"
    },
    checked: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#9A9A9A"
    },
    checkedColor: {
      type: String,
      default: "#FFBE34"
    },
    background: {
      type: String,
      default: "rgb(58, 58, 58)"
    },
    sty: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="less" scoped>
.goldbtn {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  cursor: hand;
}
</style>