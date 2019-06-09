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

    scene.add(new THREE.AmbientLight(0x444444));

    let light = new THREE.PointLight(0xffffff);
    light.position.set(0, 50, 50);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    scene.add(light);

    var mesh;

    var loader = new THREE.STLLoader();
    loader.load("obj/pane.stl", function(geometry) {
        //创建纹理
        var material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.4,
            opacity: 0.6,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            map: generateSprite()
        });
        console.log(material);
        // //创建纹理
        // var mat = new THREE.MeshLambertMaterial({ color: 0x00ffff });
        // var mesh = new THREE.Mesh(geometry, mat);
        // // mesh.rotation.x = -0.5 * Math.PI; //将模型摆正
        // mesh.scale.set(4, 4, 4); //缩放
        // geometry.center(); //居中显示
        // scene.add(mesh);

        mesh = new THREE.Points(geometry, material);
        mesh.rotation.x = -0.5 * Math.PI; //将模型摆正
        // mesh.scale.set(0.1, 0.1, 0.1); //缩放
        // mesh.scale.set(4, 4, 4);
        geometry.center(); //居中显示
        scene.add(mesh);
    });

    //渲染场景
    animate();

    function animate() {
        requestAnimationFrame(animate);

        if (mesh) mesh.rotation.x += 0.01;
        if (mesh) mesh.rotation.y += 0.01;
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