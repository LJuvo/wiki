<template>
  <div id="svgContainer1" style="width:400px;height:600px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    var marge = { top: 60, bottom: 60, left: 60, right: 60 }; //设置边距
    var dataset = [250, 210, 170, 130, 90]; //数据（表示矩形的宽度）

    var svg = d3
      .select("#svgContainer1")
      .append("svg")
      .attr("width", "400px")
      .attr("height", "600px"); //得到svg画布
    var g = svg
      .append("g") //定义一个用来装整个图表的一个分组，并设置他的位置
      .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

    var rectHeight = 30; //设置每一个矩形的高度

    g.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", 20) //设置左上点的x
      .attr("y", function(d, i) {
        //设置左上点的y
        return i * rectHeight;
      })
      .attr("width", function(d) {
        //设置宽
        return d;
      })
      .attr("height", rectHeight - 5) //设置长
      .attr("fill", "blue"); //颜色填充
  },
  methods: {}
};
</script>
<style lang="less">
</style>