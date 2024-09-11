import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js"
import * as Three from 'three'

export function listenerFunctions( renderer:Three.WebGLRenderer, camera:Three.PerspectiveCamera ) {
    const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    };

    const keydownEvent = (event: KeyboardEvent) => {
        if (event.key in keylist) {
            keylist[event.key] = true;
        }
    };

    const keyupEvent = (event: KeyboardEvent) => {
        if (event.key in keylist) {
            keylist[event.key] = false;
        }
    };

    return { handleResize, keydownEvent, keyupEvent };
}

export type user = {
    gltf?: GLTF,
    name: string,
    x: number,
    y: number
}

export const keylist: { [key: string]: boolean } = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

export const cycle = 100;