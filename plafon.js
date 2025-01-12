import * as THREE from 'three';

export default function Plafon(scene) {
    const plafonCol = new THREE.TextureLoader().load("./texture/tembok/Plaster002_1K-JPG_Color.jpg");
    const plafonNorm = new THREE.TextureLoader().load("./texture/tembok/Plaster002_1K-JPG_NormalDX.jpg");
    const plafonRough = new THREE.TextureLoader().load("./texture/tembok/Plaster002_1K-JPG_Roughness.jpg");
    const plafonGeometry = new THREE.BoxGeometry(65, 1, 65); 
    const plafonMaterial = new THREE.MeshStandardMaterial({ 
        map: plafonCol,
    });
    const plafon = new THREE.Mesh(plafonGeometry, plafonMaterial);
    plafon.position.set(0, 10, 0); 
    plafon.receiveShadow = true;
    plafon.castShadow = true;
    scene.add(plafon);
}
