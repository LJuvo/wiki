<template>
  <div class="basic-pane" :id="'wasm'+id">
    <canvas :id="'cav'+'wasm'+id" width="1744" height="960" style="width:872px;height:480px;"></canvas>
    <div class="basic-pane-btn"></div>
  </div>
</template>
<script>
// import * as Player from "./wasm/lib/Player";
import "./wasm/wasm";
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.init("cav" + "wasm" + this.id);
    // let player = new Player();
    // var videoFileUrl =
    //   "https://turbo.linkme8.cn:33100/srs1/dvr/live/T1_05_CAM8/2019-11-13-13/18-02.573.flv?key=T1_05_CAM8&token=e9fd3e8f-aeaa-4083-b0dd-d1e2b88ee88a";

    // const canvasId = "cav" + "wasm" + this.id;
    // var canvas = document.getElementById(canvasId);
    // if (!canvas) {
    //   console.log("No Canvas with id " + canvasId + "!");
    //   return false;
    // }

    // player.play(
    //   videoFileUrl,
    //   canvas,
    //   function(e) {
    //     console.log("play error " + e.error + " status " + e.status + ".");
    //     if (e.error == 1) {
    //       console.log("Finished.");
    //     }
    //   },
    //   524288
    // );
  },
  methods: {
    init(canvasId) {
      let player = new Player();
      var videoFileUrl =
        "https://turbo.linkme8.cn:33100/srs1/dvr/live/T1_05_CAM8/2019-11-13-13/18-02.573.flv?key=T1_05_CAM8&token=e9fd3e8f-aeaa-4083-b0dd-d1e2b88ee88a";

      var canvas = document.getElementById(canvasId);
      if (!canvas) {
        console.log("No Canvas with id " + canvasId + "!");
        return false;
      }

      player.play(
        videoFileUrl,
        canvas,
        function(e) {
          console.log("play error " + e.error + " status " + e.status + ".");
          if (e.error == 1) {
            console.log("Finished.");
          }
        },
        524288
      );
    }
  },
  beforeDestroy() {}
};
</script>
<style lang='less' scoped>
.basic-pane {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  &-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
  }
}
</style>