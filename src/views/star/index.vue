<template>
  <div id="starBox" style="height: 100vh;width: 100%;background:#000;"></div>
</template>

<script>
import * as THREE from "three";
import STAR from "../../star/star";
import WAll from "./Wall";
import * as d3 from "d3";
import TestModel from "./test";

export default {
  components: { TestModel },
  mounted() {
    this.Init();
  },
  methods: {
    Init() {
      let star = new STAR();
      star.APP("starBox", false);

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
      star.createGround();

      star.createPointObj(
        "obj/PlayerShip_002",
        { x: -40, y: 10, z: -40 },
        { x: 0.03, y: 0.05, z: 0.03 },
        { x: -0.5, y: 0, z: -0.5 }
      );
      star.createLineObj(
        "obj/PlayerShip_002",
        { x: 0, y: 10, z: 0 },
        { x: 0.03, y: 0.05, z: 0.03 },
        { x: -0.5, y: 0, z: -0.5 }
      );
      star.createFaceObj(
        "obj/PlayerShip_002",
        { x: 40, y: 10, z: 40 },
        { x: 0.03, y: 0.05, z: 0.03 },
        { x: -0.5, y: 0, z: -0.5 }
      );
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

