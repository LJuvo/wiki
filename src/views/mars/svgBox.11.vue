<template>
  <div id="svgContainer11" style="width:100%;height:600px"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    var marge = { top: 60, bottom: 60, left: 60, right: 60 };
    const containerWidth = document.getElementById("svgContainer11")
      .offsetWidth;
    const containerHeight = document.getElementById("svgContainer11")
      .offsetHeight;
    var svg = d3
      .select("#svgContainer11")
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .append("g")
      .attr(
        "transform",
        "translate(" +
          containerWidth / 2 +
          "," +
          (containerHeight / 2 + marge.top) +
          ")"
      );

    var width = svg.attr("width"); //得到画布的宽
    var height = svg.attr("height"); //得到画布的长

    var projection = d3
      .geoMercator()
      .center([107, 31])
      .scale(600)
      .translate([width / 2, height / 2]);
    var path = d3.geoPath().projection(projection);
    var color = d3.schemeCategory10;
    var url = "map/china_diaoyudao.json";
    d3.json(url).then(function(root) {
      svg
        .selectAll("path")
        .data(root.features)
        .enter()
        .append("path")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("fill", function(d, i) {
          return color[i % 10];
        })
        .attr("d", path)
        .on("mouseover", function(d, i) {
          d3.select(this).attr("fill", "yellow");
        })
        .on("mouseout", function(d, i) {
          d3.select(this).attr("fill", color[i % 10]);
        })
        .on("click", function(d) {
          // console.log(d);
          //计算面积、中心、边界框
          var area = path.area(d);
          var centroid = path.centroid(d);
          var bounds = path.bounds(d);
          //输出到控制台
          console.log("省份：" + d.properties.name);
          console.log("面积：" + area);
          console.log("中心：" + centroid);
          console.log("边界框：");
          console.log(bounds);
          //显示中心
          svg
            .append("circle")
            .attr("class", "centroid")
            .attr("cx", centroid[0])
            .attr("cy", centroid[1])
            .attr("r", 8);

          //显示边界框
          svg
            .append("rect")
            .attr("class", "boundingbox")
            .attr("x", bounds[0][0])
            .attr("y", bounds[0][1])
            .attr("width", bounds[1][0] - bounds[0][0])
            .attr("height", bounds[1][1] - bounds[0][1])
            .attr("fill", "none")
            .attr("stroke-width", "1px")
            .attr("stroke", "blue");
        });
    });

    // //绘制南海，需要下载一个svg文件
    // d3.xml("../../static/southchinasea.svg",function(error,xmlDocument){
    //     china.append("g").html(function(d){
    //         //新建一个g标签绘制南海
    //        return d3.select(this).html() + xmlDocument.getElementsByTagName("g")[0].outerHTML;
    //     });
    //     //给南海赋予平移度和缩放比
    //     var gSouthSea = d3.select("#southsea");
    //     gSouthSea.attr("transform","translate(1100,600) scale(0.5)").attr("class","southsea");
    // });
    // //END
  },
  methods: {}
};
</script>
<style lang="less">
</style>