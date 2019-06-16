<template>
  <div id="starBox" style="height: 100%;
  width: 100%;">
    <!-- <img src="surroundings.svg"> -->
  </div>
</template>

<script>
import * as THREE from "three";
import STAR from "../../star/star";
export default {
  mounted() {
    this.Init();
  },
  methods: {
    Init() {
      let star = new STAR();
      star.APP("starBox", true);

      //立方体
      var cubeGeometry = new THREE.CubeGeometry(30, 30, 30);

      var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = 100;
      cube.position.y = 0;
      cube.position.z = -5;

      //告诉立方体需要投射阴影
      cube.castShadow = true;

      star.createBox(cube);
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

