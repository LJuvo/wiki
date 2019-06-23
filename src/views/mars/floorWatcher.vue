<template>
  <div class="floor-watcher" id="floorWatcher"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      watcherId: "",
      containerWidth: 0,
      containerHeight: 0,
      watcherBox: undefined
    };
  },
  mounted() {
    this.Init();
  },
  methods: {
    Init() {
      this.watcherId = "floorWatcher";
      this.containerWidth = document.getElementById(this.watcherId).offsetWidth;
      this.containerHeight = document.getElementById(
        this.watcherId
      ).offsetHeight;

      this.watcherBox = d3.select("#" + this.watcherId);

      let box = this.watcherBox;

      let arr = [];
      for (let i = 1; i <= 50; i++) {
        arr.push(i + "F");
      }

      arr.forEach(ele => {
        this.basicLineModel(box, ele, this.containerHeight / arr.length);
      });

      d3.select("#A12F").classed("floor-active", true);
    },
    basicLineModel(box, ele, bH) {
      let mBox = box
        .append("div")
        .attr("id", "A" + ele)
        .attr("class", "basic-box")
        .style("height", bH + "px")
        .style("margin", "5px 0")
        .on("click", function() {
          d3.selectAll(".floor-active").classed("floor-active", false);
          d3.select(this).classed("floor-active", true);
        })
        .on("mouseover", function() {
          d3.select(this).classed("floor-hover", true);
        })
        .on("mouseleave", function() {
          d3.select(this).classed("floor-hover", false);
        });

      mBox.append("div").attr("class", "second-line");
      mBox.append("div").attr("class", "basic-line");
      let mmBox = mBox.append("div").attr("class", "main-box");
      mmBox
        .append("div")
        .html(ele)
        .attr("class", "main-title");
      mmBox.append("div").attr("class", "main-line");
      mBox.append("div").attr("class", "basic-line");
      mBox.append("div").attr("class", "second-line");
    }
  }
};
</script>

<style lang="less">
.floor-watcher {
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  overflow-y: auto;
  color: #cccccc;
}

.basic-box {
  width: 100%;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 8px;
  cursor: hand;
  cursor: pointer;
}
.basic-line {
  width: 20px;
  height: 1px;
  float: right;
  background: #dddddd;
}
.main-box {
  width: 100%;
  text-align: right;
  position: relative;
}
.main-title {
  position: absolute;
  width: 20px;
  text-align: center;
  left: 10px;
  top: -8px;
}
.main-line {
  width: 40px;
  height: 1px;
  float: right;
  background: #ffbb00;
}
.second-line {
  width: 30px;
  height: 1px;
  float: right;
  background: rgb(158, 158, 255);
}
.center-line {
  position: absolute;
  width: 30px;
  height: 5px;
  right: 0;
  background: #cccccc;
  z-index: 10;
}
.floor-active {
  font-size: 18px;
  font-weight: 500;
  color: rgb(36, 36, 36);
  .main-line {
    width: 50px;
    height: 4px;
    float: right;
    background: #ff0000;
  }
}
.floor-hover {
  font-size: 18px;
  font-weight: 500;
  color: rgb(71, 71, 71);

  .main-line {
    width: 40px;
    height: 4px;
    float: right;
    background: #ff8800;
  }
}

.floor-watcher::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
.floor-watcher::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
.floor-watcher::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>

