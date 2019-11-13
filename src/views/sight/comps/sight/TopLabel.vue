<template>
  <div class="toplabel">
    <FlexBox direction="column" justify="flex-start">
      <FlexBox justify="flex-start" width="100%" textAlign="left">
        <GoldBtn label="No.1" width="50px" :checked="checked" padding="4px 6px"></GoldBtn>
        <div style="flex:1;padding-left:10px;">
          <span>名称</span>
        </div>
      </FlexBox>
      <div class="progress">
        <div :style="{width:barWidth,height:barHeight,background:barColor}"></div>
        <div
          class="progress-point"
          :style="{
          width:pointWidth,
          height:pointWidth,
          left: 'calc('+barWidth+' - 2px)',
          top: pointTop,
          background:pointColor
        }"
        ></div>
        <div
          class="progress-label"
          :style="parseFloat(barWidth)>50?{
          right: 'calc(100% - '+barWidth+')',
          'text-align': 'right',
          color:labelColor
        }:{
          left: barWidth,
          'text-align': 'left',
          color:labelColor
        }"
        >182,511,228.00元</div>
      </div>
    </FlexBox>
  </div>
</template>
<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: true
    },
    barWidth: {
      type: String,
      default: "80%"
    },
    barHeight: {
      type: String,
      default: "2px"
    },
    barColor: {
      type: String,
      default: "linear-gradient(to right, red , yellow)"
      // default: "#9A9A9A"
    },
    pointWidth: {
      type: String,
      default: "8px"
    },
    pointTop: {
      type: String,
      default: "-3px"
    },
    pointColor: {
      type: String,
      default: "#FFBE34"
    },
    labelColor: {
      type: String,
      default: "#eee"
    }
  },
  components: {
    FlexBox: () => import("./FlexBox"),
    GoldBtn: () => import("./GoldBtn")
  },
  mounted() {
    console.log(parseFloat(this.barWidth));
  }
};
</script>
<style lang="less" scoped>
.toplabel {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.progress {
  width: 100%;
  margin-top: 20px;
  position: relative;
  &-label {
    position: absolute;
    border-radius: 50%;
    top: -20px;

    font-size: 10px;
    opacity: 0.5;
  }
  &-point {
    position: absolute;
    border-radius: 50%;
  }
  &-point:before {
    content: "";
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    left: -15px;
    top: -15px;
    border: 1px solid rgba(255, 190, 52, 0.5);
    border-radius: 50%;
    animation: breath 2s infinite;
  }
}
@keyframes breath {
  0% {
    opacity: 0%;
  }
  50% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
  }
}
</style>