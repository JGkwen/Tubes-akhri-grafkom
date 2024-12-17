import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "./node_modules/three/examples/jsm/controls/PointerLockControls.js";
import KeyboardHelper from "./keyboard.js";
import Lantai from "./lantai.js";
import Desk from "./desk.js";

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
let OrbCtrl = new OrbitControls(cam, renderer.domElement);
let PlCtrl = new PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();
// Shadow
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.shadowMap.enabled = true;


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
    if(myKeyboard.keys['e']) {
        PlCtrl.getObject().position.y += actualSpeed;
    }
}

// Posisi Kamera
cam.position.z = 20;
// Ganti Warna background
renderer.setClearColor(0xcacaca);

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Lantai
let lantai = new Lantai(scene);

// Desk
let desk = new Desk(scene);

// Ambient Light
let ambLight = new THREE.AmbientLight(0xffffff);
scene.add(ambLight);


function draw() {
    renderer.render(scene, cam);

    let delta = clock.getDelta();
    prosesKeyboard(delta);

    requestAnimationFrame(draw);
}

draw();