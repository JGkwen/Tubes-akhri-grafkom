import * as THREE from "three";

export default class AudioPlayer {
    constructor(scene, audioListener) {
        this.scene = scene;
        this.audioListener = audioListener;

        // Audio setup
        this.sounds = [];
        this.currentSoundIndex = 0;
        this.isPlaying = false;

        const audioLoader = new THREE.AudioLoader();
        const songFiles = ["./audio/song1.mp3", "audio/song2.mp3", "audio/song3.mp3"];
        songFiles.forEach((file) => {
            const sound = new THREE.Audio(this.audioListener);
            audioLoader.load(file, (buffer) => {
                sound.setBuffer(buffer);
                sound.setLoop(false);
                sound.setVolume(1);
            });
            this.sounds.push(sound);
        });

        // Casing audio Player
        const position = { x: 10, y: -1, z: -12 };
        const bodyGeometry = new THREE.BoxGeometry(6, 3, 0.5);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
        bodyMesh.position.set(position.x, position.y, position.z);
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;
        this.scene.add(bodyMesh);

        // LED Audio player 
        const screenGeometry = new THREE.PlaneGeometry(5.3, 1.6);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
        screenMesh.position.set(position.x, position.y + 0.2, position.z + 0.26);
        this.scene.add(screenMesh);

        // gambar album
        const textureLoader = new THREE.TextureLoader();
        const albums = [
            textureLoader.load("images/album1.png"),
            textureLoader.load("images/album2.png"),
            textureLoader.load("images/album3.png"),
        ];

        // menggunakan gpt, dimana saya menanyakan bagaimana cara agar bisa menginput gambar tiap gambar album ke led
        this.albumCovers = [];
        albums.forEach((texture, index) => {
            const albumGeometry = new THREE.PlaneGeometry(1, 1);
            const albumMaterial = new THREE.MeshBasicMaterial({ map: texture });
            const albumMesh = new THREE.Mesh(albumGeometry, albumMaterial);
            albumMesh.position.set(position.x - 2 + index * 2, position.y + 0.2, position.z + 0.27);
            this.scene.add(albumMesh);
            this.albumCovers.push(albumMesh);

            // mengubah lagu
            albumMesh.name = `album${index}`;
        });

        // pause dan play
        const buttonGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
        const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0x1db954 });
        this.playPauseButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
        this.playPauseButton.position.set(position.x + 2.5, position.y - 1, position.z + 0.26);
        this.playPauseButton.rotation.x = Math.PI / 2;
        this.playPauseButton.name = "playPauseButton";
        this.scene.add(this.playPauseButton);
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.sounds[this.currentSoundIndex].pause();
            this.playPauseButton.material.color.set(0x1db954); 
        } else {
            this.sounds[this.currentSoundIndex].play();
            this.playPauseButton.material.color.set(0xff0000); 
        }
        this.isPlaying = !this.isPlaying;
    }

    changeSong(index) {
        if (this.isPlaying) {
            this.sounds[this.currentSoundIndex].stop();
        }
        this.currentSoundIndex = index;
        if (this.isPlaying) {
            this.sounds[this.currentSoundIndex].play();
        }
    }
}
