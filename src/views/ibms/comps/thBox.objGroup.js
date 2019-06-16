import * as THREE from "three";
import * as TWEEN from "tween";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
// import STLLoader from "three-stl-loader";
import "../utils/STLLoader";
import OrbitControls from "three-orbitcontrols";
let ThBox = () => {};
var curve;

ThBox.prototype.init = (boxId, boxWidth, boxHeight) => {
    // 创建一个场景
    var scene = new THREE.Scene();

    // 创建一个具有透视效果的摄像机
    var camera = new THREE.PerspectiveCamera(45, boxWidth / boxHeight, 5, 800);

    // 设置摄像机位置，并将其朝向场景中心
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;
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

    var points;

    // 创建模型加载器
    var loader = new THREE.OBJLoader();
    loader.load("obj/test.obj", function(loadedMesh) {
        var material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.4,
            // 使用 opacity 的前提是开启 transparent
            opacity: 0.6,
            transparent: true,
            // 设置元素与背景的融合模式
            blending: THREE.AdditiveBlending,
            // 指定粒子的纹理
            map: generateSprite(),
            // 用于去除纹理的黑色背景，关于 depthTest 和 depthWrite 的详细解释，请查看https://stackoverflow.com/questions/37647853/three-js-depthwrite-vs-depthtest-for-transparent-canvas-texture-map-on-three-p
            depthTest: false
        });
        loadedMesh.children.forEach(function(child) {
            points = new THREE.Points(child.geometry, material);
            points.position.y = -2;
            scene.add(points);
        });
    });

    // 生成纹理
    function generateSprite() {
        var canvas = document.createElement("canvas");
        canvas.boxWidth = 16;
        canvas.boxHeight = 16;

        var context = canvas.getContext("2d");
        var gradient = context.createRadialGradient(
            canvas.boxWidth / 2,
            canvas.boxHeight / 2,
            0,
            canvas.boxWidth / 2,
            canvas.boxHeight / 2,
            canvas.boxWidth / 2
        );
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.2, "rgba(0,255,255,1)");
        gradient.addColorStop(0.4, "rgba(0,0,64,1)");
        gradient.addColorStop(1, "rgba(0,0,0,1)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.boxWidth, canvas.boxHeight);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    render();

    function render() {
        // 渲染，即摄像机拍下此刻的场景
        renderer.render(scene, camera);

        if (points) {
            points.rotation.y += 0.005;
        }
        requestAnimationFrame(render);
    }
};
export default ThBox;