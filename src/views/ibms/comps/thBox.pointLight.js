import * as THREE from "three";
import dat from "dat.gui";
import "../utils/OrbitControls";
let ThBox = () => {};
let renderer, scene, camera, basicLight, controls;

ThBox.prototype.init = (boxId, boxWidth, boxHeight) => {
    initGui();
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
    //告诉渲染器需要阴影效果
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

    document.getElementById(bId).appendChild(renderer.domElement);
};

let initScene = () => {
    scene = new THREE.Scene();
};

let initCamera = (bW, bH) => {
    camera = new THREE.PerspectiveCamera(45, bW / bH, 1, 1000);
    camera.position.set(0, 40, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
};
var ambientLight, pointLight;
let initBasicLight = () => {
    ambientLight = new THREE.AmbientLight("#111111");
    scene.add(ambientLight);

    pointLight = new THREE.PointLight("#ffffff");
    pointLight.position.set(15, 30, 10);

    //告诉平行光需要开启阴影投射
    pointLight.castShadow = true;

    scene.add(pointLight);
};

//初始化dat.GUI简化试验流程
var gui;

function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
        ambientLight: "#111111", //环境光源
        pointLight: "#ffffff", //点光源
        lightY: 30, //灯光y轴的位置
        distance: 0, //点光源距离
        intensity: 1, //灯光强度
        visible: true //是否可见
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    datGui.addColor(gui, "ambientLight").onChange(function(e) {
        ambientLight.color = new THREE.Color(e);
    });
    datGui.addColor(gui, "pointLight").onChange(function(e) {
        pointLight.color = new THREE.Color(e);
    });
    datGui.add(gui, "lightY", 0, 100);
    datGui.add(gui, "distance", 0, 100).onChange(function(e) {
        pointLight.distance = e;
    });
    datGui.add(gui, "intensity", 0, 5).onChange(function(e) {
        pointLight.intensity = e;
    });
    datGui.add(gui, "visible").onChange(function(e) {
        pointLight.visible = e;
    });
}
var cube;
let initModel = () => {
    //辅助工具
    var helper = new THREE.AxisHelper(10);
    scene.add(helper);

    // 创建一个立方体
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3

    //立方体
    var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);

    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 5;
    cube.position.y = 5;
    cube.position.z = -5;

    //告诉立方体需要投射阴影
    cube.castShadow = true;

    scene.add(cube);

    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0;

    //告诉底部平面需要接收阴影
    plane.receiveShadow = true;

    scene.add(plane);
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

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放

function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = true;
    //设置相机距离原点的最远距离
    controls.minDistance = 100;
    //设置相机距离原点的最远距离
    controls.maxDistance = 200;
    //是否开启右键拖拽
    controls.enablePan = false;
}

//窗口变动触发的函数
let onWindowResize = (bW, bH) => {
    camera.aspect = bW / bH;
    camera.updateProjectionMatrix();
    render();

    renderer.setSize(bW, bH);
};

export default ThBox;