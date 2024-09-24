import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gltfList, nameList, user, userList } from "./type";
import { addToScene, createMesh, removeFromScene } from "./manageThree";
import { emptyName, emptyUser } from "./data";

let usersList: userList;
let gltfsList: gltfList;
let namesList: nameList;
let username: string;

export function initMap(
  uList: userList,
  gList: gltfList,
  nList: nameList,
  name: string
) {
  usersList = uList;
  gltfsList = gList;
  namesList = nList;
  username = name;
}

export function updateMap(event: MessageEvent<any>) {
  const updateMap = new Map<string, user>(JSON.parse(event.data));
  console.log(updateMap);
  updateMap.forEach((value, key) => {
    console.log(username);
    if (key === username) {
      console.log(key);
      return; //본인은 관리 X
    }
    if (!usersList.has(key)) addGltf(key, gltfsList); //처음 들어온 클라는 gltf에 추가
    usersList.set(key, value);
  }); //여기까지 받아온 데이터를 돌면서 처음들어온 클라, 기존 클라 업데이트 진행

  removeUser(updateMap);
}

export function getGltfListKeys() {
  return gltfsList.keys();
}
export function gltfListGet(name: string) {
  return gltfsList.get(name);
}
export function userListGet(name: string) {
  return usersList.get(name) ?? emptyUser;
}
export function nameListGet(name: string) {
  return namesList.get(name) ?? emptyName;
}

function removeUser(updateMap: Map<string, user>) {
  //여기부턴 업데이트한 리스트 돌면서 없는 유저 렌더링 지우기.
  usersList.forEach((value, key) => {
    if (!updateMap.has(key)) {
      usersList.delete(key);
      const gltfToRemove = gltfsList.get(key)?.scene;
      gltfsList.delete(key);
      const name = namesList.get(key);
      namesList.delete(key);
      if (gltfToRemove && name) removeFromScene(gltfToRemove, name);
    }
  });
}

function addGltf(key: string, gltfList: Map<string, GLTF>) {
  const loader = new GLTFLoader();
  loader.load("/model/scene.gltf", function (gltf) {
    const mesh = createMesh(key, false);
    namesList.set(key, mesh);
    gltfList.set(key, gltf);
    addToScene(gltf.scene, mesh);
  });
}
