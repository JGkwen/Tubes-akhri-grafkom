import * as THREE from "three";
import { PointerLockControls } from "./node_modules/three/examples/jsm/controls/PointerLockControls.js";
import KeyboardHelper from "./keyboard.js";
import Lantai from "./lantai.js";
import Desk from "./desk.js";
import kabinet from "./kabinet.js";
import Tembok from "./tembok.js";
import Pintu from "./pintu.js";

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

// Tambahkan pintu ke tembok depan
let doorPosition = { x: 0, y: 0, z: -29.75 }; // Dekat dengan tembok depan
let door = new Pintu(scene, doorPosition);

// Ambient Light
let ambLight = new THREE.AmbientLight(0xffffff,0.05);
scene.add(ambLight);

// Point Light
let pLight = new THREE.PointLight(0xffffff,200,0);
pLight.position.set(0,10,0);
pLight.castShadow = true;
scene.add(pLight);
let pLightHelp = new THREE.PointLightHelper(pLight);
scene.add(pLightHelp);

function draw() {
    renderer.render(scene, cam);

    let delta = clock.getDelta();
    prosesKeyboard(delta);

    requestAnimationFrame(draw);
}

draw();