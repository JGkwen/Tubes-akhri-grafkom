import * as THREE from 'three';

export default function Plafon(scene) {
    const plafonGeometry = new THREE.BoxGeometry(60, 1, 60); // Ukuran plafon
    const plafonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const plafon = new THREE.Mesh(plafonGeometry, plafonMaterial);
    plafon.position.set(0, 10, 0); // Posisi plafon
    plafon.receiveShadow = true;
    scene.add(plafon);
}
