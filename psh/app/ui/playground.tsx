'use client'

import { useEffect, useRef } from "react";
import * as Three from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Playground() {
    const threeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);  // Adjusted camera position

        const scene = new Three.Scene();
        scene.background = new Three.Color(0xeeeeee);  // Set a light background color

        const renderer = new Three.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);  // Handle high-DPI screens
        threeRef.current?.appendChild(renderer.domElement);

        const ambientLight = new Three.AmbientLight(0xffffff, 1);  // Increased intensity
        scene.add(ambientLight);

        const directionalLight = new Three.DirectionalLight(0xffffff, 2);  // Stronger directional light
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load('/model/scene.gltf', function (gltf) {
            console.log(gltf.scene);  // Log the model to inspect its contents
            scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error('An error occurred loading the model:', error);
        });


        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();  // Clean up renderer
            threeRef.current?.removeChild(renderer.domElement);  // Remove the canvas element
        };
    }, [])

    return (
        <div ref={threeRef} />
    )
}
