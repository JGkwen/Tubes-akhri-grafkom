import * as THREE from "three";

export default class buku {
    constructor(scene) {
        this.scene = scene;

        // Buat Buku
        // Shelf atas
        this.books(-7.5,-4.05,-8);
        this.books2(-5,-4.05,-8);
        this.books(6.5,-4.05,-8);
        
        // Shelf bawah
        this.books(6.5,-6.55,-8);
        this.books(5,-6.55,-8);
        this.books2(4.5,-6.55,-8);
        this.books2(3,-6.55,-8);
    }

    // Membuat material
    buatMat() {
        let randomCol = Math.floor(Math.random()*0xffffff);

        return new THREE.MeshStandardMaterial({
            color: randomCol
        });
    }

    // Kabinet kiri
    books(x, y, z) {
        let bookGeo = new THREE.BoxGeometry(0.5, 1.9, 1.5);
        let bookMat = this.buatMat();
        let bookMesh = new THREE.Mesh(bookGeo, bookMat);
        bookMesh.receiveShadow = true;
        bookMesh.castShadow = true;
        bookMesh.position.set(x,y,z);
        this.scene.add(bookMesh);

        let bookGeo2 = new THREE.BoxGeometry(0.5, 1.3, 1.5);
        let bookMat2 = this.buatMat();
        let bookMesh2 = new THREE.Mesh(bookGeo2, bookMat2);
        bookMesh2.receiveShadow = true;
        bookMesh2.castShadow = true;
        bookMesh2.position.set(x+0.5,y-0.30,z+0.2);
        this.scene.add(bookMesh2);

        let bookGeo3 = new THREE.BoxGeometry(0.5, 1.6, 1.5);
        let bookMat3 = this.buatMat();
        let bookMesh3 = new THREE.Mesh(bookGeo3, bookMat3);
        bookMesh3.receiveShadow = true;
        bookMesh3.castShadow = true;
        bookMesh3.position.set(x+1,y-0.15,z);
        this.scene.add(bookMesh3);
    }

    books2(x, y, z) {
        let bookGeo = new THREE.BoxGeometry(0.5, 1.9, 1.5);
        let bookMat = this.buatMat();
        let bookMesh = new THREE.Mesh(bookGeo, bookMat);
        bookMesh.receiveShadow = true;
        bookMesh.castShadow = true;
        bookMesh.position.set(x,y,z);
        this.scene.add(bookMesh);

        let bookGeo2 = new THREE.BoxGeometry(0.5, 1.3, 1.5);
        let bookMat2 = this.buatMat();
        let bookMesh2 = new THREE.Mesh(bookGeo2, bookMat2);
        bookMesh2.receiveShadow = true;
        bookMesh2.castShadow = true;
        bookMesh2.position.set(x-0.5,y-0.30,z-0.2);
        this.scene.add(bookMesh2);

        let bookGeo3 = new THREE.BoxGeometry(0.5, 1.6, 1.5);
        let bookMat3 = this.buatMat();
        let bookMesh3 = new THREE.Mesh(bookGeo3, bookMat3);
        bookMesh3.receiveShadow = true;
        bookMesh3.castShadow = true;
        bookMesh3.position.set(x-1,y-0.15,z);
        this.scene.add(bookMesh3);
    }
}
