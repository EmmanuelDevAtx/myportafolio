import { useSettings } from "@/hooks/settingsContext";
import { useMotionValueEvent, useScroll } from "framer-motion";
import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

// TODO: Refactor all this ccode to use diferents models
const maxZoom = 8;
const minZoom = 90;


let cameraZoom = maxZoom;

export function TestThreeJs() {
  const [size, setSize] = useState<number>(0);
  const [scrollPositionY, setScrollPositionY] = useState<number>(0);
  const containerRef: any = useRef();
  const scene = new THREE.Scene();


  const { scrollY } = useScroll();
  const { isSmallScreen } = useSettings();

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
          gltf.scene.position.set(isSmallScreen? 1 : 4, 0, 0);
          scene.add(gltf.scene);
          earthModel = gltf.scene;
          setSize(1);

        }, undefined, function (error: any) {
          console.error(error);
        });

        containerRef.current.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry;
        const maxParticles = 8000;

        const porArray = new Float32Array(maxParticles * 3);
        
        for(let i = 0; i < maxParticles; i++){
            porArray[i] = (Math.random() - 0.5) * 700;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(porArray, 3));

        const material = new THREE.PointsMaterial({ size: 0.005});

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        particlesMesh.position.set(0,0,10);
        scene.add(particlesMesh);
        const ligth2 = new THREE.SpotLight("#ffffff", 1);
        ligth2.position.set(isSmallScreen? -2 : 1, 1, 1);
        ligth2.angle = isSmallScreen? 20 :110;
        ligth2.intensity = 10;
        scene.add(ligth2);


        const ligth = new THREE.SpotLight("#0554ff", 0);
        ligth.position.set(isSmallScreen? 3 : 6, 1, 1);
        ligth.angle = 20;
        ligth.intensity = 15;
        scene.add(ligth);

        const animate = () => {
          renderer.render(scene, camera);
          camera.position.z = cameraZoom;
          particlesMesh.position.x += 0.03;
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
  }, [isSmallScreen]);

  return (
    <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
  );
}
