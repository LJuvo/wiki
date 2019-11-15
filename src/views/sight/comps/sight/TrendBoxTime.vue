<template>
  <div class="boxtime" :id="'boxtime'+this.id"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  props: {
    id: {
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
      pieWidth: 400,
      boxWidth: 0,
      boxHeight: 100,
      boxItemWidth: 8,
      boxItemPadX: 4,
      boxItemPadY: 2,
      boxId: "",
      svgBox: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.boxId = "boxtime" + this.id;
      this.boxWidth = document.getElementById(
        this.boxId
      ).parentElement.offsetWidth;

      if (this.boxId) this.initBox();
    });
  },
  methods: {
    initBox() {
      this.svgBox = d3
        .select("#" + this.boxId)
        .append("svg")
        .attr("width", this.boxWidth)
        .attr("height", this.boxHeight);

      let svgBox = this.svgBox;
      let bgBox = svgBox.append("g");

      let bgBoxHoriNum = this.boxWidth / (this.boxItemWidth + this.boxItemPadX);
      let bgBoxVerNum =
        (this.boxHeight - 20) / (this.boxItemWidth + this.boxItemPadY);
      for (let i = 0; i < bgBoxHoriNum; i++) {
        for (let k = 0; k < bgBoxVerNum - 1; k++) {
          this.initBgBox(
            bgBox.append("g"),
            i * (this.boxItemWidth + this.boxItemPadX),
            k * (this.boxItemWidth + this.boxItemPadY),
            this.boxItemWidth,
            // "rgba(255,255,255,0.2)",
            this.getColor(),
            i + "_" + k
          );
        }
        // this.setBoxColor(i, _.random(0, bgBoxVerNum - 1), "#f97d2c");
        if (i % 6 === 0)
          this.initHoriText(
            bgBox.append("g"),
            i * (this.boxItemWidth + this.boxItemPadX),
            this.boxHeight - 10,
            i / 6 + ":00"
          );
      }
    },
    initBgBox(box, x, y, width, color, label) {
      box
        .append("rect")
        .attr("class", "bgbox" + label)
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", width)
        .attr("fill", color)
        .attr("opacity", 0.7);
    },
    initHoriText(box, x, y, label) {
      box
        .append("text")
        .attr("transform", `translate(${x},${y})`)
        .attr("text-anchor", "middle")
        .attr("fill", "rgba(255,255,255,.4)")
        .text(label);
    },
    setBoxColor(i, k, color) {
      d3.select(".bgbox" + i + "_" + k)
        .transition()
        .duration(200)
        .ease(d3.easeBounceOut)
        .attr("fill", color);
    },
    getColor() {
      let radNum = _.random(0, 99);
      // console.log(radNum);
      let radColor = "rgba(255,255,255,0.2)";
      switch (true) {
        case radNum < 50:
          radColor = "rgba(255,255,255,0.2)";
          break;
        // case 20 <= radNum && radNum < 30:
        //   radColor = "#ffcc80";
        //   break;
        // case 30 <= radNum && radNum < 40:
        //   radColor = "#ff5722";
        //   break;
        // case 40 <= radNum && radNum < 50:
        //   radColor = "#ffa726";
        //   break;
        case 50 <= radNum && radNum < 60:
          radColor = "#ff9800";
          break;
        // case 60 <= radNum && radNum < 70:
        //   radColor = "#f97d2c";
        //   break;
        // case 70 <= radNum && radNum < 80:
        //   radColor = "#f57c00";
        //   break;
        case 80 <= radNum && radNum < 100:
          radColor = "#e65100";
          break;
        default:
          break;
      }
      return radColor;
    }
  }
};
</script>
<style lang='less' scoped>
.boxtime {
  width: 100%;
  height: 100%;
}
</style>