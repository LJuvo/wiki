<template>
  <div id="svgContainer17" style="width:100%;height:600px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    var marge = { top: 60, bottom: 60, left: 60, right: 60 };
    const containerWidth = document.getElementById("svgContainer17")
      .offsetWidth;
    const containerHeight = document.getElementById("svgContainer17")
      .offsetHeight;
    var svg = d3
      .select("#svgContainer17")
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
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .attr("stroke", function(d, i) {
        if (i == 0) {
          return "red";
        } else {
          return "blue";
        }
      })
      .attr("stroke-width", "10");

    gs.append("path")
      .attr("fill", function(d, i) {
        if (i == 0) {
          return "white";
        } else {
          return "blue";
        }
      })
      .attr("d", function(d) {
        return arc_generator(d);
      })
      .attr("stroke-dasharray", function(d, i) {
        if (i == 0) {
          return "5,5";
        } else {
          return "0,0";
        }
      });

    var rotate = -10;
    // function flash() {

    while (rotate < -360) {
      gs.transition()
        .ease(d3.easeLinear)
        .attr(
          "transform",
          "translate(" +
            width / 2 +
            "," +
            height / 2 +
            ") rotate(" +
            rotate +
            ")"
        );
      rotate -= 10;
      if (rotate <= 360) rotate = -10;
    }
    //   // rectangle.transition().ease(d3.easeLinear).attr("transform",'translate(300,200) rotate('+rotate+')').on("end", flash);
    // }
    // flash();
  },
  methods: {}
};
</script>
<style lang="less">
</style>