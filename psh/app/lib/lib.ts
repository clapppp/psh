import * as Three from 'three';

export default function initialize() {
    const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -18, 20);
    camera.lookAt(0, -5, 0);

    const scene = new Three.Scene();
    scene.background = new Three.Color(0xf0f0f0);

    const renderer = new Three.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new Three.AmbientLight(0xffffff, 1);  // Increased intensity
    scene.add(ambientLight);

    const directionalLight = new Three.DirectionalLight(0xffffff, 2);  // Stronger directional light
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const geometry = new Three.PlaneGeometry(30, 30);
    const material = new Three.MeshStandardMaterial({ color: 0xffffff });
    const floor = new Three.Mesh(geometry, material);
    scene.add(floor);

    const velocity = new Three.Vector3(0, 0, 0);
    const a = 0.01;
    const max = 0.2;
    const friction = 0.98;

    return { scene, renderer };
}