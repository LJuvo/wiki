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
var settings;

function initGui() {
    //声明一个保存需求修改的相关数据的对象
    settings = {
        positionX: 0,
        positionY: 5,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        translate: function() {
            //cube.translate(settings.translateX,settings.translateY,settings.translateZ);
            cube.translateX(settings.translateX);
            cube.translateY(settings.translateY);
            cube.translateZ(settings.translateZ);

            settings.positionX = cube.position.x;
            settings.positionY = cube.position.y;
            settings.positionZ = cube.position.z;
        },
        visible: true
    };

    //初始化gui
    var gui = new dat.GUI();

    var position = gui.addFolder("position");
    position.add(settings, "positionX", -30, 30).listen();
    position.add(settings, "positionY", -30, 30).listen();
    position.add(settings, "positionZ", -30, 30).listen();
    var scale = gui.addFolder("scale");
    scale.add(settings, "scaleX", 0.01, 5);
    scale.add(settings, "scaleY", 0.01, 5);
    scale.add(settings, "scaleZ", 0.01, 5);
    var rotation = gui.addFolder("rotation");
    rotation.add(settings, "rotationX", -2 * Math.PI, 2 * Math.PI);
    rotation.add(settings, "rotationY", -2 * Math.PI, 2 * Math.PI);
    rotation.add(settings, "rotationZ", -2 * Math.PI, 2 * Math.PI);
    var translate = gui.addFolder("translate");
    translate.add(settings, "translateX", -5, 5);
    translate.add(settings, "translateY", -5, 5);
    translate.add(settings, "translateZ", -5, 5);
    translate.add(settings, "translate");
    gui.add(settings, "visible");
}
var cube;
let initModel = () => {
    //辅助工具
    var helper = new THREE.AxisHelper(10);
    scene.add(helper);

    //立方体
    var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    //告诉立方体需要投射阴影
    cube.castShadow = true;

    scene.add(cube);

    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

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
    cube.position.set(settings.positionX, settings.positionY, settings.positionZ);
    cube.scale.set(settings.scaleX, settings.scaleY, settings.scaleZ);
    cube.rotation.set(settings.rotationX, settings.rotationY, settings.rotationZ);
    cube.visible = settings.visible;

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