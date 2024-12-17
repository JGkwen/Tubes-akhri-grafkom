import * as THREE from "three";

export default class Desk {
    constructor(scene) {
        this.scene = scene;

        // Load Tekstur
        let textureLoader = new THREE.TextureLoader();
        this.deskCol = textureLoader.load("./texture/desk/Wood069_1K-JPG_Color.jpg");
        this.deskNorm = textureLoader.load("./texture/desk/Wood069_1K-JPG_NormalDX.jpg");
        this.deskRough = textureLoader.load("./texture/desk/Wood069_1K-JPG_Roughness.jpg");

        // Penempatan desk parts
        this.papanFlat(0,-7.75,-10);
        this.papanFlat(0,-2.75,-10);
        this.papanSide(-14.75,-5.25,-10);
        this.papanSide(-8,-5.25,-10);
        this.papanFlatIn(0,-5.25,-9.75);
        this.papanSide(8,-5.25,-10);
        this.papanSide(14.75,-5.25,-10);
        this.papanBack(0,-5.25,-14.75);
        // Kaki Desk
        // Depan kiri
        this.kaki(-13,-9,-6);
        // Depan kanan
        this.kaki(13,-9,-6);
        // Belakang kiri
        this.kaki(-13,-9,-14);
        // Belakang kanan
        this.kaki(13,-9,-14);
    }

    // Membuat material
    buatMat() {
        return new THREE.MeshStandardMaterial({
            map: this.deskCol,
            normalMap: this.deskNorm,
            roughnessMap: this.deskRough,
            side: THREE.DoubleSide,
        })
    }

    // Papan atas bawah
    papanFlat(x,y,z) {
        let deskGeo = new THREE.BoxGeometry(30,0.5,10);
        let deskMat = this.buatMat();
        let deskMesh = new THREE.Mesh(deskGeo, deskMat);
        deskMesh.receiveShadow = true;
        deskMesh.castShadow = true;
        deskMesh.position.set(x,y,z);
        this.scene.add(deskMesh);
    }

    // Papan dalam
    papanFlatIn(x,y,z) {
        let deskGeo = new THREE.BoxGeometry(15.5,0.5,9.5);
        let deskMat = this.buatMat();
        let deskMesh = new THREE.Mesh(deskGeo, deskMat);
        deskMesh.receiveShadow = true;
        deskMesh.castShadow = true;
        deskMesh.position.set(x,y,z);
        this.scene.add(deskMesh);
    }

    // Papan sides
    papanSide(x,y,z) {
        let deskGeo = new THREE.BoxGeometry(0.5,4.5,10);
        let deskMat = this.buatMat();
        let deskMesh = new THREE.Mesh(deskGeo, deskMat);
        deskMesh.receiveShadow = true;
        deskMesh.castShadow = true;
        deskMesh.position.set(x,y,z);
        this.scene.add(deskMesh);
    }

    // Papan belakang
    papanBack(x,y,z) {
        let deskGeo = new THREE.BoxGeometry(29,4.5,0.5);
        let deskMat = this.buatMat();
        let deskMesh = new THREE.Mesh(deskGeo, deskMat);
        deskMesh.receiveShadow = true;
        deskMesh.castShadow = true;
        deskMesh.position.set(x,y,z);
        this.scene.add(deskMesh);
    }

    // Kaki desk
    kaki(x,y,z) {
        let deskGeo = new THREE.CylinderGeometry(0.5,0.2,2);
        let deskMat = this.buatMat();
        let deskMesh = new THREE.Mesh(deskGeo, deskMat);
        deskMesh.receiveShadow = true;
        deskMesh.castShadow = true;
        deskMesh.position.set(x,y,z);
        this.scene.add(deskMesh);
    }
}