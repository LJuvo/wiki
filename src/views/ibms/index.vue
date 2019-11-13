<template>
  <div id="threeBox" style="height: 100vh;width: 100vw;">
    <!-- <img src="surroundings.svg"> -->
  </div>
</template>

<script>
import WEBGL from "./utils/WebGL";
import ThBoxObj from "./comps/thBox.pointCloud";
export default {
  mounted() {
    //WebGL兼容性检查
    let WEBGLObj = new WEBGL();
    if (WEBGLObj.isWebGLAvailable()) {
      this.Init();
    } else {
      var warning = WEBGLObj.getWebGLErrorMessage();
      document.getElementById("threeBox").appendChild(warning);
    }
  },
  methods: {
    Init() {
      const boxWidth = document.getElementById("threeBox").offsetWidth;
      const boxHeight = document.getElementById("threeBox").offsetHeight;
      let thBoxObj = new ThBoxObj();
      thBoxObj.init("threeBox", boxWidth, boxHeight);
    }
  }
};
</script>

<style lang="less">
#threeBox {
  height: 100%;
  width: 100%;
}
</style>

