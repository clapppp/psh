'use client'

import { useEffect, useRef } from 'react';
import * as Three from 'three';


export default function Dog() {
    const threeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new Three.Scene();

        const camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);

        const renderer = new Three.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        threeRef.current?.appendChild(renderer.domElement);



        function animate() {
            requestAnimationFrame(animate);
            renderer.render(camera,);
        }
        animate();
        
    }, [])

    return (
        <div ref={threeRef} />
    )
}