import * as THREE from 'three';

export default function Plafon(scene) {
    const plafonCol = new THREE.TextureLoader().load("./texture/tembok/Plaster002_1K-JPG_Color.jpg");
    const plafonNorm = new THREE.TextureLoader().load("./texture/tembok/Plaster002_1K-JPG_NormalDX.jpg");
    const plafonRough = new THREE.TextureLoader().load("./texture/tembok/Plaster002_1K-JPG_Roughness.jpg");
    const plafonGeometry = new THREE.BoxGeometry(60, 1, 60); // Ukuran plafon
    const plafonMaterial = new THREE.MeshStandardMaterial({ 
        map: plafonCol,
        // normalMap: plafonNorm,
        // roughnessMap: plafonRough,
    });
    const plafon = new THREE.Mesh(plafonGeometry, plafonMaterial);
    plafon.position.set(0, 10, 0); // Posisi plafon
    plafon.receiveShadow = true;
    scene.add(plafon);
}
