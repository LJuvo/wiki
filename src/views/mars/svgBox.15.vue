<template>
  <div id="svgContainer15" style="width:100%;height:800px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    const containerWidth = document.getElementById("svgContainer15")
      .offsetWidth;
    const containerHeight = document.getElementById("svgContainer15")
      .offsetHeight;
    var svg = d3
      .select("#svgContainer15")
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
        .attr("width", w / 2)
        .attr("height", h / 2)
        .attr("x", 20)
        .attr("y", 20)
        .attr("fill", "#ff00fe");

      let arr = [
        { x: 10, y: 10 },
        { x: w / 2 + 40, y: 10 },
        { x: w / 2 + 40, y: h / 2 + 40 },
        { x: 10, y: h / 2 + 40 }
      ];
      mBox
        .append("polygon")
        .attr("points", this.pointsArrFac(arr))
        .attr("stroke", "#0000ff")
        .attr("stroke-width", "1")
        .attr("fill", "none");

      let lineArr = [];

      for (let i = 0; i < 6; i++) {
        lineArr.push([(w / 6) * i, 0]);
        lineArr.push([(w / 6) * i, h / 2]);
      }

      let lineGenerator = d3
        .line()
        .x(function(d) {
          return d[0];
        })
        .y(function(d) {
          return d[1];
        });

      mBox
        .append("path")
        .attr("stroke", "#ff0000")
        .attr("stroke-width", "1")
        .attr("fill", "none")
        .attr("d", lineGenerator(lineArr));
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