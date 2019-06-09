import * as THREE from "three";
import * as TWEEN from "tween";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
// import STLLoader from "three-stl-loader";
import "../utils/STLLoader";
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

    scene.add(new THREE.AmbientLight(0x444444));

    let lightsa = new THREE.PointLight(0xffffff);
    lightsa.position.set(100, 250, 250);

    //告诉平行光需要开启阴影投射
    lightsa.castShadow = true;

    scene.add(lightsa);
    //创建一个平行光光源照射到物体上
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    //设置平型光照射方向，照射方向为设置的点照射到原点
    light.position.set(0, 0, 1);
    //将灯光放到场景当中
    scene.add(light);

    //创建一个接受光照并带有纹理映射的立方体，并添加到场景中
    //首先，获取到纹理
    var map = THREE.ImageUtils.loadTexture("a.gif");

    //然后创建一个phong材质来处理着色，并传递给纹理映射
    var material = new THREE.MeshPhongMaterial({ map: map });

    //创建一个立方体的几何体
    var geometry = new THREE.CubeGeometry(100, 100, 100);

    //将集合体和材质放到一个网格中
    var cube = new THREE.Mesh(geometry, material);

    //将立方体网格添加到场景中
    scene.add(cube);

    // // 有材质
    // new MTLLoader().load("obj/testFloor.mtl", function(materials) {
    //     materials.preload();
    //     new OBJLoader()
    //         // .setMaterials(materials)
    //         .load("obj/testFloor.obj", function(obj) {
    //             obj.scale.set(0.8, 0.8, 0.8);
    //             obj.position.set(-40, -50, 10);

    //             if (obj.name.indexOf("no")) {
    //                 //每个储位单独赋予一个基础材质
    //                 obj.material = new THREE.MeshBasicMaterial({ color: 0x444444 });
    //                 obj.material.transparent = true;
    //                 obj.material.opacity = 0.7;
    //                 // obj.material.map = texture;
    //             } else {
    //                 //随机当前模型的颜色
    //                 object.material.color = new THREE.Color(scale(Math.random()).hex());
    //             }

    //             scene.add(obj);
    //         });
    // });

    //渲染场景
    animate();

    function animate() {
        requestAnimationFrame(animate);

        // if (mesh) mesh.rotation.x += 0.01;
        // if (mesh) mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    //使用canvas生成粒子的纹理
    function generateSprite() {
        var canvas = document.createElement("canvas");
        canvas.width = 16;
        canvas.height = 16;

        var context = canvas.getContext("2d");
        var gradient = context.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
        );
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.2, "rgba(0,255,255,1)");
        gradient.addColorStop(0.4, "rgba(0,0,64,1)");
        gradient.addColorStop(1, "rgba(0,0,0,1)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
};
export default ThBox;