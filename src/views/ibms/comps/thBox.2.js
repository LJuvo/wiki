import * as THREE from "three";
import * as TWEEN from "tween";
let ThBox = () => {};

ThBox.prototype.init = (boxId, boxWidth, boxHeight) => {
    //创建场景
    var scene = new THREE.Scene();
    //创建摄像机
    var camera = new THREE.PerspectiveCamera(75, boxWidth / boxHeight, 0.1, 1000);
    camera.position.set(0, 0, 200);
    camera.lookAt(0, 0, 0);

    //创建渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(boxWidth, boxHeight);
    document.getElementById("threeBox").appendChild(renderer.domElement);

    var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-20, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 20, 0));
    geometry.vertices.push(new THREE.Vector3(20, 0, 0));

    var line = new THREE.Line(geometry, material);

    scene.add(line);

    //渲染场景
    animate();

    function animate() {
        requestAnimationFrame(animate);

        line.rotation.x += 0.01;
        // line.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
};
export default ThBox;