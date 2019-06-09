import * as THREE from "three";
import * as TWEEN from "tween";
let ThBox = () => {};

ThBox.prototype.init = (boxWidth, boxHeight) => {
    //创建场景
    var scene = new THREE.Scene();
    //创建摄像机
    var camera = new THREE.PerspectiveCamera(75, boxWidth / boxHeight, 0.1, 1000);

    //创建渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(boxWidth, boxHeight);
    document.getElementById("threeBox").appendChild(renderer.domElement);

    //创建正方体
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);

    //场景添加正方体
    scene.add(cube);

    camera.position.z = 5;

    //渲染场景
    animate();

    function animate() {
        requestAnimationFrame(animate);

        //正方体旋转
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
};
export default ThBox;