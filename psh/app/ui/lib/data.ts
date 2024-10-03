import * as Three from "three";
import { cord, user } from "./type";

export const ENDTOUCH = 9999;

export function listenerFunctions(
  renderer: Three.WebGLRenderer,
  camera: Three.PerspectiveCamera,
  touchCord: cord
) {
  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
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

  const touchStart = (event: TouchEvent) => {
    touchCord.x = event.touches[0].clientX;
    touchCord.y = event.touches[0].clientY;
  }
  
  const touchMove = (event: TouchEvent) => {
    touchCord.x = event.changedTouches[0].clientX;
    touchCord.y = event.changedTouches[0].clientY;
  }
  
  const touchEnd = (event: TouchEvent) => {
    touchCord.x = ENDTOUCH;
    touchCord.y = ENDTOUCH;
  }

  return { handleResize, keydownEvent, keyupEvent, touchStart, touchMove, touchEnd };
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
