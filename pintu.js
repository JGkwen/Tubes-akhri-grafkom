import * as THREE from "three";

export default class Pintu {
    constructor(scene, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }) {
        let doorTexture = new THREE.TextureLoader().load("./texture/pintu/DoorTexture.jpg");
        let doorMat = new THREE.MeshStandardMaterial({
            map: doorTexture,
        });

        let doorGeo = new THREE.BoxGeometry(8, 15, 1);
        this.door = new THREE.Mesh(doorGeo, doorMat);

        this.door.castShadow = true;
        this.door.receiveShadow = true;
        this.door.name = "pintu";

        // Buat pivot untuk rotasi
        this.pivot = new THREE.Object3D();
        this.pivot.position.set(position.x - 4, position.y - 2.5, position.z); // Set tepi pintu sebagai pivot
        this.pivot.add(this.door);

        // Atur posisi pintu relatif terhadap pivot
        this.door.position.set(4, 0, 0);

        scene.add(this.pivot); // Tambahkan pivot ke scene

        this.isOpen = false; // Status pintu
    }

    toggleDoor() {
        if (this.isOpen) {
            this.pivot.rotation.y = 0; // Tutup pintu
        } else {
            this.pivot.rotation.y = -Math.PI / 2; // Buka pintu keluar
        }
        this.isOpen = !this.isOpen; // Toggle status
    }
}
