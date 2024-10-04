import * as Three from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ENDTOUCH, interval, keylist } from "./data";
import { cord, user } from "./type";
import {
  getGltfListKeys,
  gltfListGet,
  nameListGet,
  userListGet,
} from "./manageMap";

let camera = new Three.PerspectiveCamera(75, 1, 0.1, 100);
let scene = new Three.Scene();
let renderer = new Three.WebGLRenderer({ antialias: true });
let client: user;
let setInit: React.Dispatch<React.SetStateAction<boolean>>;
let touchCord: cord;

const ambientLight = new Three.AmbientLight(0xffffff, 1);
const directionalLight = new Three.DirectionalLight(0xffffff, 2);
const floor = new Three.Mesh(
  new Three.PlaneGeometry(30, 30),
  new Three.MeshStandardMaterial({ color: 0xffffff })
);
const velocity = new Three.Vector3(0, 0, 0);
const accel = 0.01;
const max = 0.2;
const friction = 0.98;
const loader = new GLTFLoader();
const planeZ = new Three.Plane(new Three.Vector3(0, 0, 1), 0)

export function initThree(
  newrenderer: Three.WebGLRenderer,
  newcamera: Three.PerspectiveCamera,
  newscene: Three.Scene,
  newclient: user,
  newsetInit: React.Dispatch<React.SetStateAction<boolean>>,
  newtouchCord: cord
) {
  renderer = newrenderer;
  camera = newcamera;
  scene = newscene;
  client = newclient;
  setInit = newsetInit;
  touchCord = newtouchCord;

  scene.background = new Three.Color(0xf0f0f0);
  directionalLight.position.set(5, 5, 5).normalize();
  camera.position.set(0, -30, 40);
  camera.lookAt(0, -5, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  document.documentElement.style.setProperty('--screenh', `${window.innerHeight}px`);

  addToScene(ambientLight, directionalLight, floor);
}

export function startThree() {
  let lastTime = 0;

  loader.load(
    "/model/scene.gltf",
    function (gltf) {
      const nameMesh = createMesh(client.name, true);
      addToScene(gltf.scene, nameMesh);
      function animate(time: DOMHighResTimeStamp) {
        requestAnimationFrame(animate);

        const deltaTime = time - lastTime;
        if (deltaTime > interval) {
          lastTime = time - (deltaTime % interval);
          manageKeyVelocity();
          manageTouchVelocity(gltf);
          controlVelocity();
          managePosition(gltf, nameMesh);
          //여기까지는 클라 본인꺼 렌더링.

          //여기부터는 다른유저들.
          for (const name of getGltfListKeys()) {
            const gltf = gltfListGet(name);
            const user = userListGet(name);
            const nameMesh = nameListGet(name);
            if (gltf) setPosition(gltf, user, nameMesh);
          }

          renderer.render(scene, camera);
        }
      }
      requestAnimationFrame(animate);
    },
    function (event) {
      if (event.eventPhase === event.AT_TARGET) setInterval(() => setInit(true), 300);
    },
    function (error) {
      console.error("An error occurred loading the model:", error);
    }
  );

  return;
}

export function removeFromScene(...object: Three.Object3D[]) {
  object.forEach((object) => {
    scene.remove(object);
  });
}

export function addToScene(...object: Three.Object3D[]) {
  object.forEach((object) => {
    scene.add(object);
  });
}

export function createMesh(text: string, isMe: boolean) {
  const nameGeometry = new Three.PlaneGeometry(2, 1);
  const nameTexture = new Three.MeshBasicMaterial({
    map: createTextTexture(text, isMe),
    transparent: true,
  });

  const nameMesh = new Three.Mesh(nameGeometry, nameTexture);
  nameMesh.rotateX(Math.PI / 6);
  return nameMesh;
}

function createTextTexture(text: string, isMe: boolean) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 256;
  canvas.height = 128;

  if (ctx) {
    ctx.fillStyle = isMe ? "blue" : "black";
    ctx.font = "48px GeistSans";
    ctx.fillText(text, 20, 90);
  }

  const texture = new Three.CanvasTexture(canvas);
  texture.minFilter = Three.LinearFilter;
  texture.magFilter = Three.LinearFilter;
  return texture;
}

function manageKeyVelocity() {
  if (keylist["ArrowUp"]) velocity.y += accel;
  if (keylist["ArrowDown"]) velocity.y -= accel;
  if (keylist["ArrowLeft"]) velocity.x -= accel;
  if (keylist["ArrowRight"]) velocity.x += accel;
}

function manageTouchVelocity(gltf: GLTF) {
  if (touchCord.x == ENDTOUCH && touchCord.y == ENDTOUCH) return;
  const point: Three.Vector3 = convertToSceneCoordinates();
  const direction: Three.Vector3 = new Three.Vector3().subVectors(point, gltf.scene.position);
  velocity.x += direction.x > 0 ? accel : -accel
  velocity.y += direction.y > 0 ? accel : -accel
}

function controlVelocity() {
  velocity.x = Math.min(Math.max(velocity.x, -max), max);
  velocity.y = Math.min(Math.max(velocity.y, -max), max);
  velocity.multiplyScalar(friction);
}

function managePosition(gltf: GLTF, nameMesh: Three.Mesh) {
  gltf.scene.position.add(velocity);
  gltf.scene.position.x = Math.min(Math.max(gltf.scene.position.x, -15), 15);
  gltf.scene.position.y = Math.min(Math.max(gltf.scene.position.y, -15), 15);
  nameMesh.position.copy(gltf.scene.position);
  nameMesh.position.z = 3;
  client.x = gltf.scene.position.x;
  client.y = gltf.scene.position.y;
}

function setPosition(gltf: GLTF, user: user, name: Three.Mesh) {
  gltf.scene.position.x = user.x;
  gltf.scene.position.y = user.y;
  name.position.copy(gltf.scene.position);
  name.position.z = 3;
}

function convertToSceneCoordinates() {
  const rect = renderer.domElement.getBoundingClientRect();
  const ndcX = (touchCord.x / rect.width) * 2 - 1;
  const ndcY = -(touchCord.y / rect.height) * 2 + 1;
  const raycaster = new Three.Raycaster();
  const pointer = new Three.Vector2(ndcX, ndcY);
  raycaster.setFromCamera(pointer, camera);

  const intersectPoint = new Three.Vector3();

  raycaster.ray.intersectPlane(planeZ, intersectPoint);
  return intersectPoint;
}