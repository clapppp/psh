'use client'

import { useEffect, useRef, useState } from "react";
import * as Three from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type user = {
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
    const [init, setInit] = useState(false);

    useEffect(() => {
        const username = "User_" + String(new Date().getTime()).substring(10);
        const user: user = { name: username, x: 0, y: 0 };
        const userList = new Map();
        let intervalId: NodeJS.Timeout;

        const ws = new WebSocket('wss://solid-capybara-gp4qpq676v4hw654-3000.app.github.dev/api/socket');
        ws.onopen = () => {
            intervalId = setInterval(() => {
                ws.send(JSON.stringify(user));
            }, 3000);
            console.log('Websocket connection Established');
        }
        ws.onmessage = (event) => {
            Object.entries(JSON.parse(event.data)).forEach(([key, value]) => {
                userList.set(key, value);
            });
        }
        ws.onclose = () => {
            console.log('disconnected');
        }

        const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, -18, 20);
        camera.lookAt(0, -5, 0);

        const scene = new Three.Scene();
        scene.background = new Three.Color(0xf0f0f0);

        const renderer = new Three.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const ambientLight = new Three.AmbientLight(0xffffff, 1);  // Increased intensity
        scene.add(ambientLight);

        const directionalLight = new Three.DirectionalLight(0xffffff, 2);  // Stronger directional light
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

        const geometry = new Three.PlaneGeometry(30, 30);
        const material = new Three.MeshStandardMaterial({ color: 0xffffff });
        const floor = new Three.Mesh(geometry, material);
        scene.add(floor);

        const velocity = new Three.Vector3(0, 0, 0);
        const a = 0.01;
        const max = 0.2;
        const friction = 0.98;

        const loader = new GLTFLoader();
        loader.load('/model/scene.gltf', function (gltf) {
            scene.add(gltf.scene);
            function animate() {
                requestAnimationFrame(animate);

                if (keylist["ArrowUp"]) velocity.y += a;
                if (keylist["ArrowDown"]) velocity.y -= a;
                if (keylist["ArrowLeft"]) velocity.x -= a;
                if (keylist["ArrowRight"]) velocity.x += a;

                velocity.x = Math.min(Math.max(velocity.x, -max), max);
                velocity.y = Math.min(Math.max(velocity.y, -max), max);

                gltf.scene.position.add(velocity);

                gltf.scene.position.x = Math.min(Math.max(gltf.scene.position.x, -15), 15);
                gltf.scene.position.y = Math.min(Math.max(gltf.scene.position.y, -15), 15);
                user.x = gltf.scene.position.x;
                user.y = gltf.scene.position.y;

                velocity.multiplyScalar(friction);

                renderer.render(scene, camera);
            }
            animate();

        }, undefined, function (error) {
            console.error('An error occurred loading the model:', error);
        });




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

{/* <div className={`${isNameEntered ? 'hidden' : ''}`}>
    <NameModal setname={setUsername} setentered={setIsNameEntered} />
</div> */}
