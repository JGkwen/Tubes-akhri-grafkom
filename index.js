import * as THREE from "three";
import * as CSS3D from "css3d";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from "./node_modules/three/examples/jsm/controls/PointerLockControls.js";
import KeyboardHelper from "./keyboard.js";
import Lantai from "./lantai.js";
import Desk from "./desk.js";
import kabinet from "./kabinet.js";
import Tembok from "./tembok.js";
import Pintu from "./pintu.js";
import Plafon from './plafon.js';
import Lampu from './lampu.js';
import TV from "./tv.js"; 

// Scene = 3D world kita
let scene = new THREE.Scene();
// Jarak terjauh yang bisa dilihat
let cam = new THREE.PerspectiveCamera(60,innerWidth/innerHeight,1,1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
// Ukuran Canvas
renderer.setSize(window.innerWidth, window.innerHeight);
// Pasang canvas ke layar
document.body.appendChild(renderer.domElement);
// Menggerakan kamera
let PlCtrl = new PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();
// Shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Tombol Lock kamera
let button = document.getElementById("btn");
button.addEventListener("click", () => {
    PlCtrl.lock();
})

PlCtrl.addEventListener('lock', ()=>{
    button.innerHTML = "Locked";
});

PlCtrl.addEventListener('unlock', ()=>{
    button.innerHTML = "Unlocked";
});

// Raycast
let rayCast = new THREE.Raycaster();
let mouse = {};
addEventListener("mousedown", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    rayCast.setFromCamera(mouse, cam);
    let items = rayCast.intersectObjects(scene.children, true); // Periksa anak objek

    items.forEach((i) => {
        if (i.object.name === "kiri" || i.object.name === "kanan") {
            kabin.toggleDoor(i.object); // Kabinet
        } else if (i.object.name === "pintu") {
            door.toggleDoor(); // Pintu
        }
    });
});

// Keyboard controls
let myKeyboard = new KeyboardHelper(scene);
function prosesKeyboard(delta) {
    let speed = 10;
    let actualSpeed = speed * delta;

    if(myKeyboard.keys['w']) {
        PlCtrl.moveForward(actualSpeed);
    }
    if(myKeyboard.keys['a']) {
        PlCtrl.moveRight(-actualSpeed);
    }
    if(myKeyboard.keys['s']) {
        PlCtrl.moveForward(-actualSpeed);
    }
    if(myKeyboard.keys['d']) {
        PlCtrl.moveRight(actualSpeed);
    }
    if(myKeyboard.keys['q']) {
        PlCtrl.getObject().position.y -= actualSpeed;
    }
    if(myKeyboard.keys[' ']) {
        PlCtrl.getObject().position.y += actualSpeed;
    }
}

// Posisi Kamera
cam.position.z = 20;
// Ganti Warna background
renderer.setClearColor(0xcacaca);

Plafon(scene);
Lampu(scene);

// X y z helper
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Lantai
let lantai = new Lantai(scene);

// Tembok
let wall = new Tembok(scene);

// Desk
let desk = new Desk(scene);

// Kabinet
let kabin = new kabinet(scene);

// Tambahkan TV di atas meja
let tvPosition = { x: 0, y: -2.25, z: -10 }; // Posisi TV tepat di atas meja
let tv = new TV(scene, tvPosition);

// Tambahkan pintu ke tembok depan
let doorPosition = { x: 0, y: 0, z: -30.3 }; // Dekat dengan tembok depan
let door = new Pintu(scene, doorPosition);

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
        console.log("Model loaded successfully:", gltf.scene);

        const sofa = gltf.scene;

        sofa.traverse((child) => {
            if(child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    map: sofaCol,
                    normalMap: sofaNorm,
                    roughnessMap: sofaRough,
                    aoMap: sofaAmbi,
                });
                child.material.needsUpdate = true;
            }
        });

        sofa.position.set(0, -10, 22.2); 
        sofa.scale.set(13, 13, 13);
        sofa.rotation.y = Math.PI ;
        sofa.castShadow = true;

        scene.add(sofa);
    }
);

// Ambient Light
let ambLight = new THREE.AmbientLight(0xffffff,0.05);
scene.add(ambLight);

// Point Light
let pLight = new THREE.PointLight(0xffffff,200,0);
pLight.position.set(0,9.48,0);
pLight.castShadow = true;
scene.add(pLight);
let pLightHelp = new THREE.PointLightHelper(pLight);
scene.add(pLightHelp);

// CSS3D
function Element(id, x, y, z) {
    const div = document.createElement('div');
    div.style.width = '480px';
    div.style.height = '360px';

    const iframe = document.createElement('iframe');
    iframe.style.width = '720px';
    iframe.style.height = '420px';
    iframe.style.border = '0px';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.src = `https://www.youtube.com/embed/${id}?rel=0&enablejsapi=1`;
    div.appendChild(iframe);

    const object = new CSS3D.CSS3DObject(div);
    object.position.set(x,y,z);

    return object;
}

let scene2 = new THREE.Scene();
let aspect = window.innerWidth/window.innerHeight;
let cam2 = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
cam2.position.set(0,0,0);

let renderer2 = new CSS3D.CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer2.domElement);

const blocker = document.getElementById('blocker');
blocker.style.display = 'none';

PlCtrl.addEventListener('start', function () {
    blocker.style.display = '';
});
PlCtrl.addEventListener('end', function () {
    blocker.style.display = 'none';
});

// id Video yt
let ytVid = Element('9bZkp7q19f0', 0, 100, -1400);
scene2.add(ytVid);

function draw() {
    renderer.render(scene, cam);
    renderer2.render(scene2, cam);

    let delta = clock.getDelta();
    prosesKeyboard(delta);

    requestAnimationFrame(draw);
}

draw();