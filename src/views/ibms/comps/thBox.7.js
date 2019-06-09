import * as THREE from "three";
import * as TWEEN from "tween";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
// import STLLoader from "three-stl-loader";
import "../utils/STLLoader";
import OrbitControls from "three-orbitcontrols";
let ThBox = () => {};
let renderer, scene, camera, basicLight;

ThBox.prototype.init = (boxId, boxWidth, boxHeight) => {
    initRender(boxId, boxWidth, boxHeight);
    initCamera(boxWidth, boxHeight);
    initScene();
    initBasicLight();
    initModel();

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

//模型
function initModel() {
    //通过加载图片生成一个纹理
    var map = new THREE.TextureLoader().load("a.gif");
    //定义纹理在水平和垂直方向简单的重复到无穷大。
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    //定义纹理的各向异性
    map.anisotropy = 16;

    //定义兰伯特网孔材质
    var material = new THREE.MeshLambertMaterial({
        map: map,
        side: THREE.DoubleSide
    });

    //球形网格 （半径长度，水平块的密度，垂直块的密度）
    var object = new THREE.Mesh(new THREE.SphereGeometry(75, 20, 10), material);
    object.position.set(-400, 0, 200);
    scene.add(object);

    //二十面体 （图形大小半径，大于零将不是二十面体，越大越圆滑）
    object = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 0), material);
    object.position.set(-200, 0, 200);
    scene.add(object);

    //八面体（图形大小半径，大于零将不是八面体，越大越圆滑）
    object = new THREE.Mesh(new THREE.OctahedronGeometry(75, 0), material);
    object.position.set(0, 0, 200);
    scene.add(object);

    //四面体（图形大小半径，大于零将不是四面体，越大越圆滑）
    object = new THREE.Mesh(new THREE.TetrahedronGeometry(75, 0), material);
    object.position.set(200, 0, 200);
    scene.add(object);

    //长方形平面 （x轴宽度，y轴高度，x方向分段数，y方向分段数）
    object = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), material);
    object.position.set(-400, 0, 0);
    scene.add(object);

    //立方体 （x轴宽度，y轴高度，z轴深度，沿宽面分段数，沿高度面分段数，沿深度面分段数）
    object = new THREE.Mesh(
        new THREE.BoxGeometry(100, 100, 100, 1, 1, 1),
        material
    );
    object.position.set(-200, 0, 0);
    scene.add(object);

    //圆形平面 （半径，顶点密度，绘制起点弧度，绘制弧度）
    object = new THREE.Mesh(
        new THREE.CircleGeometry(50, 20, 0, Math.PI * 2),
        material
    );
    object.position.set(0, 0, 0);
    scene.add(object);

    //空心圆平面 （内圆半径，外圆半径，分割面越大越圆滑，垂直外边分割面，开始绘制弧度，绘制弧度）
    object = new THREE.Mesh(
        new THREE.RingGeometry(10, 50, 10, 5, 0, Math.PI * 2),
        material
    );
    object.position.set(200, 0, 0);
    scene.add(object);

    //圆柱体 （头部圆的半径，底部圆半径，高度，上下圆顶点个数，上下面切割线条数，上下面是否显示，开始弧度，绘制弧度）
    object = new THREE.Mesh(
        new THREE.CylinderGeometry(25, 75, 100, 40, 5),
        material
    );
    object.position.set(400, 0, 0);
    scene.add(object);

    //车床模型
    var points = [];

    for (var i = 0; i < 50; i++) {
        points.push(
            new THREE.Vector2(
                Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50,
                (i - 5) * 2
            )
        );
    }

    //（一个vector2的数组分别代表xy轴，生成圆周段的数目，开始弧度，绘制弧度）
    object = new THREE.Mesh(new THREE.LatheGeometry(points, 20), material);
    object.position.set(-400, 0, -200);
    scene.add(object);

    //救生圈 （救生圈半径，管道直径，基于管道横切顶点数，救生圈横切顶点个数）
    object = new THREE.Mesh(new THREE.TorusGeometry(50, 20, 20, 20), material);
    object.position.set(-200, 0, -200);
    scene.add(object);

    //环面扭结模型 （图形半径，管道直径，基于管道横切定点数，根据图形半径横切顶点数，绕旋转对称轴的圈数，绕环面的圆的圈数）
    object = new THREE.Mesh(
        new THREE.TorusKnotGeometry(50, 10, 50, 20),
        material
    );
    object.position.set(0, 0, -200);
    scene.add(object);

    //轴辅助 （每一个轴的长度）
    object = new THREE.AxesHelper(50);
    object.position.set(200, 0, -200);
    scene.add(object);

    //箭头辅助（箭头头的方向必须是vecteor3，箭头起点必须是vector3，箭头长度，颜色）
    object = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 0),
        50,
        0x00ffff
    );
    object.position.set(400, 0, -200);
    scene.add(object);
}

let animate = () => {
    requestAnimationFrame(animate);

    render();
    //stats.update();
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

//窗口变动触发的函数
let onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};

export default ThBox;