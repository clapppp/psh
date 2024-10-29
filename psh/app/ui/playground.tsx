"use client";

import { useEffect, useRef, useState } from "react";
import * as Three from "three";
import { addListenerFunctions, cycle, ENDTOUCH, removeListenerFunctions } from "./lib/data";
import { cord, gltfListType, nameListType, userType, userListType } from "./lib/type";
import { updateMap } from "./lib/manageMap";
import { startThree } from "./lib/manageThree";

export const userList: userListType = new Map();
export const gltfList: gltfListType = new Map();
export const nameList: nameListType = new Map();
export const username = "User_" + String(new Date().getTime()).substring(10);
export const user: userType = { name: username, x: 0, y: 0 };

export default function Playground() {
  const threeRef = useRef<HTMLDivElement>(null);
  const mySelf = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false); //화면가리개
  const touchCord: cord = { x: ENDTOUCH, y: ENDTOUCH };
  const renderer = new Three.WebGLRenderer();
  const camera = new Three.PerspectiveCamera();
  let isRunning = true;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const ws = new WebSocket(
      "wss://solid-capybara-gp4qpq676v4hw654-3000.app.github.dev/api/socket"
      // "ws://localhost:3000/api/socket"
      // "ws://www.psh88.com/api/socket"
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

    startThree(renderer, camera, setInit, touchCord, isRunning);

    threeRef.current?.appendChild(renderer.domElement);

    addListenerFunctions(renderer, camera, touchCord, window, mySelf);

    return () => {
      isRunning = false;
      removeListenerFunctions(window, mySelf);
      renderer.dispose();
      clearInterval(intervalId);
      ws.close();
    };
  }, []);

  return (
    <div ref={mySelf}>
      <div
        className={`grid place-content-center bg-white h-screen ${init ? "hidden" : ""
          }`}
      >
        <p>loading...</p>
      </div>
      <div
        ref={threeRef}
        className={`${init ? "" : "hidden"} overflow-hidden`}
      />
    </div>
  );
}
