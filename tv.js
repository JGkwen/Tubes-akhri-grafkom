import * as THREE from "three";

export default class TV {
    constructor(scene, ytVid) {
        this.scene = scene;

        const position = { x: 0, y: -2.25, z: -10 };
        const screenGeo = new THREE.BoxGeometry(12, 7, 0.5);
        const screenMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: 0x222222, 
            roughness: 0.5,
        });
        screen = new THREE.Mesh(screenGeo, screenMat);
        screen.castShadow = true;
        screen.receiveShadow = true;
        screen.position.set(position.x, position.y + 3.75, position.z);
        this.scene.add(screen);

        if (ytVid) {
            ytVid.scale.set(0.066, 0.066, 0.066); 
            ytVid.position.set(0, 0, 0.26);
            screen.add(ytVid);
        }

        // frame samping tv
        const bezelGeo = new THREE.BoxGeometry(12.2, 7.2, 0.6);
        const bezelMat = new THREE.MeshStandardMaterial({
            color: 0x333333, 
            roughness: 0.7,
        });
        const bezel = new THREE.Mesh(bezelGeo, bezelMat);
        bezel.castShadow = true;
        bezel.receiveShadow = true;
        bezel.position.set(position.x, position.y + 3.75, position.z - 0.1);
        this.scene.add(bezel);

        // kaki tv
        const standGeo = new THREE.BoxGeometry(1, 0.3, 3); 
        const standMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const stand = new THREE.Mesh(standGeo, standMat);
        stand.castShadow = true;
        stand.receiveShadow = true;
        stand.position.set(position.x, position.y + 0.01, position.z); 
        this.scene.add(stand);

        // alas kaki tv
        const baseGeo = new THREE.BoxGeometry(4, 0.3, 4); 
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.castShadow = true;
        base.receiveShadow = true;
        base.position.set(position.x, position.y -0.1, position.z); 
        this.scene.add(base);
    }
}
