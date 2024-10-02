import * as Three from "three";
import { user } from "./type";

export function listenerFunctions(
  renderer: Three.WebGLRenderer,
  camera: Three.PerspectiveCamera
) {
  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  const keydownEvent = (event: KeyboardEvent) => {
    if (event.key in keylist) {
      keylist[event.key] = true;
    }
  };

  const keyupEvent = (event: KeyboardEvent) => {
    if (event.key in keylist) {
      keylist[event.key] = false;
    }
  };

  return { handleResize, keydownEvent, keyupEvent };
}

export const emptyUser: user = { name: "emptyUser", x: 0, y: 0 };

export const emptyName: Three.Mesh = new Three.Mesh();

export const keylist: { [key: string]: boolean } = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

export const frame = 60;
export const interval = 1000 / frame;
export const divideFrame = 2;
export const cycle = interval * divideFrame;
