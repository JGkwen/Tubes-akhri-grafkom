// 
import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

// Scene = 3D world kita
let scene = new THREE.Scene();
// Jarak terjauh yang bisa dilihat
let cam = new THREE.PerspectiveCamera(60,innerWidth/innerHeight,1,1000);
cam.position.z = 20;
cam.position.y = 10;
let renderer = new THREE.WebGLRenderer({ antialias: true });
// Ukuran Canvas
renderer.setSize(window.innerWidth, window.innerHeight);
// Pasang canvas ke layar
document.body.appendChild(renderer.domElement);

// Menggerakan kamera
const controls = new OrbitControls(cam, renderer.domElement);

// Bagian atas Meja
// Bikin geometry box
let boxGeo = new THREE.BoxGeometry(20,1,15); 
let boxTxt = new THREE.TextureLoader().load('./texture/wood.png');
let boxMat = new THREE.MeshBasicMaterial({color: 0x873e23 ,map: boxTxt});
// Bikin bendanya
let boxMesh = new THREE.Mesh(boxGeo, boxMat); 
// Masukin box ke dunia
scene.add(boxMesh); 

// Kaki Meja
function kakiMeja(x,y,z) {
    // Bikin geometry box
    let boxGeo = new THREE.BoxGeometry(1,10,1); 
    let boxTxt = new THREE.TextureLoader().load('./texture/wood.png');
    let boxMat = new THREE.MeshBasicMaterial({color: 0x873e23 ,map: boxTxt});
    // Bikin bendanya
    let boxMesh = new THREE.Mesh(boxGeo, boxMat); 

    // Menentukan posisi kaki meja
    boxMesh.position.x = x;
    boxMesh.position.y = y;
    boxMesh.position.z = z;

    // Masukin box ke dunia
    scene.add(boxMesh); 
}

function draw() {
    controls.update();
    renderer.render(scene, cam);

    requestAnimationFrame(draw);
}

// Kaki Meja
kakiMeja(7,-5,6)
kakiMeja(7,-5,-6)
kakiMeja(-7,-5,6)
kakiMeja(-7,-5,-6)

draw();