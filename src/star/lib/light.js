import * as THREE from "three";
export function initBasicLight(scene) {
    let ambientLight = new THREE.AmbientLight("#111111");
    scene.add(ambientLight);

    let pointLight = new THREE.PointLight("#ffffff");
    pointLight.position.set(15, 30, 10);
    pointLight.castShadow = true;

    scene.add(pointLight);
}

export function initAmbientLight() {
    return new THREE.AmbientLight("#111111");
}
export function initPointLight() {
    let pointLight = new THREE.PointLight("#ffffff");
    pointLight.position.set(15, 30, 10);
    pointLight.castShadow = true;
    return pointLight;
}