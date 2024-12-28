import * as THREE from "three";

export default class kabinet {
    constructor(scene) {
        this.scene = scene;

        // Load Tekstur
        let textureLoader = new THREE.TextureLoader();
        this.kabinCol = textureLoader.load("./texture/kabinet/Plastic013A_1K-JPG_Color.jpg");
        this.kabinNorm = textureLoader.load("./texture/kabinet/Plastic013A_1K-JPG_NormalDX.jpg");
        this.kabinRough = textureLoader.load("./texture/kabinet/Plastic013A_1K-JPG_Roughness.jpg");

        // Status pintu (terbuka/tutup)
        this.leftDoorOpen = false;
        this.rightDoorOpen = false;

        // Buat kabinet
        this.leftDoor = this.kabin(-14.38, -5.25, -5.3, "kiri");
        this.rightDoor = this.kabin2(14.38, -5.25, -5.3, "kanan");
    }

    // Membuat material
    buatMat() {
        return new THREE.MeshStandardMaterial({
            map: this.kabinCol,
            normalMap: this.kabinNorm,
            roughnessMap: this.kabinRough,
        });
    }

    buatMat2() {
        return new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.2,
            map: this.kabinCol,
            normalMap: this.kabinNorm,
            roughnessMap: this.kabinRough,
        });
    }

    // Kabinet kiri
    kabin(x, y, z, name) {
        let kabinGeo = new THREE.BoxGeometry(6.26, 4.5, 0.3);
        let kabinGeo2 = new THREE.SphereGeometry(0.3);
        kabinGeo.translate(3, 0, 0);
        let kabinMat = this.buatMat();
        let kabinMesh = new THREE.Mesh(kabinGeo, kabinMat);
        let kabinMat2 = this.buatMat2();
        let kabinMesh2 = new THREE.Mesh(kabinGeo2, kabinMat2);
        kabinMesh.receiveShadow = true;
        kabinMesh.castShadow = true;
        kabinMesh2.receiveShadow = true;
        kabinMesh2.castShadow = true;
        kabinMesh.position.set(x, y, z);
        kabinMesh2.position.set(x+5, y, z+0.3);
        kabinMesh.name = name;
        kabinMesh2.name = name;
        this.scene.add(kabinMesh);
        this.scene.add(kabinMesh2);
        return kabinMesh;
    }

    // Kabinet kanan
    kabin2(x, y, z, name) {
        let kabinGeo = new THREE.BoxGeometry(6.26, 4.5, 0.3);
        let kabinGeo2 = new THREE.SphereGeometry(0.3);
        kabinGeo.translate(-3, 0, 0);
        let kabinMat = this.buatMat();
        let kabinMesh = new THREE.Mesh(kabinGeo, kabinMat);
        let kabinMat2 = this.buatMat2();
        let kabinMesh2 = new THREE.Mesh(kabinGeo2, kabinMat2);
        kabinMesh.receiveShadow = true;
        kabinMesh.castShadow = true;
        kabinMesh2.receiveShadow = true;
        kabinMesh2.castShadow = true;
        kabinMesh.position.set(x, y, z);
        kabinMesh2.position.set(x-5, y, z+0.3);
        kabinMesh.name = name;
        kabinMesh2.name = name;
        this.scene.add(kabinMesh);
        this.scene.add(kabinMesh2);
        return kabinMesh;
    }

    // Fungsi untuk membuka/menutup pintu
    toggleDoor(door) {
        if (door.name === "kiri") {
            this.leftDoorOpen = !this.leftDoorOpen;
            const angle = this.leftDoorOpen ? -Math.PI / 2 : 0; 
            door.rotation.y = angle;
        } else if (door.name === "kanan") {
            this.rightDoorOpen = !this.rightDoorOpen;
            const angle = this.rightDoorOpen ? Math.PI / 2 : 0; 
            door.rotation.y = angle;
        }
    }
}
