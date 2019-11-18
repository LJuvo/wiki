<template>
  <div class="screen">
    <div class="screen-pane">
      <FlexPane>
        <BasicSwitch slot="pane"></BasicSwitch>
      </FlexPane>
    </div>
    <div class="screen-pane">
      <FlexPane>
        <InputSwitch slot="pane"></InputSwitch>
      </FlexPane>
    </div>
    <div class="screen-pane">
      <FlexPane>
        <DotSwitch slot="pane"></DotSwitch>
      </FlexPane>
    </div>
    <div class="screen-pane">
      <FlexPane>
        <RedSwitch slot="pane"></RedSwitch>
      </FlexPane>
    </div>
    <div class="screen-pane">
      <FlexPane>
        <SimpleSwitch slot="pane"></SimpleSwitch>
      </FlexPane>
    </div>
    <div class="screen-pane" style="visibility: hidden"></div>
    <div class="screen-pane" style="visibility: hidden"></div>
    <div class="screen-pane" style="visibility: hidden"></div>
    <div class="screen-pane" style="visibility: hidden"></div>
  </div>
</template>
<script>
export default {
  components: {
    FlexPane: () => import("./comps/FlexPane"),
    BasicSwitch: () => import("./comps/BasicSwitch"),
    InputSwitch: () => import("./comps/InputSwitch"),
    DotSwitch: () => import("./comps/DotSwitch"),
    RedSwitch: () => import("./comps/RedSwitch"),
    SimpleSwitch: () => import("./comps/SimpleSwitch")
  },
  data() {
    return {};
  },
  mounted() {
    this.initDocFontSize();
  },
  methods: {
    initDocFontSize() {
      let offsetWidth = parseInt(document.documentElement.clientWidth) / 80;
      document.documentElement.style.fontSize = offsetWidth + "px";
    }
  }
};
</script>

<style lang="less" scoped>
.screen {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;

  &-pane {
    margin-top: 20px;
    width: 280px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>