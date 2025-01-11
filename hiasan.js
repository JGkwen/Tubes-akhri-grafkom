import * as THREE from "three";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export default class Hiasan {
    constructor(scene) {
        const loader = new GLTFLoader();

        loader.load(
            './models/mineblock.glb',
            (gltf) => {
                const hiasan = gltf.scene;
        
                hiasan.position.set(-11,-7.5,-7.7);
                hiasan.castShadow = true;
                hiasan.receiveShadow = true;

                scene.add(hiasan);
            }
        );

        loader.load(
            './models/miniatur.glb',
            (gltf) => {
                const hiasan2 = gltf.scene;
        
                hiasan2.rotation.y = -Math.PI ;
                hiasan2.scale.set(0.3,0.3,0.3);
                hiasan2.position.set(-12.5,-2.225,-9);
                hiasan2.castShadow = true;
                hiasan2.receiveShadow = true;


                scene.add(hiasan2);
            }
        );
    }
}