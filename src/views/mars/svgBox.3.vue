<template>
  <div id="svgContainer3" style="width:400px;height:600px"></div>
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

    var scaleLinear = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, 250]);

    var svg = d3
      .select("#svgContainer3")
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
        return scaleLinear(d);
      })
      .attr("height", rectHeight - 5)
      .attr("fill", "blue");

    //为坐标轴定义一个线性比例尺
    var xScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, 250]);
    //定义一个坐标轴
    var xAxis = d3
      .axisBottom(xScale) //定义一个axis，由bottom可知，是朝下的
      .ticks(7); //设置刻度数目
    g.append("g")
      .attr(
        "transform",
        "translate(" + 20 + "," + dataset.length * rectHeight + ")"
      )
      .call(xAxis);
  },
  methods: {}
};
</script>
<style lang="less">
</style>