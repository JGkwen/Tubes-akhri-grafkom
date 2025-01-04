import * as THREE from "three";

export default class Saklar {
    constructor(scene, lampLight) {
        this.scene = scene;
        this.lampLight = lampLight; // Referensi ke lampu plafon
        this.isLampOn = true; // Status lampu (default menyala)

        // Geometri dan material saklar
        const saklarGeo = new THREE.BoxGeometry(1, 2, 0.5); // Ukuran saklar
        const saklarMat = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Warna abu-abu gelap
        this.saklar = new THREE.Mesh(saklarGeo, saklarMat);

        // Posisi saklar di tembok (bisa disesuaikan)
        this.saklar.position.set(-5, 0, -29.8); // Dekat dengan tembok depan
        this.saklar.castShadow = true;
        this.saklar.receiveShadow = true;

        // Nama saklar untuk interaksi
        this.saklar.name = "saklar";

        // Tambahkan saklar ke scene
        this.scene.add(this.saklar);
    }

    // Fungsi untuk menyalakan/mematikan lampu
    toggleLamp() {
        this.isLampOn = !this.isLampOn;
        this.lampLight.visible = this.isLampOn; // Lampu nyala/mati
    }
}
