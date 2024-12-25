import * as THREE from "three";

export default class kabinet {
    constructor(scene) {
        this.scene = scene;

        // Load Tekstur
        let textureLoader = new THREE.TextureLoader();
        this.kabinCol = textureLoader.load("./texture/kabinet/Plastic013A_1K-JPG_Color.jpg");
        this.kabinNorm = textureLoader.load("./texture/kabinet/Plastic013A_1K-JPG_NormalDX.jpg");
        this.kabinRough = textureLoader.load("./texture/kabinet/Plastic013A_1K-JPG_Roughness.jpg");

        this.kabin(-14.38,-5.25,-5.3);
        this.kabin2(14.38,-5.25,-5.3);
    }

    // Membuat material
    buatMat() {
        return new THREE.MeshStandardMaterial({
            map: this.kabinCol,
            normalMap: this.kabinNorm,
            roughnessMap: this.kabinRough,
        })
    }

    // Kabinet
    kabin(x,y,z) {
        let kabinGeo = new THREE.BoxGeometry(6.26,4.5,0.3);
        kabinGeo.translate(3, 0, 0);
        let kabinMat = this.buatMat();
        let kabinMesh = new THREE.Mesh(kabinGeo, kabinMat);
        kabinMesh.receiveShadow = true;
        kabinMesh.castShadow = true;
        // kabinMesh.rotation.y -= 0.5;
        kabinMesh.position.set(x,y,z)
        kabinMesh.name = "kiri";
        this.scene.add(kabinMesh);
    }

    kabin2(x,y,z) {
        let kabinGeo = new THREE.BoxGeometry(6.26,4.5,0.3);
        kabinGeo.translate(-3, 0, 0);
        let kabinMat = this.buatMat();
        let kabinMesh = new THREE.Mesh(kabinGeo, kabinMat);
        kabinMesh.receiveShadow = true;
        kabinMesh.castShadow = true;
        // kabinMesh.rotation.y += 0.5;
        kabinMesh.position.set(x,y,z)
        kabinMesh.name = "kanan";
        this.scene.add(kabinMesh);
    }
}