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
var ambientLight, spotLight;
let initBasicLight = () => {
    ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
};

//初始化dat.GUI简化试验流程
var controls;

function initGui() {}
var line;
let initModel = () => {
    //获取点的位置
    var points = gosper(3, 60);

    //实例化一个几何图形
    var geometry = new THREE.Geometry();
    var colors = []; //存放颜色的数组
    for (var i = 0, len = points.length; i < len; i++) {
        var e = points[i];
        //遍历将顶点的位置添加进入
        geometry.vertices.push(new THREE.Vector3(e.x, e.z, e.y));
        //设置生成相应的颜色
        colors[i] = new THREE.Color(0xffffff);
        colors[i].setHSL(e.x / 100 + 0.5, (e.y * 20) / 300, 0.8);
    }

    //设置几何图形每个点的颜色
    geometry.colors = colors;

    // //定义直线纹理
    // var material = new THREE.LineBasicMaterial({
    //     opacity: 1.0, //设置透明度
    //     linewidth: 1, //设置线的宽度
    //     vertexColors: THREE.VertexColors //设置这个可以给每个顶点指定一种颜色
    // });

    //定义直线纹理
    geometry.computeLineDistances();
    var material = new THREE.LineDashedMaterial({
        vertexColors: true,
        color: 0xffffff,
        dashSize: 2,
        gapSize: 2,
        scale: 5
    });

    //生成网格
    line = new THREE.Line(geometry, material);
    //设置位置
    line.position.set(0, 0, -60);
    scene.add(line);
};

//高斯帕曲线生成函数gosper(密度, 大小)，也被称为flowsnake（一首音误的雪花），是一种空间填充曲线。它是一个与龙曲线和希尔伯特曲线相似的分形物体。
function gosper(a, b) {
    var turtle = [0, 0, 0];
    var points = [];
    var count = 0;

    rg(a, b, turtle);

    return points;

    function rt(x) {
        turtle[2] += x;
    }

    function lt(x) {
        turtle[2] -= x;
    }

    function fd(dist) {
        //                ctx.beginPath();
        points.push({ x: turtle[0], y: turtle[1], z: Math.sin(count) * 5 });
        //                ctx.moveTo(turtle[0], turtle[1]);

        var dir = turtle[2] * (Math.PI / 180);
        turtle[0] += Math.cos(dir) * dist;
        turtle[1] += Math.sin(dir) * dist;

        points.push({ x: turtle[0], y: turtle[1], z: Math.sin(count) * 5 });
        //                ctx.lineTo(turtle[0], turtle[1]);
        //                ctx.stroke();
    }

    function rg(st, ln, turtle) {
        st--;
        ln = ln / 2.6457;
        if (st > 0) {
            //                    ctx.strokeStyle = '#111';
            rg(st, ln, turtle);
            rt(60);
            gl(st, ln, turtle);
            rt(120);
            gl(st, ln, turtle);
            lt(60);
            rg(st, ln, turtle);
            lt(120);
            rg(st, ln, turtle);
            rg(st, ln, turtle);
            lt(60);
            gl(st, ln, turtle);
            rt(60);
        }
        if (st == 0) {
            fd(ln);
            rt(60);
            fd(ln);
            rt(120);
            fd(ln);
            lt(60);
            fd(ln);
            lt(120);
            fd(ln);
            fd(ln);
            lt(60);
            fd(ln);
            rt(60);
        }
    }

    function gl(st, ln, turtle) {
        st--;
        ln = ln / 2.6457;
        if (st > 0) {
            //                    ctx.strokeStyle = '#555';
            lt(60);
            rg(st, ln, turtle);
            rt(60);
            gl(st, ln, turtle);
            gl(st, ln, turtle);
            rt(120);
            gl(st, ln, turtle);
            rt(60);
            rg(st, ln, turtle);
            lt(120);
            rg(st, ln, turtle);
            lt(60);
            gl(st, ln, turtle);
        }
        if (st == 0) {
            lt(60);
            fd(ln);
            rt(60);
            fd(ln);
            fd(ln);
            rt(120);
            fd(ln);
            rt(60);
            fd(ln);
            lt(120);
            fd(ln);
            lt(60);
            fd(ln);
        }
    }
}

let animate = () => {
    render();

    requestAnimationFrame(animate);
};
var step = 0;
let render = () => {
    //设置模型动画
    line.rotation.z = step += 0.01;
    line.rotation.y = step += 0.01;

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