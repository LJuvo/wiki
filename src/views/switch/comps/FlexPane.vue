<template>
  <div class="basic-pane">
    <slot name="pane"></slot>
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
.basic-pane {
  width: 100%;
  height: 100%;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>