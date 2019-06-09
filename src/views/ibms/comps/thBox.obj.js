import * as THREE from "three";
import * as TWEEN from "tween";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";
let ThBox = () => {};

ThBox.prototype.init = (boxId, boxWidth, boxHeight) => {
    //创建场景
    var scene = new THREE.Scene();
    //创建摄像机
    var camera = new THREE.PerspectiveCamera(75, boxWidth / boxHeight, 0.1, 1000);
    camera.position.set(-200, 200, 0);
    camera.lookAt(0, 0, 0);
    var controls = new OrbitControls(camera);
    controls.target.set(0, 0, 0); // 设置控制器的焦点，使控制器围绕这个焦点进行旋转
    controls.minDistance = 80; // 设置移动的最短距离（默认为零）
    controls.maxDistance = 400; // 设置移动的最长距离（默认为无穷）
    controls.maxPolarAngle = Math.PI / 3; //绕垂直轨道的距离（范围是0-Math.PI,默认为Math.PI）
    controls.update(); // 照相机转动时，必须更新该控制器

    //创建渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(boxWidth, boxHeight);
    document.getElementById("threeBox").appendChild(renderer.domElement);

    //添加灯光
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(300, -300, -50);
    spotLight.castShadow = true;
    scene.add(spotLight);

    //添加灯光
    var spotLights = new THREE.SpotLight(0xffffff);
    spotLights.position.set(-300, 300, 50);
    spotLights.castShadow = true;
    scene.add(spotLights);

    // camera.position.z = 5;

    let mtlLoader = new MTLLoader();

    let objLoader = new OBJLoader();

    // 没有材质
    // objLoader.load("obj/model.obj", function(obj) {
    //     obj.scale.set(10, 10, 10);
    //     obj.position.set(-10, 0, 0);
    //     obj.children.forEach(function(e) {
    //         e.castShadow = true;
    //     }); // 设置阴影
    //     scene.add(obj);
    // });

    // 有材质
    new MTLLoader().load("obj/test.mtl", function(materials) {
        materials.preload();
        new OBJLoader().setMaterials(materials).load("obj/test.obj", function(obj) {
            obj.scale.set(0.8, 0.8, 0.8);
            obj.position.set(-40, -50, 10);
            scene.add(obj);
        });
    });

    //渲染场景
    animate();

    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }
};
export default ThBox;