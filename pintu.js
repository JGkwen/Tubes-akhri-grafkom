import * as THREE from "three";

export default class Pintu {
    constructor(scene, position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }) {
        // Material pintu
        let doorTexture = new THREE.TextureLoader().load("./texture/pintu/DoorTexture.jpg");
        let doorMat = new THREE.MeshStandardMaterial({
            map: doorTexture,
        });

        // Geometri pintu
        let doorGeo = new THREE.BoxGeometry(8, 15, 1);
        this.door = new THREE.Mesh(doorGeo, doorMat);

        // Posisi dan rotasi awal pintu
        this.door.position.set(position.x, position.y-2.5, position.z);
        this.door.rotation.set(rotation.x, rotation.y, rotation.z);

        this.door.castShadow = true;
        this.door.receiveShadow = true;
        scene.add(this.door);

        // State animasi
        this.isOpen = false;
        this.animating = false;
    }
}
