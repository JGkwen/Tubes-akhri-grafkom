import * as THREE from "three";

export default class sunmoon {
    constructor(scene) {
        this.scene = scene;

        this.sphere(200,100,0)
    }

    // Membuat material
    buatMat() {
        return new THREE.MeshStandardMaterial({
            color: 0xfceecf,
            emissive: 0xfceecf
        });
    }

    // Kabinet kiri
    sphere(x, y, z) {
        let sphereGeo = new THREE.SphereGeometry(10);
        let sphereMat = this.buatMat();
        let sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        sphereMesh.position.set(x, y, z);
        this.scene.add(sphereMesh);

        let planeGeo = new THREE.PlaneGeometry(1,1);
        let planeMat = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            // color: 0xffffff
        });
        let planeMesh = new THREE.Mesh(planeGeo,planeMat);
        planeMesh.position.set(30.6,0,0);
        planeMesh.rotation.y = Math.PI / 2;
        this.scene.add(planeMesh);

        let terang = new THREE.SpotLight(0xfceecf, 100000);
        terang.target = planeMesh
        terang.castShadow = true;
        terang.position.set(x,y,z);
        this.scene.add(terang);

        // let terangHelp = new THREE.SpotLightHelper(terang);
        // this.scene.add(terangHelp);
    }
}
