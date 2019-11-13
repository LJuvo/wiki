<template>
  <div :id="'facet'+id" style="width:100%;height:100%"></div>
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
      if (document.getElementById("facet" + this.id))
        document.getElementById("facet" + this.id).innerHTML = "";
      var data = [
        {
          class: "转基因作物种植面积",
          country: "印度",
          type: "1",
          value: 10.8
        },
        {
          class: "转基因作物种植面积",
          country: "印度",
          type: "2",
          value: 89.2
        },
        {
          class: "转基因作物种植面积",
          country: "美国",
          type: "1",
          value: 72.9
        },
        {
          class: "转基因作物种植面积",
          country: "美国",
          type: "2",
          value: 27.1
        },
        {
          class: "转基因作物种植面积",
          country: "中国",
          type: "1",
          value: 2.8
        },
        {
          class: "转基因作物种植面积",
          country: "中国",
          type: "2",
          value: 97.2
        },
        {
          class: "转基因作物种植面积",
          country: "巴西",
          type: "1",
          value: 49.1
        },
        {
          class: "转基因作物种植面积",
          country: "巴西",
          type: "2",
          value: 50.9
        },
        {
          class: "转基因作物种植面积",
          country: "加拿大",
          type: "1",
          value: 11.6
        },
        {
          class: "转基因作物种植面积",
          country: "加拿大",
          type: "2",
          value: 88.4
        },
        {
          class: "转基因作物种植面积",
          country: "阿根廷",
          type: "1",
          value: 23.8
        },
        {
          class: "转基因作物种植面积",
          country: "阿根廷",
          type: "2",
          value: 76.2
        },
        {
          class: "转基因作物种植面积",
          country: "巴基斯坦",
          type: "1",
          value: 2.9
        },
        {
          class: "转基因作物种植面积",
          country: "巴基斯坦",
          type: "2",
          value: 97.1
        },
        {
          class: "转基因作物种植面积",
          country: "南非",
          type: "1",
          value: 2.7
        },
        {
          class: "转基因作物种植面积",
          country: "南非",
          type: "2",
          value: 97.3
        },
        {
          class: "转基因作物种植面积",
          country: "巴拉圭",
          type: "1",
          value: 3.6
        },
        {
          class: "转基因作物种植面积",
          country: "巴拉圭",
          type: "2",
          value: 96.4
        },
        {
          class: "转基因作物种植面积",
          country: "乌拉圭",
          type: "1",
          value: 1.3
        },
        {
          class: "转基因作物种植面积",
          country: "乌拉圭",
          type: "2",
          value: 98.7
        },
        {
          class: "耕地总面积",
          country: "印度",
          type: "1",
          value: 175.4
        },
        {
          class: "耕地总面积",
          country: "印度",
          type: "2",
          value: 24.6
        },
        {
          class: "耕地总面积",
          country: "美国",
          type: "1",
          value: 165.2
        },
        {
          class: "耕地总面积",
          country: "美国",
          type: "2",
          value: 34.8
        },
        {
          class: "耕地总面积",
          country: "中国",
          type: "1",
          value: 108.4
        },
        {
          class: "耕地总面积",
          country: "中国",
          type: "2",
          value: 91.6
        },
        {
          class: "耕地总面积",
          country: "巴西",
          type: "1",
          value: 73.2
        },
        {
          class: "耕地总面积",
          country: "巴西",
          type: "2",
          value: 126.8
        },
        {
          class: "耕地总面积",
          country: "加拿大",
          type: "1",
          value: 46.9
        },
        {
          class: "耕地总面积",
          country: "加拿大",
          type: "2",
          value: 153.1
        },
        {
          class: "耕地总面积",
          country: "阿根廷",
          type: "1",
          value: 38.6
        },
        {
          class: "耕地总面积",
          country: "阿根廷",
          type: "2",
          value: 161.4
        },
        {
          class: "耕地总面积",
          country: "巴基斯坦",
          type: "1",
          value: 22
        },
        {
          class: "耕地总面积",
          country: "巴基斯坦",
          type: "2",
          value: 178
        },
        {
          class: "耕地总面积",
          country: "南非",
          type: "1",
          value: 12.1
        },
        {
          class: "耕地总面积",
          country: "南非",
          type: "2",
          value: 187.9
        },
        {
          class: "耕地总面积",
          country: "巴拉圭",
          type: "1",
          value: 5.5
        },
        {
          class: "耕地总面积",
          country: "巴拉圭",
          type: "2",
          value: 194.5
        },
        {
          class: "耕地总面积",
          country: "乌拉圭",
          type: "1",
          value: 1.8
        },
        {
          class: "耕地总面积",
          country: "乌拉圭",
          type: "2",
          value: 198.2
        },
        {
          class: "转基因作物种植占比（%）",
          country: "印度",
          type: "1",
          value: 6.2
        },
        {
          class: "转基因作物种植占比（%）",
          country: "印度",
          type: "2",
          value: 93.8
        },
        {
          class: "转基因作物种植占比（%）",
          country: "美国",
          type: "1",
          value: 44.1
        },
        {
          class: "转基因作物种植占比（%）",
          country: "美国",
          type: "2",
          value: 55.9
        },
        {
          class: "转基因作物种植占比（%）",
          country: "中国",
          type: "1",
          value: 2.6
        },
        {
          class: "转基因作物种植占比（%）",
          country: "中国",
          type: "2",
          value: 97.4
        },
        {
          class: "转基因作物种植占比（%）",
          country: "巴西",
          type: "1",
          value: 67
        },
        {
          class: "转基因作物种植占比（%）",
          country: "巴西",
          type: "2",
          value: 33
        },
        {
          class: "转基因作物种植占比（%）",
          country: "加拿大",
          type: "1",
          value: 24.7
        },
        {
          class: "转基因作物种植占比（%）",
          country: "加拿大",
          type: "2",
          value: 75.3
        },
        {
          class: "转基因作物种植占比（%）",
          country: "阿根廷",
          type: "1",
          value: 61.6
        },
        {
          class: "转基因作物种植占比（%）",
          country: "阿根廷",
          type: "2",
          value: 38.4
        },
        {
          class: "转基因作物种植占比（%）",
          country: "巴基斯坦",
          type: "1",
          value: 13.2
        },
        {
          class: "转基因作物种植占比（%）",
          country: "巴基斯坦",
          type: "2",
          value: 86.8
        },
        {
          class: "转基因作物种植占比（%）",
          country: "南非",
          type: "1",
          value: 22.4
        },
        {
          class: "转基因作物种植占比（%）",
          country: "南非",
          type: "2",
          value: 77.6
        },
        {
          class: "转基因作物种植占比（%）",
          country: "巴拉圭",
          type: "1",
          value: 65.7
        },
        {
          class: "转基因作物种植占比（%）",
          country: "巴拉圭",
          type: "2",
          value: 34.3
        },
        {
          class: "转基因作物种植占比（%）",
          country: "乌拉圭",
          type: "1",
          value: 73
        },
        {
          class: "转基因作物种植占比（%）",
          country: "乌拉圭",
          type: "2",
          value: 27
        }
      ];
      var chart = new G2.Chart({
        container: "facet" + this.id,
        forceFit: true,
        height: document.getElementById("facet" + this.id).offsetHeight,
        padding: [20, 20, 20, 70]
      });
      chart.source(data);
      chart.coord().transpose();
      chart.legend(false);
      chart.facet("rect", {
        fields: ["class"],
        colTitle: {
          offsetY: -15,
          style: {
            fontSize: 14,
            textAlign: "center",
            fontWeight: 300,
            fill: "#8d8d8d"
          }
        },
        eachView: function eachView(view, facet) {
          if (facet.colIndex === 0) {
            view.axis("country", {
              label: {
                textStyle: {
                  fill: "#8d8d8d",
                  fontSize: 12
                }
              },
              tickLine: {
                alignWithLabel: false,
                length: 0
              },
              line: {
                lineWidth: 0
              }
            });

            view.axis("value", false);
          } else {
            view.axis(false);
          }
          var color = getTypeColor(facet.colValue);
          view
            .intervalStack()
            .position("country*value")
            .color("type", [color, "#ebedf0"])
            .opacity(1)
            .size(20)
            .label("value*type", function(value, type) {
              if (type === "2") return false;
              var offset = value < 30 ? 10 : -4;
              var fill = value < 30 ? "#525253" : "#ffffff";
              var textAlign = value < 30 ? "start" : "end";
              return {
                offset: offset,
                textStyle: {
                  fill: fill,
                  fontSize: 12,
                  textAlign: textAlign,
                  fontWeight: 300,
                  shadowBlur: 2,
                  shadowColor: "rgba(0, 0, 0, .45)"
                }
              };
            });
        }
      });
      chart.render();

      function getTypeColor(type) {
        if (type === "转基因作物种植面积") return "#1890ff";
        if (type === "耕地总面积") return "#2fc25b";
        if (type === "转基因作物种植占比（%）") return "#facc14";
      }
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
