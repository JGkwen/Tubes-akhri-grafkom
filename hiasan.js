import * as THREE from "three";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export default class Hiasan {
    constructor(scene) {
        const loader = new GLTFLoader();

        // hiasan iseng
        loader.load(
            './models/mineblock.glb',
            (gltf) => {
                const hiasan = gltf.scene;

                hiasan.position.set(-11, -7.5, -6.5);
                hiasan.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(hiasan);
            }
        );

        // miniatur
        loader.load(
            './models/miniatur.glb',
            (gltf) => {
                const hiasan2 = gltf.scene;

                hiasan2.rotation.y = -Math.PI;
                hiasan2.scale.set(0.3, 0.3, 0.3);
                hiasan2.position.set(-12.5, -2.225, -9);
                hiasan2.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(hiasan2);
            }
        );

        // carpet
        loader.load(
            './models/carpet.glb',
            (gltf) => {
                const hiasan3 = gltf.scene;

                hiasan3.position.set(0,-9.5,6);
                hiasan3.scale.set(28,28,28);
                hiasan3.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: child.material.map,
                        });
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                

                scene.add(hiasan3);
            }
        );

        // bookshelf
        loader.load(
            './models/bookshelf.glb',
            (gltf) => {
                const hiasan4 = gltf.scene;

                hiasan4.rotation.y = -Math.PI;
                hiasan4.position.set(-20.5,-9.7,-16.2);
                hiasan4.scale.set(0.1,0.1,0.1);
                hiasan4.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                

                scene.add(hiasan4);
            }
        );

        // kursi
        loader.load(
            './models/chair.glb',
            (gltf) => {
                const hiasan5 = gltf.scene;

                hiasan5.rotation.y = -Math.PI/2;
                hiasan5.position.set(-20.5,-9.7,-16.2);
                hiasan5.scale.set(10,10,10);
                hiasan5.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                

                scene.add(hiasan5);
            }
        );

        // pc
        loader.load(
            './models/pc.glb',
            (gltf) => {
                const hiasan6 = gltf.scene;

                hiasan6.position.set(-17.85,-2.6,-25);
                
                scene.add(hiasan6);
            }
        );

        // tanaman
        loader.load(
            './models/indoor_plant.glb',
            (gltf) => {
                const hiasan7 = gltf.scene;

                hiasan7.position.set(-20.5,-9.7,0);
                hiasan7.scale.set(8,8,8);
                hiasan7.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                

                scene.add(hiasan7);
            }
        );

        // mainan
        loader.load(
            './models/toy.glb',
            (gltf) => {
                const hiasan8 = gltf.scene;

                hiasan8.position.set(9, -7.5, -6.5);
                hiasan8.scale.set(20,20,20);
                hiasan8.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(hiasan8);
            }
        );

        // meja
        loader.load(
            './models/table.glb',
            (gltf) => {
                const hiasan9 = gltf.scene;

                hiasan9.position.set(0, -6.5, 7);
                hiasan9.scale.set(5,5,5);
                hiasan9.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(hiasan9);
            }
        );

        // lukisan
        loader.load(
            './models/paint.glb',
            (gltf) => {
                const hiasan10 = gltf.scene;

                hiasan10.rotation.y = -Math.PI/2;
                hiasan10.position.set(28.8,-4,10);
                hiasan10.scale.set(0.7,0.7,0.7);
                hiasan10.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                

                scene.add(hiasan10);
            }
        );

        // toast
        loader.load(
            './models/toast.glb',
            (gltf) => {
                const hiasan11 = gltf.scene;

                hiasan11.position.set(0, -5.55, 7);
                hiasan11.scale.set(3,3,3);
                hiasan11.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(hiasan11);
            }
        );

        // coffee
        loader.load(
            './models/coffee.glb',
            (gltf) => {
                const hiasan12 = gltf.scene;

                hiasan12.position.set(3, -5.95, 7);
                hiasan12.scale.set(0.02,0.02,0.02);
                hiasan12.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(hiasan12);
            }
        );

        // jam
        loader.load(
            './models/clock.glb',
            (gltf) => {
                const hiasan13 = gltf.scene;

                hiasan13.position.set(20,-4,-30);
                hiasan13.scale.set(10,10,10);
                hiasan13.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                

                scene.add(hiasan13);
            }
        );
    }
}
