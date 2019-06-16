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
    var camera = new THREE.PerspectiveCamera(45, boxWidth / boxHeight, 0.1, 800);

    // 设置摄像机位置，并将其朝向场景中心
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // 创建一个 WebGL 渲染器，Three.js 还提供 <canvas>, <svg>, CSS3D 渲染器。
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    // 设置渲染器的清除颜色（即绘制下一帧前填充的颜色）和输出的 canvas 的尺寸
    renderer.setClearColor(0xffffff);
    renderer.setSize(boxWidth, boxHeight);

    // 将渲染器的输出（此处是 canvas 元素）插入到 body
    document.getElementById(boxId).appendChild(renderer.domElement);

    // 创建一个长宽高均为 4 个单位长度的立方体（几何体）
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

    // 创建材质
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });

    // 创建内部的立方体
    var innerBoxGeometry = new THREE.BoxGeometry(4, 4, 4);
    // 创建法向量材质，即该材质与当前面的法向量有关
    var innerBoxMaterial = new THREE.MeshNormalMaterial({
        // flat shading 的具体解释：http://blog.csdn.net/libing_zeng/article/details/60760296
        flatShading: THREE.FlatShading,
        side: THREE.DoubleSide // 或者 THREE.DoubleSide
    });

    var innerBox = new THREE.Mesh(innerBoxGeometry, innerBoxMaterial);

    innerBox.position.y = -2.9;

    scene.add(innerBox);

    // 创建一个长宽高为 10 的立方体
    var boxGeometry = new THREE.BoxGeometry(10, 10, 10);

    var materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }), // 右
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // 左
        new THREE.MeshBasicMaterial({ color: 0x0000ff }), // 上
        new THREE.MeshBasicMaterial({ color: 0x000000 }), // 下
        new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 1
        }), // 前
        new THREE.MeshBasicMaterial({
            color: 0xff0000 /* side: THREE.DoubleSide, */
        }) // 后
    ];

    for (let i = 0, len = materials.length; i < len; i++) {
        const material = materials[i];
        material.side = THREE.BackSide;
        material.needsUpdate = true;
    }

    // 当材质是一个数组时，集合的哪个面（由 Face3 组成）应用哪些子材质取是取决于其三角元 Face3 的 materialIndex 的值。
    let boxMesh = new THREE.Mesh(boxGeometry, materials);

    scene.add(boxMesh);

    // 设置渲染器对面的剔除模式：默认是剔除背面，只显示正面。
    // renderer.setFaceCulling ( cullFace, frontFace )
    // cullFace：剔除模式，有4种情况：剔除正面 THREE.CullFaceFront、剔除反面 THREE.CullFaceBack、均不剔除 THREE.CullFaceNone、剔除正反面 THREE.CullFaceFrontBack
    // frontFace：指定正面时顶点的顺序是逆序还是顺序，THREE.FrontFaceDirectionCW、THREE.FrontFaceDirectionCCW
    // setFaceCulling 已被舍弃 https://github.com/mrdoob/three.js/wiki/Migration-Guide#r89--r90
    // renderer.setFaceCulling(THREE.CullFaceFront, THREE.FrontFaceDirectionCCW)

    render();

    function render() {
        // 渲染，即摄像机拍下此刻的场景
        renderer.render(scene, camera);

        boxMesh.rotation.y += 0.01;
        innerBox.rotation.y -= 0.005;
        requestAnimationFrame(render);
    }
};
export default ThBox;