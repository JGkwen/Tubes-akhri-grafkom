import * as THREE from "three";

export default class Tembok {
    constructor(scene) {
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

        // Buat lubang pintu dengan dimensi yang sesuai
        const doorHole = new THREE.Path();
        const doorWidth = 8;
        const doorHeight = 15;
        const doorX = 0; // Posisi tengah
        const doorY = -2.5; // Sama seperti posisi pintu di Pintu.js

        doorHole.moveTo(doorX - doorWidth / 2, doorY - doorHeight / 2); // Kiri bawah
        doorHole.lineTo(doorX + doorWidth / 2, doorY - doorHeight / 2); // Kanan bawah
        doorHole.lineTo(doorX + doorWidth / 2, doorY + doorHeight / 2); // Kanan atas
        doorHole.lineTo(doorX - doorWidth / 2, doorY + doorHeight / 2); // Kiri atas
        doorHole.lineTo(doorX - doorWidth / 2, doorY - doorHeight / 2); // Tutup lubang

        wallFrontShape.holes.push(doorHole);

        const wallFrontGeo = new THREE.ShapeGeometry(wallFrontShape);
        this.wallFront = new THREE.Mesh(wallFrontGeo, wallMat);
        this.wallFront.position.set(0, 0, -30);
        this.wallFront.castShadow = true;
        this.wallFront.receiveShadow = true;
        scene.add(this.wallFront);

        // Tembok belakang
        let wallBackGeo = new THREE.BoxGeometry(65, 20, 1);
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
        let wallRightGeo = new THREE.BoxGeometry(1, 20, 65);
        this.wallRight = new THREE.Mesh(wallRightGeo, wallMat);
        this.wallRight.position.set(30, 0, 0);
        this.wallRight.castShadow = true;
        this.wallRight.receiveShadow = true;
        scene.add(this.wallRight);
    }
}
