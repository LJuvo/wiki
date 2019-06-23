<template>
  <div id="svgContainer4" style="width:100%;height:600px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    var marge = { top: 60, bottom: 60, left: 60, right: 60 };
    const containerWidth = document.getElementById("svgContainer4").offsetWidth;
    const containerHeight = document.getElementById("svgContainer4")
      .offsetHeight;
    var svg = d3
      .select("#svgContainer4")
      .append("svg")
      .attr("width", containerWidth / 2)
      .attr("height", containerHeight); //得到SVG画布
    var width = svg.attr("width"); //得到画布的宽
    var height = svg.attr("height"); //得到画布的长
    var g = svg
      .append("g")
      .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

    var dataset = [10, 20, 30, 23, 13, 40, 27, 35, 20];

    var xScale = d3
      .scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, width - marge.left - marge.right]);
    var xAxis = d3.axisBottom(xScale);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([height - marge.top - marge.bottom, 0]);
    var yAxis = d3.axisLeft(yScale);

    g.append("g")
      .attr("transform", "translate(" + 0 + "," + height - marge.top + ")")
      .call(xAxis);

    g.append("g")
      .attr("transform", "translate(" + width - marge.right + "," + 0 + ")")
      .call(yAxis);

    var gs = g
      .selectAll(".rect")
      .data(dataset)
      .enter()
      .append("g");

    var rectPadding = 20; //矩形之间的间隙
    gs.append("rect")
      .attr("x", function(d, i) {
        return xScale(i) + rectPadding / 2;
      })
      .attr("y", function(d) {
        return yScale(d);
      })
      .attr("width", function() {
        return xScale.step() - rectPadding;
      })
      .attr("height", function(d) {
        return height - marge.top - marge.bottom - yScale(d);
      })
      .attr("fill", "blue");

    gs.append("text")
      .attr("x", function(d, i) {
        return xScale(i) + rectPadding / 2;
      })
      .attr("y", function(d) {
        return yScale(d);
      })
      .attr("dx", function() {
        (xScale.step() - rectPadding) / 2;
      })
      .attr("dy", 20)
      .text(function(d) {
        return d;
      });
  },
  methods: {}
};
</script>
<style lang="less">
</style>