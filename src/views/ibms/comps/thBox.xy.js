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
    renderer.render(scene, camera);
};

let initRender = (bId, bW, bH) => {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(bW, bH);
    document.getElementById(bId).appendChild(renderer.domElement);
    renderer.setClearColor(0xff0000, 1.0);
};

let initScene = () => {
    scene = new THREE.Scene();
};

let initCamera = (bW, bH) => {
    camera = new THREE.PerspectiveCamera(70, bW / bH, 1, 1000);
    camera.position.x = 0;
    camera.position.y = 900;
    camera.position.z = 0;

    camera.lookAt(new THREE.Vector3(0, 0, 0));
};

let initBasicLight = () => {
    basicLight = new THREE.DirectionalLight(0xff0000, 1.0, 0);
    basicLight.position.set(100, 100, 200);
    scene.add(basicLight);
};

//模型
function initModel() {
    //轴辅助 （每一个轴的长度）
    var object = new THREE.AxesHelper(500);
    scene.add(object);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
    geometry.vertices.push(new THREE.Vector3(500, 0, 0));

    for (var i = 0; i <= 20; i++) {
        var line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ color: randomColor(), opacity: 1 })
        );
        line.position.z = i * 50 - 500;
        scene.add(line);

        var line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ color: randomColor(), opacity: 1 })
        );
        line.position.x = i * 50 - 500;
        line.rotation.y = (90 * Math.PI) / 180;
        scene.add(line);
    }

    console.log(scene);
}

//生成随机颜色
function randomColor() {
    var arrHex = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f"
        ],
        strHex = "0x",
        index;
    for (var i = 0; i < 6; i++) {
        index = Math.round(Math.random() * 15);
        strHex += arrHex[index];
    }
    return eval(strHex);
}

export default ThBox;