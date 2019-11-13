<template>
  <div :id="'rosepie'+id" style="width:100%;height:100%"></div>
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
      if (document.getElementById("rosepie" + this.id))
        document.getElementById("rosepie" + this.id).innerHTML = "";
      var data = [
        {
          type: "分类一",
          value: 27
        },
        {
          type: "分类二",
          value: 25
        },
        {
          type: "分类三",
          value: 18
        },
        {
          type: "分类四",
          value: 15
        },
        {
          type: "分类五",
          value: 10
        },
        {
          type: "Other",
          value: 5
        }
      ];

      var chart = new G2.Chart({
        container: "rosepie" + this.id,
        forceFit: true,
        height: document.getElementById("rosepie" + this.id).offsetHeight,
        padding: "auto"
      });

      chart.source(data);
      chart.coord("polar", {
        startAngle: Math.PI, // 起始角度
        endAngle: Math.PI * (3 / 2) // 结束角度
      });
      chart
        .interval()
        .position("type*value")
        .color("type", "rgb(252,143,72)-rgb(255,215,135)")
        .label("value", {
          offset: -15,
          label: {
            textAlign: "center",
            fill: "#000"
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
