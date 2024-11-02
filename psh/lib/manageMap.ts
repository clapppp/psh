import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { addToScene, createMesh, removeFromScene } from "./manageThree";
import { emptyName, emptyUser } from "./data";
import { nameList, userList, gltfList, username } from "../app/ui/playground";
import { userType } from "./type";

export function updateMap(event: MessageEvent<any>) {
  const updateMap = new Map<string, userType>(JSON.parse(event.data));

  updateMap.forEach((value, key) => {
    if (key === username) return;           //본인은 관리 X
    if (!userList.has(key)) {
      userList.set(key, value);
      addGltf(key);                         //처음 들어온 클라는 gltf에 추가
    }
    userList.set(key, value);
  });                                       //여기까지 받아온 데이터를 돌면서 처음들어온 클라, 기존 클라 업데이트 진행

  removeUser(updateMap);
}

export function getGltfListKeys() {
  return gltfList.keys();
}
export function gltfListGet(name: string) {
  return gltfList.get(name);
}
export function userListGet(name: string) {
  return userList.get(name) ?? emptyUser;
}
export function nameListGet(name: string) {
  return nameList.get(name) ?? emptyName;
}

function removeUser(updateMap: Map<string, userType>) {
  //여기부턴 업데이트한 리스트 돌면서 없는 유저 렌더링 지우기.
  userList.forEach((value, key) => {
    if (!updateMap.has(key)) {
      userList.delete(key);
      const gltfToRemove = gltfList.get(key)?.scene;
      gltfList.delete(key);
      const name = nameList.get(key);
      nameList.delete(key);
      if (gltfToRemove && name) removeFromScene(gltfToRemove, name);
    }
  });
}

async function addGltf(key: string) {
  const nameMesh = createMesh(key, false);
  nameList.set(key, nameMesh);
  const loader = new GLTFLoader();
  loader.load("/model/scene.gltf", function (gltf) {
    gltfList.set(key, gltf);
    addToScene(gltf.scene, nameMesh);
  });
}
