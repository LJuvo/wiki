<template>
  <div class="basic-pane">
    <div class="amr-home">
      <div class="amr-home-top">
        <a>按日</a>
        <a>按月</a>
        <a>按年</a>
        <a>选择</a>
      </div>
      <div class="amr-home-wrapper">
        <div class="amr-home-wrapper-pane">
          <div class="amr-home-wrapper-pane-degree">
            <div style="margin:10px;background:#eee;"></div>
            <div style="margin:10px;background:#eee;"></div>
          </div>
          <div style="margin:10px;background:#eee;"></div>
          <div style="margin:10px;background:#eee;"></div>
        </div>
        <div class="amr-home-wrapper-pane">
          <div class="amr-home-wrapper-pane-degree">
            <div style="margin:10px;background:#eee;"></div>
            <div style="margin:10px;background:#eee;"></div>
          </div>
          <div style="margin:10px;background:#eee;"></div>
          <div style="margin:10px;background:#eee;"></div>
        </div>
      </div>
    </div>
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
  methods: {}
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
}
</style>
<style lang='less' scoped>
.basic-pane {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.amr-home {
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  display: grid;
  grid-template-rows: 50px auto;
  width: 100%;
  height: 100%;
  &-top {
    // height: 50px;
  }
  &-wrapper {
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
    display: grid;
    grid-template-rows: 1fr 1fr;
    &-pane {
      // display: flex;
      // flex-direction: row;
      // justify-content: space-between;
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      &-degree {
        display: grid;
        grid-template-rows: auto 80px;
      }
    }
  }
}
</style>