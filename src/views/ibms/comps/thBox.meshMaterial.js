import * as THREE from "three";
import dat from "dat.gui";
import "../utils/OrbitControls";
let ThBox = () => {};
let renderer, scene, camera, basicLight;

ThBox.prototype.init = (boxId, boxWidth, boxHeight) => {
    initRender(boxId, boxWidth, boxHeight);
    initCamera(boxWidth, boxHeight);
    initScene();
    initBasicLight();
    initModel();
    initGui();
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
var ambientLight, directionalLight;
let initBasicLight = () => {
    ambientLight = new THREE.AmbientLight("#111111");
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight("#ffffff");
    directionalLight.position.set(-40, 60, -10);

    directionalLight.shadow.camera.near = 20; //产生阴影的最近距离
    directionalLight.shadow.camera.far = 200; //产生阴影的最远距离
    directionalLight.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
    directionalLight.shadow.camera.right = 50; //最右边
    directionalLight.shadow.camera.top = 50; //最上边
    directionalLight.shadow.camera.bottom = -50; //最下面

    //这两个值决定使用多少像素生成阴影 默认512
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.mapSize.width = 1024;

    //告诉平行光需要开启阴影投射
    directionalLight.castShadow = true;

    scene.add(directionalLight);
};

//初始化dat.GUI简化试验流程
var controls;

function initGui() {
    //声明一个保存需求修改的相关数据的对象
    controls = {
        rotationSpeed: 0.02,
        bouncingSpeed: 0.03,

        opacity: meshMaterial.opacity,
        transparent: meshMaterial.transparent,
        overdraw: meshMaterial.overdraw,
        visible: meshMaterial.visible,
        side: "front",

        color: meshMaterial.color.getStyle(),
        wireframe: meshMaterial.wireframe,
        wireframeLinewidth: meshMaterial.wireframeLinewidth,
        wireFrameLineJoin: meshMaterial.wireframeLinejoin
    };

    var gui = new dat.GUI();

    var spGui = gui.addFolder("Mesh");
    spGui.add(controls, "opacity", 0, 1).onChange(function(e) {
        meshMaterial.opacity = e;
    });
    spGui.add(controls, "transparent").onChange(function(e) {
        meshMaterial.transparent = e;
    });
    spGui.add(controls, "wireframe").onChange(function(e) {
        meshMaterial.wireframe = e;
    });
    spGui.add(controls, "wireframeLinewidth", 0, 20).onChange(function(e) {
        meshMaterial.wireframeLinewidth = e;
    });
    spGui.add(controls, "visible").onChange(function(e) {
        meshMaterial.visible = e;
    });
    spGui
        .add(controls, "side", ["front", "back", "double"])
        .onChange(function(e) {
            console.log(e);
            switch (e) {
                case "front":
                    meshMaterial.side = THREE.FrontSide;
                    break;
                case "back":
                    meshMaterial.side = THREE.BackSide;
                    break;
                case "double":
                    meshMaterial.side = THREE.DoubleSide;
                    break;
            }
            meshMaterial.needsUpdate = true;
            console.log(meshMaterial);
        });
    spGui.addColor(controls, "color").onChange(function(e) {
        meshMaterial.color.setStyle(e);
    });

    spGui.open();
}
var cube, plane, meshMaterial;
let initModel = () => {
    //辅助工具
    var helper = new THREE.AxisHelper(10);
    scene.add(helper);

    //球体
    var sphereGeometry = new THREE.SphereGeometry(10, 30, 30);
    meshMaterial = new THREE.MeshBasicMaterial({ color: 0xaaafff });
    var sphere = new THREE.Mesh(sphereGeometry, meshMaterial);
    sphere.position.set(-20, 20, 0);

    sphere.castShadow = true;

    scene.add(sphere);

    //立方体
    var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);

    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 30;
    cube.position.y = 5;
    cube.position.z = -5;

    //告诉立方体需要投射阴影
    cube.castShadow = true;

    scene.add(cube);

    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(5000, 5000, 20, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });

    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0;

    //告诉底部平面需要接收阴影
    plane.receiveShadow = true;

    scene.add(plane);
};

let animate = () => {
    render();

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