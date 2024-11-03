import * as Three from "three";
import { cord, handleResizeType, keydownEventType, keyupEventType, noteContent, touchEndType, touchMoveType, touchStartType, userType } from "./type";
import { RefObject } from "react";

export const ENDTOUCH = 9999;

let handleResize: handleResizeType;
let keydownEvent: keydownEventType;
let keyupEvent: keyupEventType;
let touchStart: touchStartType;
let touchMove: touchMoveType;
let touchEnd: touchEndType;

export function setScreenHeight(window: Window) {
  document.documentElement.style.setProperty('--screenh', `${window.innerHeight}px`);
}

export function addListenerFunctions(
  renderer: Three.WebGLRenderer,
  camera: Three.PerspectiveCamera,
  touchCord: cord,
  window: Window,
  mySelf: RefObject<HTMLDivElement>
) {
  handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  keydownEvent = (event) => {
    if (event.key in keylist) keylist[event.key] = true;
  };

  keyupEvent = (event) => {
    if (event.key in keylist) keylist[event.key] = false;
  };

  touchStart = (event) => {
    event.preventDefault();
    touchCord.x = event.touches[0].clientX;
    touchCord.y = event.touches[0].clientY;
  }

  touchMove = (event) => {
    event.preventDefault();
    touchCord.x = event.changedTouches[0].clientX;
    touchCord.y = event.changedTouches[0].clientY;
  }

  touchEnd = (event) => {
    touchCord.x = ENDTOUCH;
    touchCord.y = ENDTOUCH;
  }

  window.addEventListener("resize", handleResize);
  window.addEventListener("keydown", keydownEvent);
  window.addEventListener("keyup", keyupEvent);
  mySelf.current?.addEventListener("touchstart", touchStart);
  mySelf.current?.addEventListener("touchmove", touchMove);
  mySelf.current?.addEventListener("touchend", touchEnd);
}

export function removeListenerFunctions(window: Window, mySelf: RefObject<HTMLDivElement>) {
  window.addEventListener("resize", handleResize);
  window.addEventListener("keydown", keydownEvent);
  window.addEventListener("keyup", keyupEvent);
  mySelf.current?.addEventListener("touchstart", touchStart);
  mySelf.current?.addEventListener("touchmove", touchMove);
  mySelf.current?.addEventListener("touchend", touchEnd);
  console.log('remove listener');
}

export const emptyUser: userType = { name: "emptyUser", x: 0, y: 0 };

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

export const errorData: noteContent = {
  content: "error",
  datetime: "",
  id: 0,
  title: "error"
} 