"use client";

import { useEffect, useRef, useState } from "react";
import * as Three from "three";
import { cycle, ENDTOUCH, listenerFunctions } from "./lib/data";
import { cord, gltfList, nameList, user, userList } from "./lib/type";
import { initMap, updateMap } from "./lib/manageMap";
import { initThree, startThree } from "./lib/manageThree";

const username = "User_" + String(new Date().getTime()).substring(10);

export default function Playground() {
  const threeRef = useRef<HTMLDivElement>(null);
  const mySelf = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false); //화면가리개
  const user: user = { name: username, x: 0, y: 0 };
  const userList: userList = new Map();
  const gltfList: gltfList = new Map();
  const nameList: nameList = new Map();
  const touchCord:cord = { x: ENDTOUCH, y: ENDTOUCH };
  initMap(userList, gltfList, nameList, username);

  const renderer = new Three.WebGLRenderer();
  const camera = new Three.PerspectiveCamera();
  const scene = new Three.Scene();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const ws = new WebSocket(
      "wss://solid-capybara-gp4qpq676v4hw654-3000.app.github.dev/api/socket"
      // "ws://34.47.112.250:3000/api/socket"
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

    initThree(renderer, camera, scene, user, setInit, touchCord);

    startThree();

    threeRef.current?.appendChild(renderer.domElement);

    const { handleResize, keydownEvent, keyupEvent, touchStart, touchMove, touchEnd } = listenerFunctions(
      renderer,
      camera,
      touchCord
    );

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", keydownEvent);
    window.addEventListener("keyup", keyupEvent);
    mySelf.current?.addEventListener("touchstart", touchStart);
    mySelf.current?.addEventListener("touchmove", touchMove);
    mySelf.current?.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", keydownEvent);
      window.removeEventListener("keyup", keyupEvent);
      mySelf.current?.removeEventListener("touchstart", touchStart);
      mySelf.current?.removeEventListener("touchmove", touchMove);
      mySelf.current?.removeEventListener("touchend", touchEnd);
      renderer.dispose();
      threeRef.current?.removeChild(renderer.domElement);
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
      <div ref={threeRef} className={`${init ? "" : "hidden"}`} />
    </div>
  );
}
