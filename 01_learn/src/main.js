import * as THREE from 'three' ;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
    0.1, 1000
);

camera.position.z = 40;

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('scene'), antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight);

const geo = new THREE.TorusKnotGeometry( 10, 3, 300, 20 );
const mat = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geo, mat);
scene.add(cube);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollY / maxScroll;
    cube.rotation.x = scrollFraction * Math.PI * 2;
    cube.rotation.y = scrollFraction * Math.PI * 2;
});
