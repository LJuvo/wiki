<template>
  <div class="basic-switch">
    <input class="switch-component" type="checkbox" :style="{width:width+'px',height:height+'px'}" />
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 125
    }
  },
  components: {},
  computed: {
    height() {
      return (this.width / 125) * 50;
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  beforeDestroy() {}
};
</script>
<style lang='less' scoped>
.basic-switch {
  // width: 200px;
  // height: 100px;
  // box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
// switch组件
.switch-component {
  position: relative;

  background: url("./dot_default.png") no-repeat;
  background-size: cover;
  border: none;
  outline: none;
  -webkit-appearance: none;
  transition: all 0.2s ease;
}

// 按钮
.switch-component::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: url("./dot_btn.png") no-repeat;
  background-size: cover;
  // border-radius: 50%;
  transition: all 0.2s ease;
}

// checked状态时，背景颜色改变
.switch-component:checked {
  // background-color: #86c0fa;
  background: url("./dot_light.png") no-repeat;
  background-size: cover;
}

// checked状态时，按钮位置改变
.switch-component:checked::after {
  left: 52%;
  top: -0.5%;
}
</style>