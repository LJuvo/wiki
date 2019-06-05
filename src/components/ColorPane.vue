<template>
  <div class="color-tpane">
    <div class="color-tpane-title">{{colorInfo.label}}</div>
    <div class="color-tpane-tip"></div>
    <div class="color-tpane-content">
      <div class="color-tpane-content-show" :style="{background:colorInfo.color}"></div>
      <div class="color-tpane-content-info">
        <span class="color-tpane-content-info-color">{{colorInfo.color}}</span>
        <div class="color-tpane-content-info-hsb">
          <span>H {{colorInfo.colorH}}</span>
          <span>S {{colorInfo.colorS}}</span>
          <span>B {{colorInfo.colorB}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    colorInfo: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="less" scoped>
.color-tpane {
  width: 220px;
  display: flex;
  flex-direction: column;
  &-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }
  &-tip {
    display: inline-block;
    width: 20px;
    height: 4px;
    background: #cc3d3d;
  }
  &-content {
    margin-top: 20px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 2px 2px 5px #d8d8d8;
    &-show {
      height: 120px;
      width: 100%;
    }
    &-info {
      width: 100%;
      padding: 10px 15px;
      &-color {
        color: #333;
        font-size: 14px;
      }
      &-hsb {
        span {
          color: #ccc;
          font-size: 10px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

