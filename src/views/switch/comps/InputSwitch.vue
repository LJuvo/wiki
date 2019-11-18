<template>
  <div class="basic-switch">
    <input class="switch-component" type="checkbox" />
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
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
  width: 60px;
  height: 30px;
  background-color: #dadada;
  border-radius: 30px;
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
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.2s ease;
}

// checked状态时，背景颜色改变
.switch-component:checked {
  background-color: #86c0fa;
}

// checked状态时，按钮位置改变
.switch-component:checked::after {
  left: 50%;
}
</style>