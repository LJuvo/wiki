<template>
  <div id="svgContainer2" style="width:400px;height:600px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    var marge = { top: 60, bottom: 60, left: 60, right: 60 };
    var dataset = [2.5, 2.1, 1.7, 1.3, 0.9];

    //定义一个线性比例尺
    var scaleLinear = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, 300]);

    var svg = d3
      .select("#svgContainer2")
      .append("svg")
      .attr("width", "400px")
      .attr("height", "600px");
    var g = svg
      .append("g")
      .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

    var rectHeight = 30;

    g.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", 20)
      .attr("y", function(d, i) {
        return i * rectHeight;
      })
      .attr("width", function(d) {
        return scaleLinear(d); //设置宽,并在这里使用比例尺
      })
      .attr("height", rectHeight - 5)
      .attr("fill", "blue");
  },
  methods: {}
};
</script>
<style lang="less">
</style>