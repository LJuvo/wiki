import * as THREE from "three";
import * as TWEEN from "tween";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
// import STLLoader from "three-stl-loader";
import "../utils/STLLoader";
import "../utils/TrackballControls";
import OrbitControls from "three-orbitcontrols";
let ThBox = () => {};
let renderer, scene, camera, basicLight, controls;

ThBox.prototype.init = (boxId, boxWidth, boxHeight) => {
    initRender(boxId, boxWidth, boxHeight);
    initCamera(boxWidth, boxHeight);
    initScene();
    initBasicLight();
    initModel();
    initControls();

    animate();

    window.addEventListener("resize", onWindowResize, false);
};

let initRender = (bId, bW, bH) => {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(bW, bH);
    //设置背景
    renderer.setClearColor(0x000000, 1.0);
    //设置设备像素比
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById(bId).appendChild(renderer.domElement);
};

let initScene = () => {
    scene = new THREE.Scene();
};

let initCamera = (bW, bH) => {
    camera = new THREE.PerspectiveCamera(45, bW / bH, 1, 2000);
    camera.position.y = 400;
};

let initBasicLight = () => {
    //添加环境光
    scene.add(new THREE.AmbientLight(0x404040));

    //添加平衡光
    basicLight = new THREE.DirectionalLight(0xffffff);
    basicLight.position.set(0, 1, 0);
    scene.add(basicLight);
};

let initModel = () => {
    var map = new THREE.TextureLoader().load("a.gif");
    var material = new THREE.MeshLambertMaterial({ map: map });

    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(100, 200, 100, 1, 1, 1),
        material
    );
    scene.add(cube);
};

let animate = () => {
    controls.update();
    render();
    requestAnimationFrame(animate);
};

let render = () => {
    var timer = Date.now() * 0.0001;

    camera.position.x = Math.cos(timer) * 800;
    camera.position.z = Math.sin(timer) * 800;

    camera.lookAt(scene.position);

    for (var i = 0, l = scene.children.length; i < l; i++) {
        var object = scene.children[i];

        object.rotation.x = timer * 5;
        object.rotation.y = timer * 2.5;
    }

    renderer.render(scene, camera);
};

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放

function initControls() {
    controls = new THREE.TrackballControls(camera);
    //旋转速度
    controls.rotateSpeed = 5;
    //变焦速度
    controls.zoomSpeed = 3;
    //平移速度
    controls.panSpeed = 0.8;
    //是否不变焦
    controls.noZoom = false;
    //是否不平移
    controls.noPan = false;
    //是否开启移动惯性
    controls.staticMoving = false;
    //动态阻尼系数 就是灵敏度
    controls.dynamicDampingFactor = 0.3;
    //未知，占时先保留
    //controls.keys = [ 65, 83, 68 ];
    controls.addEventListener("change", render);
}

//窗口变动触发的函数
let onWindowResize = (bW, bH) => {
    camera.aspect = bW / bH;
    camera.updateProjectionMatrix();
    controls.handleResize();
    render();

    renderer.setSize(bW, bH);
};

export default ThBox;