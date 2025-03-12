"use client";

import { useEffect, useRef, useState } from "react";
import * as Three from "three";
import { addListenerFunctions, cycle, ENDTOUCH, removeListenerFunctions} from "../../lib/data";
import { cord, gltfListType, nameListType, userType, userListType } from "../../lib/type";
import { updateMap } from "../../lib/manageMap";
import { startRendering, startThree, stopRendering } from "../../lib/manageThree";
import Chat from "./chat";

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

  useEffect(() => {
    startRendering();

    let intervalId: NodeJS.Timeout;
    
    const wsUrl = `wss://${window.location.host}/api/play`;
    const ws = new WebSocket(wsUrl);

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

    startThree(renderer, camera, setInit, touchCord);

    threeRef.current?.appendChild(renderer.domElement);

    addListenerFunctions(renderer, camera, touchCord, window, mySelf);

    return () => {
      removeListenerFunctions(window, mySelf);
      renderer.dispose();
      clearInterval(intervalId);
      ws.close();
      stopRendering();
    };
  }, []);

  return (
    <div ref={mySelf}>
      <div
        className={`grid place-content-center bg-white h-dvh ${init ? "hidden" : ""
          }`}
      >
        <p>loading...</p>
      </div>
      <div className="fixed z-10 right-2 top-2">
        <Chat />
      </div>
      <div
        ref={threeRef}
        className='overflow-hidden'
      />
    </div>
  );
}
