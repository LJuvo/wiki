<template>
  <div class="color-pane">
    <title-pane></title-pane>
    <p class="color-pane-info">在设计中的色彩由主色、辅助色、点缀色构成，在页面中的占比为85%、10%、5%.</p>
    <div class="color-pane-content">
      <color-pane v-for="(item,key) in colorArr" :key="key" :colorInfo="item"></color-pane>
    </div>
    <color-txt></color-txt>
  </div>
</template>

<script>
import TitlePane from "../../components/TitlePane";
import ColorPane from "../../components/ColorPane";
import ColorTxt from "../../components/ColorTxt";
export default {
  components: { TitlePane, ColorPane, ColorTxt },
  data() {
    return {
      colorArr: [
        {
          label: "主体色",
          color: "#CC3D3D",
          colorH: "360",
          colorS: "70",
          colorB: "80"
        },
        {
          label: "辅助色",
          color: "#FF884C",
          colorH: "20",
          colorS: "80",
          colorB: "100"
        },
        {
          label: "点缀色",
          color: "#008EE6",
          colorH: "203",
          colorS: "100",
          colorB: "90"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.color-pane {
  width: 100%;
  margin: 0 auto;
  &-info {
    padding: 20px 0;
    font-size: 14px;
  }
  &-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 80px;
  }
}
</style>

