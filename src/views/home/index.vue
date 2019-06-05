<template>
  <div class="home-pane">
    <svg class="home-pane-svg" id="floorSvg"></svg>
  </div>
</template>

<script>
import FloorPaneObj from "./comps/floorPane";
export default {
  computed: {},
  mounted() {
    let floorPane = new FloorPaneObj();
    floorPane.init(
      "floorSvg",
      [],
      [
        {
          label: "一层",
          url: "http://localhost:8080/ibms/plane_cover.svg",
          class: "plane-cover",
          type: -1
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: -1
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: -1
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 1
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 2
        },
        {
          label: "一层",
          url: "ibms/plane_ground.svg",
          class: "plane-ground",
          type: 2
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 2
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 2
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 2
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 3
        },
        {
          label: "一层",
          url: "ibms/plane_ground.svg",
          class: "plane-ground",
          type: 3
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 3
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 3
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 3
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 3
        },
        {
          label: "一层",
          url: "ibms/plane_ground.svg",
          class: "plane-ground",
          type: 3
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 3
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 3
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 4
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 4
        },
        {
          label: "一层",
          url: "ibms/plane_ground.svg",
          class: "plane-ground",
          type: 4
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 4
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 4
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 4
        },
        {
          label: "一层",
          url: "ibms/plane_basic.svg",
          class: "plane-basic",
          type: 4
        },
        {
          label: "一层",
          url: "ibms/plane_ground.svg",
          class: "plane-ground",
          type: 4
        },
        {
          label: "一层",
          url: "ibms/plane_pedestal.svg",
          class: "plane-pedestal",
          type: 4
        },
        {
          label: "一层",
          url: "ibms/plane_underground.svg",
          class: "plane-underground",
          type: 4
        }
      ]
    );
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