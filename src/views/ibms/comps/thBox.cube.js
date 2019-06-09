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
    camera = new THREE.PerspectiveCamera(45, bW / bH, 1, 2000);
    camera.position.set(0, 40, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
};

let initBasicLight = () => {
    //添加环境光
    scene.add(new THREE.AmbientLight(0x404040));

    //添加平衡光
    basicLight = new THREE.DirectionalLight(0xffffff);

    basicLight.position.set(15, 30, 10);

    //告诉平行光需要开启阴影投射
    basicLight.castShadow = true;
    scene.add(basicLight);
};

//初始化dat.GUI简化试验流程
var gui;

function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
        lightY: 30, //灯光y轴的位置
        cubeX: 25, //立方体的x轴位置
        cubeY: 10, //立方体的x轴位置
        cubeZ: -5 //立方体的z轴的位置
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    datGui.add(gui, "lightY", 0, 100);
    datGui.add(gui, "cubeX", -30, 30);
    datGui.add(gui, "cubeY", -30, 30);
    datGui.add(gui, "cubeZ", -30, 30);
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
    var cubeGeometry = new THREE.Geometry();

    //创建立方体的顶点
    var vertices = [
        new THREE.Vector3(10, 10, 10), //v0
        new THREE.Vector3(-10, 10, 10), //v1
        new THREE.Vector3(-10, -10, 10), //v2
        new THREE.Vector3(10, -10, 10), //v3
        new THREE.Vector3(10, -10, -10), //v4
        new THREE.Vector3(10, 10, -10), //v5
        new THREE.Vector3(-10, 10, -10), //v6
        new THREE.Vector3(-10, -10, -10) //v7
    ];

    cubeGeometry.vertices = vertices;

    //创建立方的面
    var faces = [
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(0, 2, 3),
        new THREE.Face3(0, 3, 4),
        new THREE.Face3(0, 4, 5),
        new THREE.Face3(1, 6, 7),
        new THREE.Face3(1, 7, 2),
        new THREE.Face3(6, 5, 4),
        new THREE.Face3(6, 4, 7),
        new THREE.Face3(5, 6, 1),
        new THREE.Face3(5, 1, 0),
        new THREE.Face3(3, 2, 7),
        new THREE.Face3(3, 7, 4)
    ];

    cubeGeometry.faces = faces;

    //生成法向量
    cubeGeometry.computeFaceNormals();

    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 25;
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
    basicLight.position.y = gui.lightY;
    cube.position.x = gui.cubeX;
    cube.position.y = gui.cubeY;
    cube.position.z = gui.cubeZ;

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