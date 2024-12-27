import * as THREE from 'three';

export default function Lampu(scene) {
    // Membuat lampu sebagai objek fisik (bulat)
    const lampGeometry = new THREE.SphereGeometry(1, 32, 32); // Ukuran lampu
    const lampMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffff00, 
        emissive: 0xffff33 
    });
    const lamp = new THREE.Mesh(lampGeometry, lampMaterial);
    lamp.position.set(0, 10.3, 0); // Posisi lampu di tengah plafon
    lamp.castShadow = false;
    scene.add(lamp);

    // Menambahkan Point Light sebagai sumber cahaya utama
    const lampLight = new THREE.PointLight(0xffffff, 2, 50); // Intensitas 2, radius 50
    lampLight.position.set(0, 10.5, 0); // Cahaya berada di posisi yang sama dengan lampu
    lampLight.castShadow = true; // Cahaya memproyeksikan bayangan
    lampLight.shadow.mapSize.width = 1024; // Resolusi bayangan
    lampLight.shadow.mapSize.height = 1024; 
    lampLight.shadow.camera.near = 0.5;
    lampLight.shadow.camera.far = 50;

    scene.add(lampLight);
}