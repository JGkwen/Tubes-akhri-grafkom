import * as THREE from "three";

export default class Pintu {
    constructor(scene, audioListener) {
        this.audioListener = audioListener;

        let doorTexture = new THREE.TextureLoader().load("./texture/Door.png");
        let doorMat = new THREE.MeshStandardMaterial({
            map: doorTexture,
        });

        const position = { x: 0, y: 0, z: -30.3 };
        const doorGeo = new THREE.BoxGeometry(8, 15, 1);
        this.door = new THREE.Mesh(doorGeo, doorMat);

        this.door.castShadow = true;
        this.door.receiveShadow = true;
        this.door.name = "pintu";

        // atur rotasi 
        this.pivot = new THREE.Object3D();
        this.pivot.position.set(position.x - 4, position.y - 2.5, position.z);
        this.pivot.add(this.door);

        // atur posisi 
        this.door.position.set(4, 0, 0);

        scene.add(this.pivot);

        this.isOpen = false;

        // memasukkan soundeffect
        const audioLoader = new THREE.AudioLoader();

        // sound effect buka pintu
        this.openSound = new THREE.PositionalAudio(this.audioListener);
        audioLoader.load("./audio/soundeffect/door_open.mp3", (buffer) => {
            this.openSound.setBuffer(buffer);
            this.openSound.setRefDistance(5);
            this.openSound.setLoop(false);
        });

        // sound effect tutup pintu
        this.closeSound = new THREE.PositionalAudio(this.audioListener);
        audioLoader.load("./audio/soundeffect/door_close.mp3", (buffer) => {
            this.closeSound.setBuffer(buffer);
            this.closeSound.setRefDistance(5);
            this.closeSound.setLoop(false);
        });

        this.door.add(this.openSound);
        this.door.add(this.closeSound);
    }

    toggleDoor() {
        const isOpening = !this.isOpen;

        if (this.isOpen) {
            this.pivot.rotation.y = 0;
        } else {
            this.pivot.rotation.y = -Math.PI / 2;
        }
        this.isOpen = !this.isOpen;

        if (isOpening) {
            this.openSound.play();
        } else {
            this.closeSound.play();
        }
    }
}
