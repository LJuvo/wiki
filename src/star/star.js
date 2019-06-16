import * as THREE from "three";
import WEBGL from "./utils/WebGL";
import { createDev } from "./lib/dev";

import { initRender } from "./lib/render";
import { initScene } from "./lib/scene";
import { initGui } from "./lib/gui";
import { initCamera } from "./lib/camera";
import { initBasicLight, initAmbientLight, initPointLight } from "./lib/light";
import { initControls } from "./lib/controls";
let star = () => {};
let renderer, scene, camera, controls, gui, ambientLight, pointLight;

let Init = (id, devState) => {
    const bW = document.getElementById(id).offsetWidth;
    const bH = document.getElementById(id).offsetHeight;

    renderer = initRender(id, bW, bH);
    scene = initScene();
    camera = initCamera(bW, bH);
    ambientLight = initAmbientLight();
    scene.add(ambientLight);
    pointLight = initPointLight();
    scene.add(pointLight);
    gui = initGui(ambientLight, pointLight);

    controls = initControls(camera, renderer);

    animate();
    if (devState) createDev(scene);

    window.addEventListener("resize", onWindowResize, false);
};

//窗口变动触发的函数
let onWindowResize = (bW, bH) => {
    camera.aspect = bW / bH;
    camera.updateProjectionMatrix();
    render();

    renderer.setSize(bW, bH);
};

let animate = () => {
    render();

    //更新相关位置
    pointLight.position.y = gui.lightY;

    controls.update();

    requestAnimationFrame(animate);
};

let render = () => {
    renderer.render(scene, camera);
};

star.prototype.APP = (id, devState) => {
    let WEBGLObj = new WEBGL();
    if (WEBGLObj.isWebGLAvailable()) {
        Init(id, devState);
    } else {
        var warning = WEBGLObj.getWebGLErrorMessage();
        document.getElementById(id).appendChild(warning);
    }
};
star.prototype.scene = scene;

star.prototype.createBox = box => {
    scene.add(box);
};

export default star;