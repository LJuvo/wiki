<template>
  <div id="svgContainer14" style="width:100%;height:800px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    var marge = { top: 60, bottom: 60, left: 60, right: 60 };
    const containerWidth = document.getElementById("svgContainer14")
      .offsetWidth;
    const containerHeight = document.getElementById("svgContainer14")
      .offsetHeight;
    var svg = d3
      .select("#svgContainer14")
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .append("g");
    // .attr(
    //   "transform",
    //   "translate(" +
    //     containerWidth / 2 +
    //     "," +
    //     (containerHeight / 2 + marge.top) +
    //     ")"
    // );

    var width = svg.attr("width"); //得到画布的宽
    var height = svg.attr("height"); //得到画布的长

    var projection = d3
      .geoMercator()
      .center([107, 31])
      .scale(850)
      .translate([width / 2, height / 2 + marge.top]);

    var path = d3.geoPath().projection(projection);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    d3.json("map/china_diaoyudao.json").then(function(root) {
      svg
        .selectAll("path")
        .data(root.features)
        .enter()
        .append("path")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", path)
        .on("mouseover", function(d, i) {
          d3.select(this).attr("fill", "yellow");
        })
        .on("mouseout", function(d, i) {
          d3.select(this).attr("fill", color(i));
        });
    });
  },
  methods: {}
};
</script>
<style lang="less">
</style>