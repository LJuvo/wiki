<template>
  <div id="svgContainer8" style="width:100%;height:600px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    var marge = { top: 60, bottom: 60, left: 60, right: 60 };
    const containerWidth = document.getElementById("svgContainer8").offsetWidth;
    const containerHeight = document.getElementById("svgContainer8")
      .offsetHeight;
    var svg = d3
      .select("#svgContainer8")
      .append("svg")
      .attr("width", containerWidth / 2)
      .attr("height", containerHeight); //得到SVG画布

    var width = svg.attr("width"); //得到画布的宽
    var height = svg.attr("height"); //得到画布的长
    var g = svg
      .append("g")
      .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

    var dataset = [30, 10, 43, 55, 13];

    //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
    var colorScale = d3
      .scaleOrdinal()
      .domain(d3.range(dataset.length))
      .range(d3.schemeCategory10);

    //新建一个饼状图
    var pie = d3.pie();

    //新建一个弧形生成器
    var innerRadius = 50; //内半径
    var outerRadius = 100; //外半径
    var arc_generator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    //将原始数据变成可以绘制饼状图的数据，
    var pieData = pie(dataset);

    //在浏览器的控制台打印pieData
    // console.log(pieData);

    //在有了绘制饼状图必须的数据后，我们就可以开始绘制了
    var gs = g
      .selectAll(".g")
      .data(pieData)
      .enter()
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); //位置信息

    //绘制饼状图的各个扇形
    gs.append("path")
      .attr("d", function(d) {
        return arc_generator(d); //往弧形生成器中出入数据
      })
      .attr("fill", function(d, i) {
        return colorScale(i);
      });

    //绘制饼状图上面的文字信息
    gs.append("text")
      .attr("transform", function(d) {
        //位置设在中心处
        return "translate(" + arc_generator.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.data;
      });
  },
  methods: {}
};
</script>
<style lang="less">
</style>