<template>
  <div :id="'legend'+id" style="width:100%;height:100%"></div>
</template>

<script>
import G2 from "@antv/g2";
import DataSet from "@antv/data-set";
import dayjs from "dayjs";
export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    chartArr: {
      type: Array,
      default: () => []
    },
    valAlias: {
      type: String,
      default: "数据"
    },
    theme: {
      type: String,
      default: ""
    },
    unit: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      txtFill: "#757575",
      lineStroke: "#9e9e9e",
      gridStroke: "#e0e0e0",
      chartObj: null,

      chart: null
    };
  },
  mounted() {
    this.initG2();

    window.addEventListener("resize", this.onWindowResize);
  },
  computed: {
    curValue() {
      const item = _.first(this.chartArr);
      return item ? Number(item.value).toFixed(2) : " - ";
    },
    curTime() {
      const item = _.first(this.chartArr);
      return item ? item.time : " - ";
    },
    maxValue() {
      const item = _.maxBy(this.chartArr, v => Number(v.value));
      return item ? Number(item.value).toFixed(2) : " - ";
    },
    minValue() {
      const item = _.minBy(this.chartArr, v => Number(v.value));
      return item ? Number(item.value).toFixed(2) : " - ";
    },
    meanValue() {
      const item = _.meanBy(this.chartArr, v => Number(v.value));
      return item ? Number(item).toFixed(2) : " - ";
    }
  },
  watch: {
    chartArr(v) {
      this.initG2();
    }
  },
  methods: {
    initG2() {
      if (document.getElementById("legend" + this.id))
        document.getElementById("legend" + this.id).innerHTML = "";
      var data = [
        [0, 0, 10],
        [0, 1, 19],
        [0, 2, 8],
        [0, 3, 24],
        [0, 4, 67],
        [1, 0, 92],
        [1, 1, 58],
        [1, 2, 78],
        [1, 3, 117],
        [1, 4, 48],
        [2, 0, 35],
        [2, 1, 15],
        [2, 2, 123],
        [2, 3, 64],
        [2, 4, 52],
        [3, 0, 72],
        [3, 1, 132],
        [3, 2, 114],
        [3, 3, 19],
        [3, 4, 16],
        [4, 0, 38],
        [4, 1, 5],
        [4, 2, 8],
        [4, 3, 117],
        [4, 4, 115],
        [5, 0, 88],
        [5, 1, 32],
        [5, 2, 12],
        [5, 3, 6],
        [5, 4, 120],
        [6, 0, 13],
        [6, 1, 44],
        [6, 2, 88],
        [6, 3, 98],
        [6, 4, 96],
        [7, 0, 31],
        [7, 1, 1],
        [7, 2, 82],
        [7, 3, 32],
        [7, 4, 30],
        [8, 0, 85],
        [8, 1, 97],
        [8, 2, 123],
        [8, 3, 64],
        [8, 4, 84],
        [9, 0, 47],
        [9, 1, 114],
        [9, 2, 31],
        [9, 3, 48],
        [9, 4, 91]
      ];
      var source = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var obj = {};
        obj.name = item[0];
        obj.day = item[1];
        obj.sales = item[2];
        source.push(obj);
      }
      var chart = new G2.Chart({
        container: "legend" + this.id,
        forceFit: true,
        height: document.getElementById("legend" + this.id).offsetHeight,
        padding: [20, 80, 120, 85]
      });
      chart.source(source, {
        name: {
          type: "cat",
          values: [
            "Alexander",
            "Marie",
            "Maximilian",
            "Sophia",
            "Lukas",
            "Maria",
            "Leon",
            "Anna",
            "Tim",
            "Laura"
          ]
        },
        day: {
          type: "cat",
          values: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        }
      });
      chart.axis("name", {
        tickLine: null,
        grid: {
          align: "center",
          lineStyle: {
            lineWidth: 1,
            lineDash: null,
            stroke: "#f0f0f0"
          }
        }
      });
      chart.axis("day", {
        title: null,
        grid: {
          align: "center",
          lineStyle: {
            lineWidth: 1,
            lineDash: [2, 2],
            stroke: "#d9d9d9"
          },
          showFirstLine: true
        }
      });
      chart
        .polygon()
        .position("name*day")
        .color("sales", "#f6f6f6-#36B3C3")
        .label("sales", {
          offset: -2,
          textStyle: {
            fill: "#fff",
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)"
          }
        })
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
      chart.render();
    },
    backTimes(arr, num) {
      if (num > arr.length) return this.lessTimes(arr);
      let tmp = [];
      let tickNum = (arr.length - 1) / (num - 1);
      for (let i = 0; i < (num < arr.length - 1 ? num : arr.length - 1); i++) {
        let tnum = parseInt(tickNum * i);

        let tval = arr[tnum].time;
        if (tval && !_.includes(tmp, tval)) tmp.push(tval);
      }
      return tmp;
    },
    lessTimes(arr) {
      let tmp = [];
      arr.forEach(ele => {
        let tval = ele.time;
        if (tval && !_.includes(tmp, tval)) tmp.push(tval);
      });

      return tmp;
    },
    backTicks(arr, num, minNum, maxNum) {
      let tmp = [];
      let min = parseInt(
        _.get(
          _.minBy(arr, o => {
            return parseInt(o.value);
          }),
          "value",
          "0"
        )
      );
      if (minNum) min = parseInt(minNum);
      let max =
        parseInt(
          _.get(
            _.maxBy(arr, o => {
              return parseInt(o.value);
            }),
            "value",
            "0"
          )
        ) + 1;
      let tickNum = (max - min) / (num - 1);
      for (let i = 0; i < num; i++) {
        let pushNum = parseInt(min + tickNum * i);
        if (minNum && i == 0) pushNum = minNum;
        if (maxNum && i + 1 == num) pushNum = maxNum;
        if (!_.includes(tmp, pushNum)) tmp.push(pushNum);
      }
      return tmp;
    },
    onWindowResize() {
      this.initG2();
    },
    refreshTrend() {
      this.initG2();
    }
  },
  beforeDestroy() {
    let toolObj = {
      "g2-tooltip": {
        background: "rgba(255, 255, 255, 0.9)",
        "box-shadow": "rgb(174, 174, 174) 0px 0px 10px",
        color: "rgb(87,87,87)"
      }
    };
    this.chartObj.tooltip(toolObj);
  }
};
</script>

<style lang="less">
</style>
