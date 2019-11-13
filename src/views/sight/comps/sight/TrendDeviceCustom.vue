<template>
  <div :id="'chart'+id" style="width:100%;height:100%"></div>
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
      default: () => [
        {
          date: "2018/8/1",
          type: "download",
          value: 4623
        },
        {
          date: "2018/8/1",
          type: "register",
          value: 2208
        },
        {
          date: "2018/8/1",
          type: "bill",
          value: 182
        },
        {
          date: "2018/8/2",
          type: "download",
          value: 6145
        },
        {
          date: "2018/8/2",
          type: "register",
          value: 2016
        },
        {
          date: "2018/8/2",
          type: "bill",
          value: 257
        },
        {
          date: "2018/8/3",
          type: "download",
          value: 508
        },
        {
          date: "2018/8/3",
          type: "register",
          value: 2916
        },
        {
          date: "2018/8/3",
          type: "bill",
          value: 289
        },
        {
          date: "2018/8/4",
          type: "download",
          value: 6268
        },
        {
          date: "2018/8/4",
          type: "register",
          value: 4512
        },
        {
          date: "2018/8/4",
          type: "bill",
          value: 428
        },
        {
          date: "2018/8/5",
          type: "download",
          value: 6411
        },
        {
          date: "2018/8/5",
          type: "register",
          value: 8281
        },
        {
          date: "2018/8/5",
          type: "bill",
          value: 619
        },
        {
          date: "2018/8/6",
          type: "download",
          value: 1890
        },
        {
          date: "2018/8/6",
          type: "register",
          value: 2008
        },
        {
          date: "2018/8/6",
          type: "bill",
          value: 87
        },
        {
          date: "2018/8/7",
          type: "download",
          value: 4251
        },
        {
          date: "2018/8/7",
          type: "register",
          value: 1963
        },
        {
          date: "2018/8/7",
          type: "bill",
          value: 706
        },
        {
          date: "2018/8/8",
          type: "download",
          value: 2978
        },
        {
          date: "2018/8/8",
          type: "register",
          value: 2367
        },
        {
          date: "2018/8/8",
          type: "bill",
          value: 387
        },
        {
          date: "2018/8/9",
          type: "download",
          value: 3880
        },
        {
          date: "2018/8/9",
          type: "register",
          value: 2956
        },
        {
          date: "2018/8/9",
          type: "bill",
          value: 488
        },
        {
          date: "2018/8/10",
          type: "download",
          value: 3606
        },
        {
          date: "2018/8/10",
          type: "register",
          value: 678
        },
        {
          date: "2018/8/10",
          type: "bill",
          value: 507
        },
        {
          date: "2018/8/11",
          type: "download",
          value: 4311
        },
        {
          date: "2018/8/11",
          type: "register",
          value: 3188
        },
        {
          date: "2018/8/11",
          type: "bill",
          value: 548
        },
        {
          date: "2018/8/12",
          type: "download",
          value: 4116
        },
        {
          date: "2018/8/12",
          type: "register",
          value: 3491
        },
        {
          date: "2018/8/12",
          type: "bill",
          value: 456
        },
        {
          date: "2018/8/13",
          type: "download",
          value: 6419
        },
        {
          date: "2018/8/13",
          type: "register",
          value: 2852
        },
        {
          date: "2018/8/13",
          type: "bill",
          value: 689
        },
        {
          date: "2018/8/14",
          type: "download",
          value: 1643
        },
        {
          date: "2018/8/14",
          type: "register",
          value: 4788
        },
        {
          date: "2018/8/14",
          type: "bill",
          value: 280
        },
        {
          date: "2018/8/15",
          type: "download",
          value: 445
        },
        {
          date: "2018/8/15",
          type: "register",
          value: 4319
        },
        {
          date: "2018/8/15",
          type: "bill",
          value: 176
        }
      ]
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
      if (document.getElementById("chart" + this.id))
        document.getElementById("chart" + this.id).innerHTML = "";
      let data = this.chartArr;
      const ds = new DataSet({
        state: {
          start: new Date(_.last(data).time).getTime(),
          end: new Date(_.first(data).time).getTime()
        }
      });

      const dv = ds.createView("origin").source(data);
      dv.transform({
        type: "filter",
        callback: obj => {
          const time = new Date(obj.time).getTime();
          return time >= ds.state.start && time <= ds.state.end;
        }
      });
      if (!this.chartObj) {
        this.chartObj = new G2.Chart({
          container: "chart" + this.id,
          forceFit: true,
          animate: true,
          height: document.getElementById("chart" + this.id).offsetHeight,
          padding: "auto"
        });
      } else {
        this.chartObj.clear();
      }
      const chart = this.chartObj;
      let valTicks = this.backTicks(this.chartArr, 10, "0");
      let timeTicks = this.backTimes(this.chartArr, 10);

      const scale = {
        time: {
          mask: "HH:mm:ss",
          // ticks: timeTicks
          tickCount: 10
        },
        value: {
          alias: "读数",
          type: "linear",
          nice: true
          // formatter: val => {
          //   return val + this.curKpi.unit;
          // }
        }
      };

      chart.source(dv, scale);

      let toolObj = {
        crosshairs: {
          type: "line"
        },
        "g2-tooltip": {
          background: "rgba(255, 255, 255, 0.9)",
          "box-shadow": "rgb(174, 174, 174) 0px 0px 10px",
          color: "rgb(87,87,87)"
        }
      };
      if (this.theme == "dark")
        toolObj = {
          crosshairs: {
            type: "line",
            style: {
              stroke: "#4DD0E1",
              strokeOpacity: 0.8
            }
          },
          "g2-tooltip": {
            background: "rgba(0,0,0,0.6)",
            "box-shadow": "#00ACC1 0px 0px 10px",
            color: "#e0f7fa"
          }
        };
      chart.tooltip(toolObj);
      if (this.theme == "dark") {
        this.txtFill = "#9e9e9e";
        this.lineStroke = "#9e9e9e";
        this.gridStroke = "#757575";
      }
      let _this = this;
      chart.axis("time", {
        label: {
          textStyle: {
            fill: this.txtFill
          }
        },
        line: {
          stroke: this.lineStroke
        }
      });
      chart.axis("value", {
        label: {
          textStyle: {
            fill: this.txtFill
          },
          formatter: function formatter(val) {
            return val + _this.unit;
          }
        },
        grid: {
          lineStyle: {
            stroke: this.gridStroke,
            lineWidth: 1
          }
        }
      });

      chart.legend(false);

      chart
        .line()
        .position("time*value")
        .color("value", "#0cbabd")
        .opacity(0.5);
      chart
        .area()
        .position("time*value")
        .color("value", "#0cbabd")
        .opacity(0.2);

      chart.guide().dataMarker({
        content: "",
        position: function position() {
          var obj = _.maxBy(data, v => Number(v.value));
          if (obj) {
            return [obj.time, obj.value];
          }
          return [0, 0];
        },
        // direction: "upward",
        style: {
          text: {
            fontSize: 13,
            fill: "white"
          },
          size: 6,
          point: {
            fill: "#0cbabd",
            stroke: "#fff",
            r: 4
          }
        },
        lineLength: 0
      });
      chart.guide().dataMarker({
        content: "",
        position: function position() {
          var obj = _.minBy(data, v => Number(v.value));
          if (obj) {
            return [obj.time, obj.value];
          }
          return [0, 0];
        },
        style: {
          point: {
            fill: "#0cbabd",
            stroke: "#fff",
            r: 4
          }
        },
        lineLength: 0
      });

      chart.changeData(data);

      chart.interact("brush", {
        type: "X",
        onStart: () => (this.isOnBrush = true)
      });

      chart.on("dblclick", ev => {
        this.isOnBrush = false;
      });
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
