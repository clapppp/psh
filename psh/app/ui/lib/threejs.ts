import * as Three from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { cycle, divideFrame, interval } from './data';

type user = {
    gltf?: GLTF,
    name: string,
    x: number,
    y: number
}

type keylist = {
    [key: string]: boolean
}

const speedList = new Map<string, Three.Vector3>;
const accelList = new Map<string, Three.Vector3>;
const cordList = new Map<string, Three.Vector3>;

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
            let prevPos = new Three.Vector3(0, 0, 0);
            let lastTime=0;
            scene.add(gltf.scene);
            function animate(currentTime:DOMHighResTimeStamp) {
                requestAnimationFrame(animate);

                if (currentTime - lastTime >= interval) {
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
                    console.log(`name:${user.name}, x:${user.x}, y:${user.y}`);

                    velocity.multiplyScalar(friction);

                    for (const name of gltfList.keys()) {
                        const gltf = gltfList.get(name);
                        const user: user = userList.get(name);
                        const nowPos = new Three.Vector3(user.x, user.y, 0);
                        if (nowPos.equals(prevPos)) {
                            gltf?.scene.position.copy(new Three.Vector3().addVectors(gltf.scene.position, cordList.get(name) ?? new Three.Vector3));
                        }
                        else {
                            if (gltf && user) gltf.scene.position.copy(nowPos);
                            if (!speedList.has(name)) speedList.set(name, new Three.Vector3(0, 0, 0));
                            const nowSpeed = new Three.Vector3().subVectors(nowPos, prevPos).divideScalar(0.1);
                            accelList.set(name, new Three.Vector3().subVectors(nowSpeed, speedList.get(name) ?? new Three.Vector3).divideScalar(cycle / 1000));
                            speedList.set(name, nowSpeed);
                            const nextPos = new Three.Vector3().addVectors(new Three.Vector3().addVectors(nowSpeed, accelList.get(name) ?? new Three.Vector3).multiplyScalar(cycle / 1000), nowPos);
                            cordList.set(name, new Three.Vector3().subVectors(nextPos, nowPos).divideScalar(divideFrame));
                            console.log(name, ' : set complete');
                        }
                    }

                    renderer.render(scene, camera);
                    console.log('render.');
                    lastTime = currentTime;
                }
            }
            requestAnimationFrame(animate);

        }, undefined, function (error) {
            console.error('An error occurred loading the model:', error);
        });

        return { renderer, camera, scene };
    }
}

export function addGltf(key: string, gltfList: Map<string, GLTF>) {
    const loader = new GLTFLoader();
    loader.load('/model/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        gltfList.set(key, gltf);
    })
}