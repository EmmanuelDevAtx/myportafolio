import { useSettings } from "@/hooks/settingsContext";
import { useTheme } from "@mui/material";
import { useMotionValueEvent, useScroll } from "framer-motion";
import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer, GLTFLoader, OrbitControls, RenderPass, UnrealBloomPass } from "three/examples/jsm/Addons.js";
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
  const { isSmallScreen, isDarkMode } = useSettings();
  const theme = useTheme();

  /**
   * This is to change the position of the camera, it calculate the position of the current scroll as percent,
   * so it neeed the change 1892 for the total scroll os page
   */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPositionY(latest);
    const persent = (latest * 100) / 1892;
    cameraZoom = ((minZoom - maxZoom) * (persent / 100) + maxZoom);
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
      renderer.setClearColor(0x000000, 0.0);
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );

      /**
       * This code its to add the ambien of ligth, as the SUN, don't forget that the material of the object
       * will be afected
       */
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.04)
      scene.add(ambientLight)
      const camera = new THREE.PerspectiveCamera(
        50,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );

      /**
       * This is to load the earth export by blender with extencion .GLTF , don't
       * forget import all files the .GLTF and .BIN the route of the file is public/
       */
      const loader = new GLTFLoader();
      let earthModel: any;
      loader.load('/three/earth/earth.gltf', function (gltf) {
        gltf.scene.position.set(isSmallScreen ? 1 : 4, 0, 0);
        scene.add(gltf.scene);
        earthModel = gltf.scene;
        setSize(1);

      }, undefined, function (error: any) {
        console.error(error);
      });


      /**
       * This code its to add stars as particles, with random position, need to be a sphere
       */
      containerRef.current.appendChild(renderer.domElement);
      const particlesGeometry = new THREE.BufferGeometry();
      const maxParticles = 7000;
      const porArray = new Float32Array(maxParticles * 3);
      for (let i = 0; i < maxParticles; i++) {
        porArray[i] = (Math.random() - 0.5) * 1000;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(porArray, 3));
      const material = new THREE.PointsMaterial({ size: 0.5, color: isDarkMode ? 'white' : 'black' });
      const particlesMesh = new THREE.Points(particlesGeometry, material);
      particlesMesh.position.set(0, 2, 9);
      scene.add(particlesMesh);

      /**
       *  This code it's to add the spot ligth to the earth, as white and blue
       */
      const ligth2 = new THREE.SpotLight("#ffffff", 1);
      ligth2.position.set(isSmallScreen ? -2 : 1, 1, 1);
      ligth2.angle = isSmallScreen ? 20 : 110;
      ligth2.intensity = 10;
      scene.add(ligth2);


      const ligth = new THREE.SpotLight("#0554ff", 0);
      ligth.position.set(isSmallScreen ? 3 : 6, 1, 1);
      ligth.angle = 20;
      ligth.intensity = 15;
      scene.add(ligth);


      /**
       * This code its a function to move the mouse 
       */

      let mouseX = 0;
      let mouseY = 0;

      const animateParticles = (event: any) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      }

      document.addEventListener('mousemove', animateParticles);


      /**
       * This code it gonna adding shaders using UnrealBloomPass
       * may be need be deleted, 'cause it not supor background transparent, and i use change theme'
       */

      const renderScene = new RenderPass(scene, camera);
      const composer = new EffectComposer(renderer);
      composer.addPass(renderScene);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(containerRef.current.clientWidth, containerRef.current.clientHeight),
        0.7,
        0.1,
        0.1
      );

      composer.addPass(bloomPass);
      /**
       * This is a function that is used to change wherever you want, it reder frame by frame
       */

      const clock = new THREE.Clock();
      const animate = () => {
        const elapsedTime = clock.getElapsedTime()
        renderer.render(scene, camera);
        camera.position.z = cameraZoom;
        camera.rotation.x = -mouseY * (elapsedTime * 0.00008);
        camera.rotation.y = -mouseX * (elapsedTime * 0.00008);

        composer.render();
        if (earthModel) {
          earthModel.rotation.y += 0.001;
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
