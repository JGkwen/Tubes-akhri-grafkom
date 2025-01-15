import * as THREE from "three";

export default class Saklar {
    constructor(scene, lampLight, audioListener) {
        this.scene = scene;
        this.lampLight = lampLight;
        this.isLampOn = true;

        const saklarGeo = new THREE.BoxGeometry(1, 2, 0.5);
        const saklarMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
        this.saklar = new THREE.Mesh(saklarGeo, saklarMat);

        this.saklar.position.set(-8, 0, -29.7);
        this.saklar.castShadow = true;
        this.saklar.receiveShadow = true;

        this.saklar.name = "saklar";

        this.scene.add(this.saklar);

        // sound effect
        const audioLoader = new THREE.AudioLoader();
        this.toggleSound = new THREE.PositionalAudio(audioListener);

        audioLoader.load("./audio/soundeffect/switch.mp3", (buffer) => {
            this.toggleSound.setBuffer(buffer);
            this.toggleSound.setRefDistance(20);
            this.toggleSound.setLoop(false);
        });

        this.saklar.add(this.toggleSound);
    }

    toggleLamp() {
        this.isLampOn = !this.isLampOn;
        this.lampLight.visible = this.isLampOn;

        if (!this.toggleSound.isPlaying) {
            this.toggleSound.play();
        }
    }
}
