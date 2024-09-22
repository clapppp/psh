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
const nameList = new Map<string, Three.Mesh>;

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
            const nameMesh = createMesh(user.name, true);
            scene.add(gltf.scene, nameMesh);
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
                nameMesh.position.copy(gltf.scene.position);
                nameMesh.position.z = 3;
                user.x = gltf.scene.position.x;
                user.y = gltf.scene.position.y;
                console.log(`name:${user.name}, x:${user.x}, y:${user.y}`);

                velocity.multiplyScalar(friction);

                for (const name of gltfList.keys()) {
                    const gltf = gltfList.get(name);
                    const user: user = userList.get(name);
                    const nowPos = new Three.Vector3(user.x, user.y, 0);
                    if (nowPos.equals(prevPos) && gltf) {
                        const pos = new Three.Vector3().addVectors(gltf.scene.position, cordList.get(name) ?? new Three.Vector3)
                        setPosition(gltf, pos, name);
                    }
                    else {
                        if (gltf && user) setPosition(gltf, nowPos, name);
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
            }
            animate();

        }, undefined, function (error) {
            console.error('An error occurred loading the model:', error);
        });

        return { renderer, camera, scene };
    }
}

export function addGltf(key: string, gltfList: Map<string, GLTF>) {
    const loader = new GLTFLoader();
    loader.load('/model/scene.gltf', function (gltf) {
        const mesh = createMesh(key, false);
        nameList.set(key, mesh)
        gltfList.set(key, gltf);
        scene.add(gltf.scene, mesh);
    })
}

function createMesh(text: string, isMe: boolean) {
    const nameGeometry = new Three.PlaneGeometry(2, 1);
    const nameTexture = new Three.MeshBasicMaterial({
        map: createTextTexture(text, isMe),
        transparent: true
    });

    const nameMesh = new Three.Mesh(nameGeometry, nameTexture);
    nameMesh.rotateX(Math.PI / 6);
    return nameMesh;
}

function createTextTexture(text: string, isMe: boolean) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;

    if (ctx) {
        ctx.fillStyle = isMe ? 'blue' : 'black';
        ctx.font = '48px GeistSans';
        ctx.fillText(text, 20, 90);
    }

    const texture = new Three.CanvasTexture(canvas);
    texture.minFilter = Three.LinearFilter;
    texture.magFilter = Three.LinearFilter;
    return texture
}

function setPosition(gltf: GLTF, pos: Three.Vector3, name: string) {
    gltf.scene.position.copy(pos);
    const nameMesh = nameList.get(name) ?? new Three.Mesh();
    nameMesh.position.copy(pos);
    nameMesh.position.z = 3;
}