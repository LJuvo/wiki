<template>
  <div class="home-pane">
    <div
      style="position:absolute;right:50px;top:50px;padding:10px;background:rgba(0,0,0,0.6);color:#fff;"
    >
      <div>当前坐标：({{mouseX}},{{mouseY}})</div>
      <div>当前X比例：({{containerW}},{{mouseX}})/{{Math.floor(mouseX/containerW * 100) / 100}}</div>
      <div>当前Y比例：({{containerH}},{{mouseY}})/{{Math.floor(mouseY/containerH * 100) / 100}}</div>
    </div>

    <svg class="home-pane-svg" id="floorSvg"></svg>
  </div>
</template>

<script>
import FloorPaneObj from "./comps/floorPane";
import FloorGUIObj from "./comps/floorGUI";
export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      containerW: 0,
      containerH: 0
    };
  },
  computed: {},
  mounted() {
    let floorPane = new FloorGUIObj();
    floorPane.init(
      "floorSvg",
      (x, y, w, h) => {
        this.mouseX = x;
        this.mouseY = y;
        this.containerW = w;
        this.containerH = h;
      },
      (x, y) => {}
    );

    // let floorPane = new FloorPaneObj();
    // floorPane.init(
    //   "floorSvg",
    //   [],
    //   [
    //     {
    //       label: "一层",
    //       url: "http://localhost:8080/ibms/plane_cover.svg",
    //       class: "plane-cover",
    //       type: -1
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: -1
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: -1
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 1
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 2
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_ground.svg",
    //       class: "plane-ground",
    //       type: 2
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 2
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 2
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 2
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 3
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_ground.svg",
    //       class: "plane-ground",
    //       type: 3
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 3
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 3
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 3
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 3
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_ground.svg",
    //       class: "plane-ground",
    //       type: 3
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 3
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 3
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 4
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 4
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_ground.svg",
    //       class: "plane-ground",
    //       type: 4
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 4
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 4
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 4
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_basic.svg",
    //       class: "plane-basic",
    //       type: 4
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_ground.svg",
    //       class: "plane-ground",
    //       type: 4
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_pedestal.svg",
    //       class: "plane-pedestal",
    //       type: 4
    //     },
    //     {
    //       label: "一层",
    //       url: "ibms/plane_underground.svg",
    //       class: "plane-underground",
    //       type: 4
    //     }
    //   ]
    // );
  }
};
</script>

<style lang="less" scoped>
.home-pane {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-ground {
    margin: 200px auto;
    width: 500px;
    text-align: center;
  }
  &-svg {
    width: 100%;
    height: 100%;
  }
}
</style>