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
    document.getElementById("threeBox").appendChild(renderer.domElement);

    //创建正方体
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);

    //场景添加正方体
    scene.add(cube);

    camera.position.z = 5;

    //全局光
    var light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);
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

    //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义

    document.addEventListener("mouseup", onMouseUp, false);
    //渲染场景
    animate();

    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }

    function onMouseUp(e) {
        let mouse = {};
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        //新建一个三维单位向量 假设z方向就是0.5
        //根据照相机，把这个向量转换到视点坐标系
        var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);

        //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
        var raycaster = new THREE.Raycaster(
            camera.position,
            vector.sub(camera.position).normalize()
        );

        //射线和模型求交，选中一系列直线
        var intersects = raycaster.intersectObjects(objects);
        console.log("imtersrcts=" + intersects);

        if (intersects.length > 0) {
            //选中第一个射线相交的物体
            SELECTED = intersects[0].object;
            var intersected = intersects[0].object;
            console.log(intersects[0].object);
        }
    }
};
export default ThBox;