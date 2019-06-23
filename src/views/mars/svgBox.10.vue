<template>
  <div id="svgContainer10" style="width:100%;height:600px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    var marge = { top: 60, bottom: 60, left: 60, right: 60 };
    const containerWidth = document.getElementById("svgContainer10")
      .offsetWidth;
    const containerHeight = document.getElementById("svgContainer10")
      .offsetHeight;
    var svg = d3
      .select("#svgContainer10")
      .append("svg")
      .attr("width", containerWidth / 2)
      .attr("height", containerHeight); //得到SVG画布

    var width = svg.attr("width"); //得到画布的宽
    var height = svg.attr("height"); //得到画布的长
    var g = svg
      .append("g")
      .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

    var scale = svg
      .append("g")
      .attr("transform", "translate(" + marge.top + "," + marge.left + ")");
    //数据
    var dataset = {
      name: "中国",
      children: [
        {
          name: "浙江",
          children: [
            { name: "杭州", value: 100 },
            { name: "宁波", value: 100 },
            { name: "温州", value: 100 },
            { name: "绍兴", value: 100 }
          ]
        },
        {
          name: "广西",
          children: [
            {
              name: "桂林",
              children: [
                { name: "秀峰区", value: 100 },
                { name: "叠彩区", value: 100 },
                { name: "象山区", value: 100 },
                { name: "七星区", value: 100 }
              ]
            },
            { name: "南宁", value: 100 },
            { name: "柳州", value: 100 },
            { name: "防城港", value: 100 }
          ]
        },
        {
          name: "黑龙江",
          children: [
            { name: "哈尔滨", value: 100 },
            { name: "齐齐哈尔", value: 100 },
            { name: "牡丹江", value: 100 },
            { name: "大庆", value: 100 }
          ]
        },
        {
          name: "新疆",
          children: [
            { name: "乌鲁木齐" },
            { name: "克拉玛依" },
            { name: "吐鲁番" },
            { name: "哈密" }
          ]
        }
      ]
    };

    //创建一个hierarchy layout
    var hierarchyData = d3.hierarchy(dataset).sum(function(d) {
      return d.value;
    });

    //创建一个树状图
    var tree = d3
      .tree()
      .size([width - 400, height - 200])
      .separation(function(a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
      });

    //初始化树状图，也就是传入数据,并得到绘制树基本数据
    var treeData = tree(hierarchyData);
    // console.log(treeData);
    //得到节点
    var nodes = treeData.descendants();
    var links = treeData.links();

    //输出节点和边
    // console.log(nodes);
    // console.log(links);

    //创建一个贝塞尔生成曲线生成器
    var Bézier_curve_generator = d3
      .linkHorizontal()
      .x(function(d) {
        return d.y;
      })
      .y(function(d) {
        return d.x;
      });

    //有了节点和边集的数据后，我们就可以开始绘制了，
    //绘制边
    g.append("g")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", function(d) {
        var start = { x: d.source.x, y: d.source.y };
        var end = { x: d.target.x, y: d.target.y };
        return Bézier_curve_generator({ source: start, target: end });
      })
      .attr("fill", "none")
      .attr("stroke", "yellow")
      .attr("stroke-width", 1);

    //绘制节点和文字
    //老规矩，先创建用以绘制每个节点和对应文字的分组<g>
    var gs = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", function(d) {
        var cx = d.x;
        var cy = d.y;
        return "translate(" + cy + "," + cx + ")";
      });
    //绘制节点
    gs.append("circle")
      .attr("r", 6)
      .attr("fill", "white")
      .attr("stroke", "blue")
      .attr("stroke-width", 1);

    //文字
    gs.append("text")
      .attr("x", function(d) {
        return d.children ? -40 : 8;
      })
      .attr("y", -5)
      .attr("dy", 10)
      .text(function(d) {
        return d.data.name;
      });
  },
  methods: {}
};
</script>
<style lang="less">
</style>