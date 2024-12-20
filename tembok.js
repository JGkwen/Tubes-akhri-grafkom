import * as THREE from "three";

export default class Tembok {
    constructor(scene) {
        // Tekstur tembok
        let wallCol = new THREE.TextureLoader().load("./texture/tembok/Plaster002_1K-JPG_Color.jpg");
        let wallNorm = new THREE.TextureLoader().load("./texture/tembok/Plaster002_1K-JPG_NormalDX.jpg");
        let wallRough = new THREE.TextureLoader().load("./texture/tembok/Plaster002_1K-JPG_Roughness.jpg");

        let wallMat = new THREE.MeshStandardMaterial({
            map: wallCol,
            normalMap: wallNorm,
            roughnessMap: wallRough,
        });

        // Tembok depan dengan lubang pintu
        const wallFrontShape = new THREE.Shape();
        wallFrontShape.moveTo(-30, -10); // Kiri bawah
        wallFrontShape.lineTo(30, -10); // Kanan bawah
        wallFrontShape.lineTo(30, 10); // Kanan atas
        wallFrontShape.lineTo(-30, 10); // Kiri atas
        wallFrontShape.lineTo(-30, -10); // Tutup shape

        // Buat lubang pintu
        const doorHole = new THREE.Path();
        doorHole.moveTo(-2.5, -10); // Kiri bawah pintu
        doorHole.lineTo(2.5, -10); // Kanan bawah pintu
        doorHole.lineTo(2.5, 0); // Kanan atas pintu
        doorHole.lineTo(-2.5, 0); // Kiri atas pintu
        doorHole.lineTo(-2.5, -10); // Tutup lubang

        wallFrontShape.holes.push(doorHole);

        // Geometri tembok depan dengan lubang
        const wallFrontGeo = new THREE.ShapeGeometry(wallFrontShape);
        this.wallFront = new THREE.Mesh(wallFrontGeo, wallMat);
        this.wallFront.position.set(0, 0, -30);
        this.wallFront.castShadow = true;
        this.wallFront.receiveShadow = true;
        scene.add(this.wallFront);

        // Tembok belakang
        let wallBackGeo = new THREE.BoxGeometry(60, 20, 1);
        this.wallBack = new THREE.Mesh(wallBackGeo, wallMat);
        this.wallBack.position.set(0, 0, 30);
        this.wallBack.castShadow = true;
        this.wallBack.receiveShadow = true;
        scene.add(this.wallBack);

        // Tembok kiri
        let wallLeftGeo = new THREE.BoxGeometry(1, 20, 60);
        this.wallLeft = new THREE.Mesh(wallLeftGeo, wallMat);
        this.wallLeft.position.set(-30, 0, 0);
        this.wallLeft.castShadow = true;
        this.wallLeft.receiveShadow = true;
        scene.add(this.wallLeft);

        // Tembok kanan
        let wallRightGeo = new THREE.BoxGeometry(1, 20, 60);
        this.wallRight = new THREE.Mesh(wallRightGeo, wallMat);
        this.wallRight.position.set(30, 0, 0);
        this.wallRight.castShadow = true;
        this.wallRight.receiveShadow = true;
        scene.add(this.wallRight);
    }
}
