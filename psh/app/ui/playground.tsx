'use client'

import { useEffect, useRef, useState } from "react";
import * as Three from 'three';
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { threejs } from "./threejs";

type user = {
    gltf?: GLTF,
    name: string,
    x: number,
    y: number
}

const keylist: { [key: string]: boolean } = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

export default function Playground() {
    const threeRef = useRef<HTMLDivElement>(null);
    const [init, setInit] = useState(false); //화면가리개
    const username = "User_" + String(new Date().getTime()).substring(10);
    const user: user = { name: username, x: 0, y: 0 };
    const userList = new Map();
    const gltfList = new Map<string, GLTF>();
    const cycle = 100;

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        const ws = new WebSocket('wss://solid-capybara-gp4qpq676v4hw654-3000.app.github.dev/api/socket');

        function addGltf(key: string) {
            const loader = new GLTFLoader();
            loader.load('/model/scene.gltf', function (gltf) {
                scene.add(gltf.scene);
                gltfList.set(key, gltf);
            })
        }

        ws.onopen = () => {
            intervalId = setInterval(() => {
                ws.send(JSON.stringify(user));
            }, cycle);
            console.log('websocket connected');
        }

        ws.onmessage = (event) => {
            const updateMap = new Map(Object.entries(JSON.parse(event.data)));
            updateMap.forEach((value, key) => {
                if (key === user.name) return; //본인은 관리 X
                if (!userList.has(key)) addGltf(key); //처음 들어온 클라는 gltf에 추가
                userList.set(key, value);
            })
            userList.forEach((value, key) => {
                if (!updateMap.has(key)) {
                    userList.delete(key);
                    const objectToRemove = gltfList.get(key)?.scene;
                    if (objectToRemove) scene.remove(objectToRemove);
                    gltfList.delete(key);
                }
            });
        }

        ws.onclose = () => {
            console.log('websocket disconnected');
        }

        const {
            renderer = new Three.WebGLRenderer(),
            camera = new Three.PerspectiveCamera(),
            scene = new Three.Scene()
        } = threejs(user, gltfList, userList, keylist) || {};


        threeRef.current?.appendChild(renderer.domElement);
        setTimeout(() => setInit(true), 1000); //고쳐야됨..

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        window.addEventListener('keydown', (event) => {
            if (event.key in keylist) {
                keylist[event.key] = true;
            }
        });
        window.addEventListener('keyup', (event) => {
            if (event.key in keylist) {
                keylist[event.key] = false;
            }
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            threeRef.current?.removeChild(renderer.domElement);
            clearInterval(intervalId);
            ws.close();
        };
    }, [])

    return (
        <>
            <div className={`grid place-content-center bg-white h-screen w-screen ${init ? 'hidden' : ''}`}>
                <p>Loading...</p>
            </div>
            <div ref={threeRef} className={`${init ? '' : 'hidden'}`} />
        </>
    )
}
