import * as THREE from "three";
import * as CSS3D from "css3d";
import * as CANNON from "cannon";
import { PointerLockControls } from "./node_modules/three/examples/jsm/controls/PointerLockControls.js";
import KeyboardHelper from "./keyboard.js";
import Lantai from "./lantai.js";
import Desk from "./desk.js";
import kabinet from "./kabinet.js";
import Tembok from "./tembok.js";
import Pintu from "./pintu.js";
import Plafon from './plafon.js';
import Lampu from './lampu.js';
import Saklar from "./saklar.js";
import TV from "./tv.js"; 
import Sofa from "./sofa.js";
import sunmoon from "./sunmoon.js";
import AudioPlayer from "./audioplayer.js";
import buku from "./buku.js";
import Grass from "./grass.js";
import Hiasan from "./hiasan.js";


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
// Posisi Kamera
cam.position.z = 20;
// Ganti Warna background
renderer.setClearColor(0xaecce4);

// Tombol Lock kamera
document.addEventListener("contextmenu", (ev) => {
    ev.preventDefault();
    PlCtrl.lock();
})

// Raycast
let rayCast = new THREE.Raycaster();
let mouse = {};
addEventListener("mousedown", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    rayCast.setFromCamera(mouse, cam);
    let items = rayCast.intersectObjects(scene.children, true);


    items.forEach((i) => {
        if (i.object.name === "kiri" || i.object.name === "kanan") {
            kabin.toggleDoor(i.object); 
        } else if (i.object.name === "pintu") {
            door.toggleDoor();
        } else if (i.object.name === "saklar") {
            saklar.toggleLamp(); 
        } 
        if (i.object.name === "playPauseButton") {
            audioPlayer.togglePlayPause();
        } 
        if (i.object.name.startsWith("album")) {
            const index = parseInt(i.object.name.replace("album", ""), 10);
            audioPlayer.changeSong(index);
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

//audio
const audioListener = new THREE.AudioListener();
cam.add(audioListener);

const audioPlayer = new AudioPlayer(scene, audioListener);

Plafon(scene);
Lampu(scene);

// Lantai
let lantai = new Lantai(scene);

// Tembok
let wall = new Tembok(scene);

// Desk
let desk = new Desk(scene);

// Kabinet
let kabin = new kabinet(scene, audioListener);

// Tambahkan pintu ke tembok depan
let door = new Pintu(scene, audioListener);

// Sofa
let sofa = new Sofa(scene);

// Hiasan
let hiasan = new Hiasan(scene);

// Grass
let grass = new Grass(scene);

// Matahari & Bulan
let sunandmoon = new sunmoon(scene);

let books = new buku(scene);

// Ambient Light
let ambLight = new THREE.AmbientLight(0xffffff,0.05);
scene.add(ambLight);

// Point Light (Lampu Plafon)
let pLight = new THREE.PointLight(0xffffff, 100, 100);
pLight.position.set(0, 9.48, 0);
pLight.castShadow = true;
scene.add(pLight);
// let pLightHelp = new THREE.PointLightHelper(pLight);
// scene.add(pLightHelp);

// Inisialisasi Saklar
let saklar = new Saklar(scene, pLight, audioListener); 


// Lampu TV
let spLight = new THREE.SpotLight(0xffffff,50,10,5);
spLight.position.set(0,0,-10);
spLight.castShadow = true;
scene.add(spLight);
// let spLightHelp = new THREE.SpotLightHelper(spLight);
// scene.add(spLightHelp);

// CSS3D
function Element(id, x, y, z) {
    const div = document.createElement('div');
    div.style.width = '180px';
    div.style.height = '105px';

    const iframe = document.createElement('iframe');
    iframe.style.width = '180px';
    iframe.style.height = '105px';
    iframe.style.border = '0px';
    // iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.src = `https://www.youtube.com/embed/${id}?rel=0&enablejsapi=1`;
    https://www.youtube.com/watch?v=IpFX2vq8HKw&pp=ygUMeWFuZ2thaSBibHVl
    div.appendChild(iframe);

    const object = new CSS3D.CSS3DObject(div);
    object.position.set(x,y,z);

    return object;
}

let renderer2 = new CSS3D.CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer2.domElement);

// id Video yt
let ytVid = Element('IpFX2vq8HKw', 0, 0, 0);

// tv 
let tv = new TV(scene, ytVid);

function draw() {
    renderer.render(scene, cam);
    renderer2.render(scene, cam);

    let delta = clock.getDelta();
    prosesKeyboard(delta);

    requestAnimationFrame(draw);
}

draw();