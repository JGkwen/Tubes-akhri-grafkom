import * as THREE from "three";

export default class Lantai {
    constructor(scene) {
        let lantaiCol = new THREE.TextureLoader().load("./texture/lantai/Tiles078_1K-JPG_Color.jpg");
        let lantaiNorm = new THREE.TextureLoader().load("./texture/lantai/Tiles078_1K-JPG_NormalDX.jpg");
        let lantaiRough = new THREE.TextureLoader().load("./texture/lantai/Tiles078_1K-JPG_Roughness.jpg");

        let lantaiGeo = new THREE.PlaneGeometry(60,60);
        let lantaiMat = new THREE.MeshStandardMaterial({
            map: lantaiCol,
            normalMap: lantaiNorm,
            roughnessMap: lantaiRough,
            side: THREE.DoubleSide,
        });

        this.lantaiMesh = new THREE.Mesh(lantaiGeo, lantaiMat);
        this.lantaiMesh.rotation.x = -Math.PI / 2;
        this.lantaiMesh.receiveShadow = true;
        this.lantaiMesh.position.set(0,-10,0);
        scene.add(this.lantaiMesh);
    }
}