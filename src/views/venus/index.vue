<template>
  <div>
    <div class="venus">
      <div class="venus-header"></div>
      <div class="venus-content">
        <div class="venus-content-left">
          <menu-chart @on-checked="onCheckedType"></menu-chart>
        </div>
        <div class="venus-content-wrapper">
          <content-chart :crtdata="chartObj"></content-chart>
        </div>
        <div class="venus-content-right">
          <controls-chart :crtdata="chartObj"></controls-chart>
        </div>
      </div>
      <div class="venus-footer">
        <span class="venus-footer-version">VENUS @verson 0.0.1</span>
        <span class="venus-footer-copyright">
          <!-- Copyright © 2019 - 2119 JuvoS. All Rights Reserved.JuvoS / License MIT -->
          Copyright © 2019 JuvoS All Rights Reserved.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import MenuChart from "./comps/menu/chart";
import ContentChart from "./comps/content/chart";
import ControlsChart from "./comps/controls/chart";
export default {
  components: { MenuChart, ContentChart, ControlsChart },
  data() {
    return {
      chartObj: {}
    };
  },
  mounted() {
    this.Init();
  },
  methods: {
    Init() {},
    onCheckedType(obj) {
      this.chartObj = obj;
    }
  }
};
</script>

<style lang="less">
.venus {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: rgb(234, 234, 234);
  background: rgb(40, 40, 40);
  &-header {
    width: 100%;
    height: 50px;
    background: rgb(30, 30, 30);
  }
  &-content {
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-left {
      width: 240px;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      background: rgb(38, 38, 38);
    }
    &-wrapper {
      flex: 1;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      background: rgb(30, 30, 30);
    }
    &-right {
      width: 300px;
      // background: rgb(83, 83, 83);
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
    }
  }
  &-footer {
    width: 100%;
    height: 30px;
    // border-top: 1px solid rgb(30, 30, 30);
    background: rgb(74, 74, 74);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;
    &-version {
      line-height: 30px;
      padding-left: 20px;
    }
    &-copyright {
      line-height: 30px;
      padding-right: 20px;
    }
  }
}
</style>

<style lang="less">
// controls
.controls {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-settings {
    width: 100%;
    height: 50%;
  }
  &-output {
    flex: 1;
    border-top: 1px solid rgb(30, 30, 30);
  }
}
</style>


