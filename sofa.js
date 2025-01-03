import * as THREE from "three";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export default class Sofa {
    constructor(scene) {
        // Models
        const loader = new GLTFLoader();
        let textureLoader = new THREE.TextureLoader();
        let sofaCol = textureLoader.load("./texture/Sofa/Fabric030_1K-JPG_Color.jpg");
        let sofaNorm = textureLoader.load("./texture/Sofa/Fabric030_1K-JPG_NormalDX.jpg");
        let sofaRough = textureLoader.load("./texture/Sofa/Fabric030_1K-JPG_Roughness.jpg");
        let sofaAmbi = textureLoader.load("./texture/Sofa/Fabric030_1K-JPG_AmbientOcclusion.jpg");

        loader.load(
            './models/couch.glb',
            (gltf) => {
                const sofa = gltf.scene;
        
                sofa.traverse((child) => {
                    if(child.isMesh) {
                        child.material.map = sofaCol;
                        child.material.normalMap = sofaNorm;
                        child.material.roughnessMap = sofaRough;
                        child.material.aoMap = sofaAmbi;
                        child.material.side = THREE.FrontSide;
                        child.material.needsUpdate = true;
        
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
        
                sofa.position.set(0, -10, 22.2); 
                sofa.scale.set(13, 13, 13);
                sofa.rotation.y = Math.PI ;
                sofa.castShadow = true;
                sofa.receiveShadow = true;
        
                scene.add(sofa);
            }
        );
    }
}