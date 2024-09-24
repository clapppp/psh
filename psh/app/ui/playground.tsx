"use client";

import { useEffect, useRef, useState } from "react";
import * as Three from "three";
import { cycle, listenerFunctions } from "./lib/data";
import { gltfList, nameList, user, userList } from "./lib/type";
import { initMap, updateMap } from "./lib/manageMap";
import { initThree, startThree } from "./lib/manageThree";

const username = "User_" + String(new Date().getTime()).substring(10);

export default function Playground() {
  const threeRef = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false); //화면가리개
  const user: user = { name: username, x: 0, y: 0 };
  const userList: userList = new Map();
  const gltfList: gltfList = new Map();
  const nameList: nameList = new Map();
  initMap(userList, gltfList, nameList, username);

  const renderer = new Three.WebGLRenderer();
  const camera = new Three.PerspectiveCamera();
  const scene = new Three.Scene();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const ws = new WebSocket(
      // "wss://solid-capybara-gp4qpq676v4hw654-3000.app.github.dev/api/socket"
      "ws://localhost:3000/api/socket"
    );

    ws.onopen = () => {
      intervalId = setInterval(() => {
        ws.send(JSON.stringify(user));
      }, cycle);
      console.log("websocket connected");
    };

    ws.onmessage = (event) => {
      updateMap(event);
    };

    ws.onclose = () => {
      console.log("websocket disconnected");
    };

    initThree(renderer, camera, scene, user);

    startThree();

    threeRef.current?.appendChild(renderer.domElement);
    setTimeout(() => setInit(true), 1000); // 화면가리개 - 고쳐야됨..

    const { handleResize, keydownEvent, keyupEvent } = listenerFunctions(
      renderer,
      camera
    );
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", keydownEvent);
    window.addEventListener("keyup", keyupEvent);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", keydownEvent);
      window.removeEventListener("keyup", keyupEvent);
      renderer.dispose();
      threeRef.current?.removeChild(renderer.domElement);
      clearInterval(intervalId);
      ws.close();
    };
  }, []);

  return (
    <>
      <div
        className={`grid place-content-center bg-white h-screen w-screen ${
          init ? "hidden" : ""
        }`}
      >
        <p>Loading...</p>
      </div>
      <div ref={threeRef} className={`${init ? "" : "hidden"} h-screen`} />
    </>
  );
}
