import * as THREE from "three";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export default class Grass {
    constructor(scene) {
        const loader = new GLTFLoader();

        loader.load(
            './models/grass.glb',
            (gltf) => {
                const grass = gltf.scene;
        
                grass.rotation.x = -Math.PI / 2;
                grass.position.set(0,-20,0);
                grass.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: child.material.map,
                                        });
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                scene.add(grass);
            }
        );
    }
}