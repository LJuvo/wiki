import * as THREE from "three";
import * as TWEEN from "tween";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
// import STLLoader from "three-stl-loader";
import "../utils/STLLoader";
import OrbitControls from "three-orbitcontrols";
import "../utils/OnEvent";
let ThBox = () => {};
var curve;

ThBox.prototype.init = (boxId, boxWidth, boxHeight) => {
    // 创建一个场景
    var scene = new THREE.Scene();

    // 创建一个具有透视效果的摄像机
    var camera = new THREE.PerspectiveCamera(45, boxWidth / boxHeight, 0.1, 800);

    // 设置摄像机位置，并将其朝向场景中心
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 200;
    camera.lookAt(scene.position);

    // 创建一个 WebGL 渲染器，Three.js 还提供 <canvas>, <svg>, CSS3D 渲染器。
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    // 设置渲染器的清除颜色（即绘制下一帧前填充的颜色）和输出的 canvas 的尺寸
    renderer.setClearColor(0x000000);
    renderer.setSize(boxWidth, boxHeight);

    // 将渲染器的输出（此处是 canvas 元素）插入到 body
    document.getElementById(boxId).appendChild(renderer.domElement);

    // 初始化摄像机插件（用于拖拽旋转摄像机，产生交互效果）
    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = true;

    var spriteMaterial = new THREE.SpriteMaterial();
    // 循环创建多个 THREE.Sprite 对象，该对象始终面向摄像机
    for (var x = -5; x < 5; x++) {
        for (var y = -5; y < 5; y++) {
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(x * 10, y * 10, 0);
            sprite.on("click", function(m) {
                m.scale.set(2, 2, 2); // m指向mesh
            });
            // hover鼠标悬停监听
            sprite.on(
                "hover",
                function(m) {
                    // mouse enter the mesh
                    m.scale.set(2, 2, 2);
                },
                function(m) {
                    // mouse leave out the mesh
                    m.scale.set(1, 1, 1);
                }
            );

            // webvr gaze凝视监听
            sprite.on(
                "gaze",
                function(m) {
                    // mesh is gazed in
                    m.material.color = 0x00ddaa;
                },
                function(m) {
                    // mesh is gazed out
                    m.material.color = 0x00aadd;
                }
            );
            scene.add(sprite);
        }
    }
    new MTLLoader().load("obj/test.mtl", function(materials) {
        materials.preload();
        new OBJLoader().setMaterials(materials).load("obj/test.obj", function(obj) {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            scene.add(obj);
        });
    });

    render();

    function render() {
        // 渲染，即摄像机拍下此刻的场景
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
};
export default ThBox;