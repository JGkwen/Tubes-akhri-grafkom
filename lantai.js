import * as THREE from "three";

export default class Lantai {
    constructor(scene) {
        let lantaiCol = new THREE.TextureLoader().load("./texture/lantai/Tiles078_1K-JPG_Color.jpg");
        let lantaiNorm = new THREE.TextureLoader().load("./texture/lantai/Tiles078_1K-JPG_NormalDX.jpg");
        let lantaiRough = new THREE.TextureLoader().load("./texture/lantai/Tiles078_1K-JPG_Roughness.jpg");

        let lantaiGeo = new THREE.BoxGeometry(65,1,65);
        let lantaiMat = new THREE.MeshStandardMaterial({
            map: lantaiCol,
            normalMap: lantaiNorm,
            roughnessMap: lantaiRough,
        });

        this.lantaiMesh = new THREE.Mesh(lantaiGeo, lantaiMat);
        this.lantaiMesh.receiveShadow = true;
        this.lantaiMesh.castShadow = true;
        this.lantaiMesh.position.set(0,-10,0);
        scene.add(this.lantaiMesh);
    }
}