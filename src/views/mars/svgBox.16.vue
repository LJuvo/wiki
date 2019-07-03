<template>
  <div id="svgContainer16" style="width:100%;height:800px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    const containerWidth = document.getElementById("svgContainer16")
      .offsetWidth;
    const containerHeight = document.getElementById("svgContainer16")
      .offsetHeight;
    var svg = d3
      .select("#svgContainer16")
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight);

    var width = svg.attr("width"); //得到画布的宽
    var height = svg.attr("height"); //得到画布的长

    this.basicBox(svg, width, height, 0, 0);
  },
  methods: {
    basicBox(box, w, h, startX, startY) {
      let mBox = box.append("g");

      mBox
        .append("rect")
        .attr("width", 5)
        .attr("height", (h / 6) * 5)
        .attr("x", 100)
        .attr("y", 20)
        .attr("fill", "#ff00fe");

      mBox
        .append("rect")
        .attr("width", 5)
        .attr("height", (h / 6) * 5)
        .attr("x", 200)
        .attr("y", 20)
        .attr("fill", "#ff00fe");

      let arr = [];
      let mH = (h - 40) / 30;
      for (let i = 0; i < 30; i++) {
        mBox
          .append("rect")
          .attr("width", 200)
          .attr("height", 2)
          .attr("x", 70)
          .attr("y", 20 + mH * i)
          .attr("fill", "#ff00fe");
      }

      mBox
        .append("rect")
        .attr("width", 30)
        .attr("height", mH * 2)
        .attr("x", 102)
        .attr("y", 60)
        .attr("fill", "#ff0000")
        .attr("stroke", "#0000ff")
        .attr("stroke-width", "1");
      mBox
        .append("rect")
        .attr("width", 40)
        .attr("height", mH * 2)
        .attr("x", 132)
        .attr("y", 60)
        .attr("fill", "#ff0000")
        .attr("stroke", "#0000ff")
        .attr("stroke-width", "1");
      mBox
        .append("rect")
        .attr("width", 30)
        .attr("height", mH * 2)
        .attr("x", 172)
        .attr("y", 60)
        .attr("fill", "#ff0000")
        .attr("stroke", "#0000ff")
        .attr("stroke-width", "1");
    },
    pointsArrFac(arr) {
      let txt = "";
      arr.forEach(ele => {
        let { x, y } = ele;
        txt += x + "," + y + " ";
      });
      return txt;
    }
  }
};
</script>
<style lang="less">
</style>