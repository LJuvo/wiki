<template>
  <div class="blackhole" :style="{
    width:width
    }">
    <img src="./blackhole02.png" class="hole" />
    <div class="hole-pane">
      <div class="hole-pane-num">90</div>
      <div>非常优秀的评分/满分100</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%"
    }
  }
};
</script>
<style lang="less" scoped>
.blackhole {
  // width: 100%;
  // height: 100%;
  position: relative;
}
.hole {
  width: 100%;
  height: 100%;
  animation: 15s linear 0s infinite normal none running rotates;
  padding: 0px;
  &-pane {
    color: #ffffff;
    font-size: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    &-num {
      font-size: 3.5rem;
    }
  }
}
@keyframes rotates {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>