<template>
  <canvas class="home-pane" id="floorSvg"></canvas>
</template>

<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      containerW: 0,
      containerH: 0
    };
  },
  computed: {},
  mounted() {
    let svgId = "floorSvg";
    var c = document.getElementById(svgId);
    var ctx = c.getContext("2d");

    let img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0, 50, 50);
    };
    img.src = "/chart/basic/leidatu.svg";
  }
};
</script>

<style lang="less" scoped>
.home-pane {
  width: 100%;
  height: 100%;
  position: relative;
}
.movebox {
  position: absolute;
}
#pane {
  position: absolute;
}
</style>