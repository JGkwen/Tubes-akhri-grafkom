import * as THREE from "three";

export default class kabinet {
    constructor(scene, audioListener) {
        this.scene = scene;
        this.audioListener = audioListener;

        // Load Tekstur
        let textureLoader = new THREE.TextureLoader();
        this.kabinCol = textureLoader.load("./texture/kabinet/Plastic013A_1K-JPG_Color.jpg");
        this.kabinNorm = textureLoader.load("./texture/kabinet/Plastic013A_1K-JPG_NormalDX.jpg");
        this.kabinRough = textureLoader.load("./texture/kabinet/Plastic013A_1K-JPG_Roughness.jpg");

        // Status pintu (terbuka/tutup)
        this.leftDoorOpen = false;
        this.rightDoorOpen = false;

        // Load audio
        const audioLoader = new THREE.AudioLoader();

        // Sound for opening
        this.openSound = new THREE.PositionalAudio(this.audioListener);
        audioLoader.load("./audio/soundeffect/cabinet_open.mp3", (buffer) => {
            this.openSound.setBuffer(buffer);
            this.openSound.setRefDistance(30);
            this.openSound.setLoop(false);
        });

        // Sound for closing
        this.closeSound = new THREE.PositionalAudio(this.audioListener);
        audioLoader.load("./audio/soundeffect/cabinet_close.mp3", (buffer) => {
            this.closeSound.setBuffer(buffer);
            this.closeSound.setRefDistance(30);
            this.closeSound.setLoop(false);
        });

        // Buat kabinet
        this.leftDoor = this.kabinKiri(-14.38, -5.25, -5, "kiri");
        this.rightDoor = this.kabinKanan(14.38, -5.25, -5, "kanan");

        // Tambahkan suara ke pintu kiri
        this.leftDoor.add(this.openSound);
        this.leftDoor.add(this.closeSound);
    }

    // Membuat material
    buatMat() {
        return new THREE.MeshStandardMaterial({
            map: this.kabinCol,
            normalMap: this.kabinNorm,
            roughnessMap: this.kabinRough,
        });
    }

    // Kabinet kiri
    kabinKiri(x, y, z, name) {
        let kabinGeo = new THREE.BoxGeometry(6.26, 4.5, 0.3);
        kabinGeo.translate(3, 0, 0);
        let kabinMat = this.buatMat();
        let kabinMesh = new THREE.Mesh(kabinGeo, kabinMat);
        kabinMesh.receiveShadow = true;
        kabinMesh.castShadow = true;
        kabinMesh.position.set(x, y, z);
        kabinMesh.name = name;
        this.scene.add(kabinMesh);
        return kabinMesh;
    }

    // Kabinet kanan
    kabinKanan(x, y, z, name) {
        let kabinGeo = new THREE.BoxGeometry(6.26, 4.5, 0.3);
        kabinGeo.translate(-3, 0, 0);
        let kabinMat = this.buatMat();
        let kabinMesh = new THREE.Mesh(kabinGeo, kabinMat);
        kabinMesh.receiveShadow = true;
        kabinMesh.castShadow = true;
        kabinMesh.position.set(x, y, z);
        kabinMesh.name = name;
        this.scene.add(kabinMesh);
        return kabinMesh;
    }

    // Fungsi untuk membuka/menutup pintu
    toggleDoor(door) {
        const isLeftDoor = door.name === "kiri";
        const isOpening = isLeftDoor ? !this.leftDoorOpen : !this.rightDoorOpen;

        if (isLeftDoor) {
            this.leftDoorOpen = !this.leftDoorOpen;
            const angle = this.leftDoorOpen ? -Math.PI / 2 : 0;
            door.rotation.y = angle;
        } else {
            this.rightDoorOpen = !this.rightDoorOpen;
            const angle = this.rightDoorOpen ? Math.PI / 2 : 0;
            door.rotation.y = angle;
        }

        if (isOpening) {
            this.openSound.play();
        } else {
            this.closeSound.play();
        }
    }
}
