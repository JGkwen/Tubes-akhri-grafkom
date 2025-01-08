import * as THREE from 'three';

export default function Lampu(scene) {
    const lampGeometry = new THREE.SphereGeometry(1, 32, 32); 
    const RingGeometry = new THREE.TorusGeometry(0.36); 
    const lampMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        emissive: 0xffffff 
    });
    const ringMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        emissive: 0x000000,
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(RingGeometry, ringMaterial);
    const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
    lamp.position.set(0, 10.3, 0); 
    ring.position.set(0, 9.8, 0);
    ring.rotation.x = -Math.PI / 2;
    lamp.castShadow = false;
    scene.add(lamp);
    scene.add(ring);

    // Menambahkan Point Light 
    const lampLight = new THREE.PointLight(0xffffff, 2, 50); 
    lampLight.position.set(0, 10.5, 0); 
    lampLight.castShadow = true; 
    lampLight.shadow.mapSize.width = 1024; 
    lampLight.shadow.mapSize.height = 1024; 
    lampLight.shadow.camera.near = 0.5;
    lampLight.shadow.camera.far = 50;

    scene.add(lampLight);
}
