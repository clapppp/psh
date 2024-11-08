import * as Three from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export type cord = {
  x: number;
  y: number;
};

export type userType = {
  gltf?: GLTF;
  name: string;
  x: number;
  y: number;
};

export type userListType = Map<string, userType>;
export type gltfListType = Map<string, GLTF>;
export type nameListType = Map<string, Three.Mesh>;

export type handleResizeType = () => void;
export type keydownEventType = (arg: KeyboardEvent) => void;
export type keyupEventType = (arg: KeyboardEvent) => void;
export type touchStartType = (arg: TouchEvent) => void;
export type touchMoveType = (arg: TouchEvent) => void;
export type touchEndType = (arg: TouchEvent) => void;

export type card = {
  date: Date;
  issue: string;
  solution: string;
};

export type noteContent = {
  content: string,
  datetime?: string,
  id?: number,
  title: string
}