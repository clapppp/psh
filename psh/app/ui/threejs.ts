import * as Three from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type user = {
    gltf?: GLTF,
    name: string,
    x: number,
    y: number
}

type keylist = {
    [key: string]: boolean
}

const scene = new Three.Scene();
scene.background = new Three.Color(0xf0f0f0);

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

const loader = new GLTFLoader();

export function threejs(user: user, gltfList: Map<string, GLTF>, userList: Map<any, any>, keylist: keylist) {
    if (typeof window !== "undefined") {
        const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, -18, 20);
        camera.lookAt(0, -5, 0);
        const renderer = new Three.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        loader.load('/model/scene.gltf', function (gltf) {

            scene.add(gltf.scene);
            function animate() {
                requestAnimationFrame(animate);

                if (keylist["ArrowUp"]) velocity.y += a;
                if (keylist["ArrowDown"]) velocity.y -= a;
                if (keylist["ArrowLeft"]) velocity.x -= a;
                if (keylist["ArrowRight"]) velocity.x += a;

                velocity.x = Math.min(Math.max(velocity.x, -max), max);
                velocity.y = Math.min(Math.max(velocity.y, -max), max);

                gltf.scene.position.add(velocity);

                gltf.scene.position.x = Math.min(Math.max(gltf.scene.position.x, -15), 15);
                gltf.scene.position.y = Math.min(Math.max(gltf.scene.position.y, -15), 15);
                user.x = gltf.scene.position.x;
                user.y = gltf.scene.position.y;

                velocity.multiplyScalar(friction);

                for (const name of gltfList.keys()) {
                    const gltf = gltfList.get(name);
                    const user: user = userList.get(name);
                    if (gltf && user) {
                        gltf.scene.position.x = user.x;
                        gltf.scene.position.y = user.y;
                    }
                }

                renderer.render(scene, camera);
            }
            animate();

        }, undefined, function (error) {
            console.error('An error occurred loading the model:', error);
        });

        return { renderer, camera, scene };
    }
}
