import { useMotionValueEvent, useScroll } from "framer-motion";
import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

// TODO: Refactor all this ccode to use diferents models
const maxZoom = 8;
const minZoom = 4;


let cameraZoom = maxZoom;

export function TestThreeJs() {
  const [size, setSize] = useState<number>(0);
  const [scrollPositionY, setScrollPositionY] = useState<number>(0);
  const containerRef: any = useRef();
  const scene = new THREE.Scene();


  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPositionY(latest);
    const persent = (latest * 100) / 1892;
    cameraZoom =  ((minZoom - maxZoom) * (persent / 100 ) + maxZoom);
    console.log(' cameraZoom  ', cameraZoom);
  })


  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      containerRef &&
      typeof containerRef !== "undefined"
    ) {
      let loadedObject: any;
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        );
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.04)
        scene.add(ambientLight)
        const camera = new THREE.PerspectiveCamera(
          50,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          1000
        );
        const mtlLoader = new MTLLoader();

        const loader = new GLTFLoader();
        let earthModel: any;
        let startsModel: any;
        loader.load('/three/earth/earth.gltf', function (gltf) {
          gltf.scene.position.set(2, 0, 0);
          scene.add(gltf.scene);
          earthModel = gltf.scene;
          setSize(1);

        }, undefined, function (error: any) {
          console.error(error);
        });

        loader.load('/three/earth/stars.gltf', function (gltf) {
          gltf.scene.position.set(2, 0, 0);
          scene.add(gltf.scene);
          startsModel = gltf.scene;
          setSize(1);

        }, undefined, function (error: any) {
          console.error(error);
        });

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(3, 1, 1);
        scene.add(light);

        containerRef.current.appendChild(renderer.domElement);


        // TODO: Check or change redering starts and check using shaders
        const addStarts = ()=>{
          const geometry = new THREE.SphereGeometry(0.06,24,24);
          const material = new THREE.MeshStandardMaterial( { color: 0xffffff});
          const star = new THREE.Mesh(geometry, material);
      
          const [x, y, z] = Array.from({ length: 3 }).map(()=> THREE.MathUtils.randFloatSpread(100));
          star.position.set(x, y, z);
          scene.add(star);
        }

        Array.from({ length: 1000 }).forEach(addStarts);

        const animate = () => {
          renderer.render(scene, camera);
          camera.position.z = cameraZoom;
          if (earthModel) {
            earthModel.rotation.y += 0.001;
          }
          if(startsModel){
            startsModel.rotation.y += 0.00005;

          }
          requestAnimationFrame(animate);
        };
        animate();
      
    }
  }, []);

  return (
    <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
  );
}
