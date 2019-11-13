<template>
  <div class="piecount">
    <div :id="'piecount'+this.id"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: ""
    }
  },
  components: {},
  data() {
    return {
      dataList: [
        ["环境告警", 70],
        ["安防告警", 20],
        ["供电告警", 50],
        ["消防告警", 30],
        ["通信告警", 10],
        ["设备告警", 10]
      ],
      colorList: ["#ffffff", "#fdd531", "#f97d2c", "#e1c28a", "#545154"],
      colorInnerList: ["#97948c", "#9b6c27", "#984e12", "#91664c", "#3a3631"],
      selectIndex: 0,
      pieWidth: 400
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initPie();
    });
  },
  methods: {
    initBasic() {},
    initPie() {
      let _this = this;
      let dataset = this.dataList;
      const width = this.pieWidth;
      const height = this.pieWidth;
      const fontsize = 14;
      const svg = d3
        .select("#piecount" + this.id)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const pie = d3.pie().value(d => d[1]);
      // dataset为转换前的数据 piedata为转换后的数据
      const piedata = pie(dataset);

      // 创建内弧生成器
      const arcinner = d3
        .arc()
        .innerRadius(width / 6.8)
        .outerRadius(width / 6.2);
      const arcInnerHover = d3
        .arc()
        .innerRadius(width / 6.2)
        .outerRadius(width / 5.5);
      // 创建外弧生成器
      const arcOut = d3
        .arc()
        .innerRadius(width / 5.2)
        .outerRadius(width / 4.8);
      const arcHover = d3
        .arc()
        .innerRadius(width / 5.4)
        .outerRadius(width / 4.4);
      // const color = d3.scaleOrdinal(d3.schemeCategory10);
      const angleSize = 0.04;
      // 添加对应数目的弧组
      let arcPane = svg.selectAll("g");
      const arcs = arcPane
        .data(piedata)
        .enter()
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);
      // 添加弧的路径元素
      arcs
        .append("path")
        .attr("class", function(d, i) {
          return "outArc" + i;
        })
        .attr("fill", function(d, i) {
          return _this.colorList[i];
        })
        .attr("d", function(d) {
          d.startAngle += angleSize;
          d.endAngle -= angleSize;
          return arcOut(d); // 使用弧生成器获取路径
        })
        .on("mouseover", function(d, i) {
          d3.select(this)
            .transition()
            .duration(200)
            .ease(d3.easeBounceOut)
            .attr("d", function(d, i) {
              return arcHover(d);
            });
        })
        .on("mouseleave", function(d, i) {
          if (_this.selectIndex != i)
            d3.select(this)
              .transition()
              .duration(200)
              .ease(d3.easeBounceOut)
              .attr("d", function(d, i) {
                return arcOut(d);
              });
        })
        .on("click", function(d, i) {
          console.log(i, this);
          _this.setSelectPie(i);
        });

      // 添加对应数目的弧组
      const arcsinner = arcPane
        .data(piedata)
        .enter()
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);
      // 添加弧的路径元素
      arcsinner
        .append("path")
        .attr("class", "innerArc")
        .attr("fill", function(d, i) {
          return _this.colorInnerList[i];
        })
        .attr("d", function(d) {
          d.startAngle += angleSize;
          d.endAngle -= angleSize;
          return arcinner(d); // 使用弧生成器获取路径
        });

      // 添加弧内的文字
      arcs
        .append("text")
        .attr("transform", function(d) {
          const x = arcOut.centroid(d)[0] * 1.4; // 文字的x坐标
          const y = arcOut.centroid(d)[1] * 1.4;
          return `translate(${x},${y})`;
        })
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .text(d => {
          const percent =
            (Number(d.value) /
              d3.sum(dataset, a => {
                return a[1];
              })) *
            100;
          // 保留一位小数点 末尾加一个百分号返回
          return `${percent.toFixed(1)}%`;
        });

      // 添加连接弧外文字的直线元素
      arcs
        .append("line")
        .attr("stroke", "#ffbe34")
        .attr("x1", d => {
          return arcOut.centroid(d)[0] * 2;
        })
        .attr("y1", d => {
          return arcOut.centroid(d)[1] * 2;
        })
        .attr("x2", d => {
          return arcOut.centroid(d)[0] * 2.2;
        })
        .attr("y2", d => {
          return arcOut.centroid(d)[1] * 2.2;
        });

      arcs
        .append("line")
        .style("stroke", "#ffbe34")
        .each(d => {
          d.textLine = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0
          };
        })
        .attr("x1", d => {
          d.textLine.x1 = arcOut.centroid(d)[0] * 2.2;
          return d.textLine.x1;
        })
        .attr("y1", d => {
          d.textLine.y1 = arcOut.centroid(d)[1] * 2.2;
          return d.textLine.y1;
        })
        .attr("x2", d => {
          // console.log("d.data[0]:  "+d.data[0]);//产商名
          const strLen = this.getPixelLength(d.data[0], fontsize) * 1.5;
          const bx = arcOut.centroid(d)[0] * 2.2;
          d.textLine.x2 = bx >= 0 ? bx + strLen : bx - strLen;
          return d.textLine.x2;
        })
        .attr("y2", d => {
          d.textLine.y2 = arcOut.centroid(d)[1] * 2.2;
          return d.textLine.y2;
        });
      arcs
        .append("text")
        .attr("transform", function(d) {
          let x = 0;
          let y = 0;
          x = (d.textLine.x1 + d.textLine.x2) / 2;
          y = d.textLine.y1;
          y = y > 0 ? y + fontsize * 1.1 : y - fontsize * 0.4;
          return `translate(${x},${y})`;
        })
        .style("text-anchor", "middle")
        .style("font-size", fontsize)
        .style("fill", "#ffbe34")
        .text(function(d) {
          return d.data[0];
        });
      // 添加一个提示框
      const tooltip = d3
        .select("#piecount" + this.id)
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "rgba(0,0,0,0.5)")
        .style("opacity", 0);

      // 添加提示框
      arcs
        .on("mouseover", function(d, i) {
          tooltip
            .html(
              `${d.data[0]}数量为<br /><span class="count-number">${
                d.data[1]
              } </span>`
            )
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY + 20}px`)
            .style("opacity", 1.0)
            .style("padding", "8px 10px")
            // .style("box-shadow", `10px 0px 0px${_this.colorInnerList[i]}`); // 在提示框后添加阴影
            .style("box-shadow", `10px 0px 0px${_this.colorList[i]}`); // 在提示框后添加阴影
        })
        .on("mousemove", () => {
          tooltip
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY + 20}px`);
        })
        .on("mouseout", () => {
          // 鼠标移除 透明度设为0
          tooltip.style("opacity", 0.0);
        });

      svg
        .append("g")
        .append("text")
        .attr("class", "mainlabel")
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", "2rem")
        .text(d => {
          return `2.4`;
        });
      svg
        .append("g")
        .append("text")
        .attr("class", "bottomlabel")
        .attr("transform", `translate(${width / 2},${height / 2 + 20})`)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", "0.6rem")
        .text(d => {
          return `20.3%`;
        });

      this.setSelectPie(this.selectIndex);
    },
    setColor(index) {
      return this.colorList[index] || "#FFBE34";
    },
    getPixelLength(str, fontsize) {
      let curLen = 0;
      for (let i = 0; i < str.length; i += 1) {
        const code = str.charCodeAt(i);
        const pixelLen = code > 255 ? fontsize : fontsize / 2;
        curLen += pixelLen;
      }
      return curLen;
    },
    setSelectPie(index) {
      const radDefault = d3
        .arc()
        .innerRadius(this.pieWidth / 5.2)
        .outerRadius(this.pieWidth / 4.8);
      const radHover = d3
        .arc()
        .innerRadius(this.pieWidth / 5.4)
        .outerRadius(this.pieWidth / 4.4);

      this.selectIndex = index;
      this.dataList.forEach((ele, i) => {
        d3.select(".outArc" + i)
          .transition()
          .duration(200)
          .ease(d3.easeBounceOut)
          .attr("d", function(d, i) {
            return radDefault(d);
          });
      });

      d3.select(".outArc" + index)
        .transition()
        .duration(200)
        .ease(d3.easeBounceOut)
        .attr("d", function(d, i) {
          return radHover(d);
        });

      this.setMainLabel(index);
    },
    setMainLabel(i) {
      let tmp = this.dataList[i];
      d3.select(".mainlabel")
        .transition()
        .duration(200)
        .ease(d3.easeBounceOut)
        .text(d => {
          return tmp[1];
        });

      d3.select(".bottomlabel")
        .transition()
        .duration(200)
        .ease(d3.easeBounceOut)
        .text(d => {
          return this.getPercentVal(this.dataList, tmp[1]);
        });
    },
    getPercentVal(list, val) {
      const percent =
        (Number(val) /
          d3.sum(list, a => {
            return a[1];
          })) *
        100;
      return `${percent.toFixed(1)}%`;
    }
  }
};
</script>
<style lang='less' scoped>
.piecount {
  width: 100%;
  height: 100%;
}
.count-number {
  font-size: 2rem;
}
</style>