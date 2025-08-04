import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 100);

camera.position.z = 2;

const canvas = document.getElementById('scene');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(w, h);

const loader = new THREE.TextureLoader();
loader.load('/src/texture.jpg', (texture) => {
    const geo = new THREE.PlaneGeometry(3, 2.5);
    const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0
    });
    const plane = new THREE.Mesh(geo, mat);
    scene.add(plane);

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const max = document.body.scrollHeight - window.innerHeight;
        mat.opacity = THREE.MathUtils.clamp(scrollY / (max/2), 0, 1);
    });
});

window.addEventListener('resize', () => {
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();