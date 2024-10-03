import * as Three from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export type cord = {
  x: number;
  y: number;
}

export type user = {
  gltf?: GLTF;
  name: string;
  x: number;
  y: number;
};

export type userList = Map<string, user>;
export type gltfList = Map<string, GLTF>;
export type nameList = Map<string, Three.Mesh>;
