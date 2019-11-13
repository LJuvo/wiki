<template>
  <div
    class="basicbtn"
    :style="{
    padding:padding,
    width:width,
    height:height,
    'line-height':height,
    color:checked?checkedColor:color,
    border:bordercolor?'1px solid '+bordercolor:(checked?'1px solid '+(checked?checkedColor:color):'none'),
    cursor: handled?'pointer':'auto',
    background:background,
    ...sty
  }"
    :title="title"
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
    handled: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#9A9A9A"
    },
    checkedColor: {
      type: String,
      default: "#FFBE34"
    },
    bordercolor: {
      type: String,
      default: ""
    },
    background: {
      type: String,
      default: "rgb(58, 58, 58)"
    },
    sty: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="less" scoped>
.basicbtn {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>