import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, w / h, 0.1, 100
);

camera.position.z = 3;

const canvas = document.getElementById('scene');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(w, h);

const geo = new THREE.SphereGeometry(1, 32, 32);
const mat = new THREE.MeshBasicMaterial({
    color: 0xff00000
});
const sphere = new THREE.Mesh(geo, mat);

scene.add(sphere);

window.addEventListener('resize', () => {
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h)
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    const t = scrollY / max; 
    mat.color.setHSL(0.7 * t, 1, 0.5);
});

function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();
