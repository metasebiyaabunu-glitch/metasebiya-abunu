import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { View3DMode } from '../../types';
import { Sun, Moon, Sparkles, Eye, RotateCcw, Maximize2 } from 'lucide-react';

interface Resort3DCanvasProps {
  mode: View3DMode;
  onModeChange?: (mode: View3DMode) => void;
  highlightedRoomId?: string;
}

export const Resort3DCanvas: React.FC<Resort3DCanvasProps> = ({
  mode,
  onModeChange,
  highlightedRoomId
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [lampOn, setLampOn] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  // Interaction refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const requestRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const cameraAngleRef = useRef<{ theta: number; phi: number; radius: number }>({
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    radius: 18
  });

  // Re-build 3D scene when mode or nightMode changes
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Background color based on mode and day/night
    if (isNightMode) {
      scene.background = new THREE.Color(0x0a0f1d);
      scene.fog = new THREE.FogExp2(0x0a0f1d, 0.015);
    } else {
      scene.background = new THREE.Color(0x87ceeb); // Sky blue
      scene.fog = new THREE.FogExp2(0xb0e0e6, 0.012);
    }

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;

    // Initial camera position by mode
    if (mode === 'resort') {
      cameraAngleRef.current = { theta: Math.PI / 4, phi: Math.PI / 3.5, radius: 24 };
      cameraTargetRef.current = new THREE.Vector3(0, 2, 0);
    } else if (mode === 'room') {
      cameraAngleRef.current = { theta: Math.PI / 6, phi: Math.PI / 3, radius: 10 };
      cameraTargetRef.current = new THREE.Vector3(0, 1, 0);
    } else if (mode === 'coffee') {
      cameraAngleRef.current = { theta: 0, phi: Math.PI / 3, radius: 6 };
      cameraTargetRef.current = new THREE.Vector3(0, 0.8, 0);
    } else if (mode === 'safari') {
      cameraAngleRef.current = { theta: Math.PI / 3, phi: Math.PI / 2.4, radius: 14 };
      cameraTargetRef.current = new THREE.Vector3(0, 1, 0);
    } else if (mode === 'keycard') {
      cameraAngleRef.current = { theta: 0, phi: Math.PI / 2, radius: 5 };
      cameraTargetRef.current = new THREE.Vector3(0, 0, 0);
    }

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Clear previous canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      isNightMode ? 0x223355 : 0xffffff,
      isNightMode ? 0.4 : 0.8
    );
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(
      isNightMode ? 0x6688cc : 0xfffaed,
      isNightMode ? 0.6 : 1.4
    );
    mainLight.position.set(15, 25, 15);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffeedd, 0.3);
    fillLight.position.set(-15, 10, -15);
    scene.add(fillLight);

    // Objects Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Particle Group for Steam / Sparkles
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    // BUILD OBJECTS BASED ON MODE
    if (mode === 'resort') {
      buildResortScene(mainGroup, isNightMode);
    } else if (mode === 'room') {
      buildRoomScene(mainGroup, lampOn, isNightMode);
    } else if (mode === 'coffee') {
      buildCoffeeCeremonyScene(mainGroup, particleGroup);
    } else if (mode === 'safari') {
      buildSafariScene(mainGroup, isNightMode);
    } else if (mode === 'keycard') {
      buildKeycardScene(mainGroup);
    }

    // 5. Animation Loop
    let particleCount = 0;
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      // Camera position calculation from spherical angles
      const { theta, phi, radius } = cameraAngleRef.current;
      const target = cameraTargetRef.current;

      camera.position.x = target.x + radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = target.y + radius * Math.cos(phi);
      camera.position.z = target.z + radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(target);

      // Auto rotation subtle animation
      if (!isDraggingRef.current) {
        if (mode === 'resort') {
          cameraAngleRef.current.theta += 0.0015;
        } else if (mode === 'keycard') {
          mainGroup.rotation.y += 0.015;
        } else if (mode === 'coffee') {
          // Animate steam particles
          particleGroup.children.forEach((p) => {
            const mat = (p as THREE.Mesh).material as THREE.MeshBasicMaterial;
            p.position.y += 0.012;
            p.scale.x += 0.005;
            p.scale.y += 0.005;
            mat.opacity -= 0.008;

            if (mat.opacity <= 0) {
              p.position.set((Math.random() - 0.5) * 0.2, 0.8, (Math.random() - 0.5) * 0.2);
              p.scale.set(0.08, 0.08, 0.08);
              mat.opacity = 0.6;
            }
          });
        } else if (mode === 'safari') {
          // Boat gently bobbing
          mainGroup.position.y = Math.sin(Date.now() * 0.002) * 0.1;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [mode, isNightMode, lampOn, highlightedRoomId]);

  // Mouse / Touch Orbit Interaction
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    previousMousePositionRef.current = { x: clientX, y: clientY };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - previousMousePositionRef.current.x;
    const deltaY = clientY - previousMousePositionRef.current.y;

    cameraAngleRef.current.theta -= deltaX * 0.008;
    cameraAngleRef.current.phi = Math.max(
      0.1,
      Math.min(Math.PI / 2 - 0.05, cameraAngleRef.current.phi - deltaY * 0.008)
    );

    previousMousePositionRef.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomAmount = e.deltaY * 0.01;
    cameraAngleRef.current.radius = Math.max(
      3,
      Math.min(45, cameraAngleRef.current.radius + zoomAmount)
    );
  };

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-amber-900/20 bg-slate-900 select-none">
      {/* 3D WebGL Canvas mount container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Mode Switcher Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-none">
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 pointer-events-auto">
          <button
            onClick={() => onModeChange && onModeChange('resort')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              mode === 'resort'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Resort View</span>
          </button>
          <button
            onClick={() => onModeChange && onModeChange('room')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              mode === 'room'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Room Tour</span>
          </button>
          <button
            onClick={() => onModeChange && onModeChange('coffee')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              mode === 'coffee'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>☕ Coffee Ceremony</span>
          </button>
          <button
            onClick={() => onModeChange && onModeChange('safari')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              mode === 'safari'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🐊 Lake Safari</span>
          </button>
        </div>

        {/* Ambient Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-amber-400 hover:bg-white/10 transition-all"
            title={isNightMode ? "Switch to Day" : "Switch to Sunset/Night"}
          >
            {isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {mode === 'room' && (
            <button
              onClick={() => setLampOn(!lampOn)}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl border backdrop-blur-md transition-all ${
                lampOn
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-slate-900/80 border-white/10 text-slate-400'
              }`}
            >
              💡 {lampOn ? 'Lamp ON' : 'Lamp OFF'}
            </button>
          )}
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg bg-slate-950/70 backdrop-blur-md border border-white/10 text-slate-300 text-[11px] flex items-center gap-2">
          <RotateCcw className="w-3 h-3 text-amber-400 animate-spin-slow" />
          <span>Drag to orbit 3D view • Scroll to zoom</span>
        </div>
      </div>

      {/* Mode Title Badge */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-bold text-xs tracking-wide uppercase shadow-lg">
          {mode === 'resort' && 'Wubete Resort & Twin Lakes'}
          {mode === 'room' && '3D Interactive Room Inspector'}
          {mode === 'coffee' && 'Traditional Ethiopian Coffee Ceremony'}
          {mode === 'safari' && 'Lake Chamo Crocodile Boat Safari'}
          {mode === 'keycard' && 'Wubete Golden VIP Keycard'}
        </span>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// THREE.JS SCENE BUILDERS
// ----------------------------------------------------------------------------

function buildResortScene(group: THREE.Group, isNight: boolean) {
  // 1. Terrain Base (Elevated Hill overlooking Twin Lakes)
  const terrainGeo = new THREE.CylinderGeometry(14, 18, 2, 32);
  const terrainMat = new THREE.MeshStandardMaterial({
    color: isNight ? 0x1b2e1e : 0x2d4a27, // Lush Ethiopian green hill
    roughness: 0.8,
  });
  const terrain = new THREE.Mesh(terrainGeo, terrainMat);
  terrain.position.y = -1;
  terrain.receiveShadow = true;
  group.add(terrain);

  // 2. Twin Lakes Water Base (Lake Chamo & Lake Abaya)
  const lakeGeo = new THREE.PlaneGeometry(50, 50);
  const lakeMat = new THREE.MeshStandardMaterial({
    color: isNight ? 0x051a2e : 0x1a5e8a,
    roughness: 0.1,
    metalness: 0.8,
    transparent: true,
    opacity: 0.85
  });
  const lake = new THREE.Mesh(lakeGeo, lakeMat);
  lake.rotation.x = -Math.PI / 2;
  lake.position.y = -2;
  group.add(lake);

  // 3. Hotel Main Building
  const hotelGeo = new THREE.BoxGeometry(6, 3.5, 4);
  const hotelMat = new THREE.MeshStandardMaterial({
    color: 0xf5eedc, // Warm stone
    roughness: 0.4,
  });
  const hotel = new THREE.Mesh(hotelGeo, hotelMat);
  hotel.position.set(0, 1.75, 0);
  hotel.castShadow = true;
  hotel.receiveShadow = true;
  group.add(hotel);

  // Glass Balconies
  const balconyGeo = new THREE.BoxGeometry(6.2, 0.4, 0.8);
  const balconyMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.2
  });
  const balcony1 = new THREE.Mesh(balconyGeo, balconyMat);
  balcony1.position.set(0, 1.2, 2);
  group.add(balcony1);

  const balcony2 = new THREE.Mesh(balconyGeo, balconyMat);
  balcony2.position.set(0, 2.7, 2);
  group.add(balcony2);

  // Hotel Roof (Traditional Gamo thatched/wooden architectural touch)
  const roofGeo = new THREE.ConeGeometry(5.2, 1.8, 4);
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x5c3a21,
    roughness: 0.9
  });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(0, 4.4, 0);
  roof.rotation.y = Math.PI / 4;
  group.add(roof);

  // 4. Infinity Swimming Pool
  const poolGeo = new THREE.BoxGeometry(4, 0.4, 3);
  const poolMat = new THREE.MeshStandardMaterial({
    color: 0x00d2ff,
    roughness: 0.1,
    metalness: 0.6
  });
  const pool = new THREE.Mesh(poolGeo, poolMat);
  pool.position.set(0, 0.05, 4.5);
  group.add(pool);

  // 5. Tropical Trees (Palm trees & Acacias)
  const treePositions = [
    [-5, 0, 2], [5, 0, 3], [-6, 0, -3], [6, 0, -2], [-3, 0, 6], [4, 0, 6]
  ];

  treePositions.forEach(([x, y, z]) => {
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.25, 2, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(x, y + 1, z);
    trunk.castShadow = true;
    group.add(trunk);

    const foliageGeo = new THREE.SphereGeometry(1.2, 8, 8);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1f6628, roughness: 0.8 });
    const foliage = new THREE.Mesh(foliageGeo, foliageMat);
    foliage.position.set(x, y + 2.4, z);
    foliage.castShadow = true;
    group.add(foliage);
  });
}

function buildRoomScene(group: THREE.Group, lampOn: boolean, isNight: boolean) {
  // Floor
  const floorGeo = new THREE.BoxGeometry(7, 0.2, 7);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.3 }); // Hardwood parquet
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = -0.1;
  floor.receiveShadow = true;
  group.add(floor);

  // Back Wall
  const wallGeo = new THREE.BoxGeometry(7, 3.5, 0.2);
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xf4eee0, roughness: 0.7 });
  const backWall = new THREE.Mesh(wallGeo, wallMat);
  backWall.position.set(0, 1.65, -3.4);
  backWall.receiveShadow = true;
  group.add(backWall);

  // Side Wall
  const sideWallGeo = new THREE.BoxGeometry(0.2, 3.5, 7);
  const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
  leftWall.position.set(-3.4, 1.65, 0);
  leftWall.receiveShadow = true;
  group.add(leftWall);

  // King Bed Frame
  const bedFrameGeo = new THREE.BoxGeometry(3.2, 0.6, 3.6);
  const bedFrameMat = new THREE.MeshStandardMaterial({ color: 0x3d2314 });
  const bedFrame = new THREE.Mesh(bedFrameGeo, bedFrameMat);
  bedFrame.position.set(0, 0.3, -1.2);
  bedFrame.castShadow = true;
  group.add(bedFrame);

  // Mattress & White Linen
  const mattressGeo = new THREE.BoxGeometry(3, 0.5, 3.4);
  const mattressMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
  const mattress = new THREE.Mesh(mattressGeo, mattressMat);
  mattress.position.set(0, 0.75, -1.2);
  mattress.castShadow = true;
  group.add(mattress);

  // Pillows
  const pillowGeo = new THREE.BoxGeometry(1.2, 0.2, 0.7);
  const pillowMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 });
  const p1 = new THREE.Mesh(pillowGeo, pillowMat);
  p1.position.set(-0.8, 1.05, -2.5);
  group.add(p1);

  const p2 = new THREE.Mesh(pillowGeo, pillowMat);
  p2.position.set(0.8, 1.05, -2.5);
  group.add(p2);

  // Bedside Tables & Lamps
  [-2.2, 2.2].forEach((xPos) => {
    const tableGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18 });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(xPos, 0.4, -2.6);
    table.castShadow = true;
    group.add(table);

    // Lamp
    const lampBaseGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.5);
    const lampMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8 });
    const lampBase = new THREE.Mesh(lampBaseGeo, lampMat);
    lampBase.position.set(xPos, 1.05, -2.6);
    group.add(lampBase);

    const shadeGeo = new THREE.ConeGeometry(0.3, 0.4, 16, 1, true);
    const shadeMat = new THREE.MeshStandardMaterial({
      color: lampOn ? 0xffea9f : 0xdddddd,
      emissive: lampOn ? 0xffb700 : 0x000000,
      emissiveIntensity: lampOn ? 0.8 : 0
    });
    const shade = new THREE.Mesh(shadeGeo, shadeMat);
    shade.position.set(xPos, 1.4, -2.6);
    group.add(shade);

    if (lampOn) {
      const pointLight = new THREE.PointLight(0xffaa44, 1.2, 5);
      pointLight.position.set(xPos, 1.3, -2.6);
      group.add(pointLight);
    }
  });

  // Balcony Glass Sliding Door & Scenic Backdrop
  const backdropGeo = new THREE.PlaneGeometry(6.6, 3.2);
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#f97316');
    grad.addColorStop(0.5, '#3b82f6');
    grad.addColorStop(1, '#1d4ed8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 180, 512, 76); // Lake Chamo representation
  }
  const backdropTex = new THREE.CanvasTexture(canvas);
  const backdropMat = new THREE.MeshBasicMaterial({ map: backdropTex });
  const backdrop = new THREE.Mesh(backdropGeo, backdropMat);
  backdrop.position.set(0, 1.6, 3.3);
  backdrop.rotation.y = Math.PI;
  group.add(backdrop);
}

function buildCoffeeCeremonyScene(group: THREE.Group, particleGroup: THREE.Group) {
  // Rekebot Tray Base (Traditional decorated wooden coffee tray)
  const rekebotGeo = new THREE.BoxGeometry(2.4, 0.4, 1.6);
  const rekebotMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.4 });
  const rekebot = new THREE.Mesh(rekebotGeo, rekebotMat);
  rekebot.position.set(0, 0.2, 0);
  rekebot.castShadow = true;
  group.add(rekebot);

  // Top White Ceramic Tray Surface
  const surfaceGeo = new THREE.BoxGeometry(2.3, 0.05, 1.5);
  const surfaceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
  const surface = new THREE.Mesh(surfaceGeo, surfaceMat);
  surface.position.set(0, 0.42, 0);
  group.add(surface);

  // 3D Clay Jebena (Ethiopian Black Pottery Coffee Pot)
  const bodyGeo = new THREE.SphereGeometry(0.35, 16, 16);
  const potteryMat = new THREE.MeshStandardMaterial({
    color: 0x1a110b, // Dark clay
    roughness: 0.6,
    metalness: 0.1
  });
  const jebenaBody = new THREE.Mesh(bodyGeo, potteryMat);
  jebenaBody.position.set(-0.6, 0.75, 0);
  jebenaBody.castShadow = true;
  group.add(jebenaBody);

  // Jebena Neck
  const neckGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.4, 12);
  const jebenaNeck = new THREE.Mesh(neckGeo, potteryMat);
  jebenaNeck.position.set(-0.6, 1.1, 0);
  group.add(jebenaNeck);

  // Jebena Handle
  const handleGeo = new THREE.TorusGeometry(0.2, 0.04, 8, 16, Math.PI);
  const jebenaHandle = new THREE.Mesh(handleGeo, potteryMat);
  jebenaHandle.position.set(-0.85, 0.85, 0);
  jebenaHandle.rotation.z = Math.PI / 2;
  group.add(jebenaHandle);

  // 6 Ceramic Cini Coffee Cups
  const ciniPositions = [
    [0.1, 0.48, -0.4], [0.4, 0.48, -0.4], [0.7, 0.48, -0.4],
    [0.1, 0.48, 0.2],  [0.4, 0.48, 0.2],  [0.7, 0.48, 0.2]
  ];

  ciniPositions.forEach(([x, y, z]) => {
    const cupGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.12, 12);
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const cup = new THREE.Mesh(cupGeo, cupMat);
    cup.position.set(x, y, z);
    cup.castShadow = true;
    group.add(cup);

    // Coffee inside cup
    const coffeeGeo = new THREE.CylinderGeometry(0.07, 0.05, 0.02, 12);
    const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x1f0e04, roughness: 0.2 });
    const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffee.position.set(x, y + 0.05, z);
    group.add(coffee);
  });

  // Incense Burner (Girgira / Frankincense Smoke)
  const girgiraGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.3, 12);
  const girgiraMat = new THREE.MeshStandardMaterial({ color: 0x2d1f10 });
  const girgira = new THREE.Mesh(girgiraGeo, girgiraMat);
  girgira.position.set(0, 0.58, 0.5);
  group.add(girgira);

  // Create particles for frankincense steam/smoke
  const smokeGeo = new THREE.SphereGeometry(0.06, 8, 8);
  for (let i = 0; i < 15; i++) {
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: Math.random() * 0.6
    });
    const p = new THREE.Mesh(smokeGeo, smokeMat);
    p.position.set(
      (Math.random() - 0.5) * 0.1,
      0.8 + Math.random() * 0.6,
      (Math.random() - 0.5) * 0.1
    );
    particleGroup.add(p);
  }
}

function buildSafariScene(group: THREE.Group, isNight: boolean) {
  // Lake Surface
  const lakeGeo = new THREE.PlaneGeometry(24, 24);
  const lakeMat = new THREE.MeshStandardMaterial({
    color: isNight ? 0x0a2540 : 0x1e6091,
    roughness: 0.1,
    metalness: 0.7
  });
  const lake = new THREE.Mesh(lakeGeo, lakeMat);
  lake.rotation.x = -Math.PI / 2;
  group.add(lake);

  // Safari Boat
  const boatGeo = new THREE.BoxGeometry(1.8, 0.6, 4.5);
  const boatMat = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.6 });
  const boat = new THREE.Mesh(boatGeo, boatMat);
  boat.position.set(0, 0.3, 0);
  boat.castShadow = true;
  group.add(boat);

  // Canopy Roof
  const roofGeo = new THREE.BoxGeometry(2, 0.1, 3.8);
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(0, 1.8, 0);
  group.add(roof);

  // Support poles
  [-0.8, 0.8].forEach((x) => {
    [-1.6, 1.6].forEach((z) => {
      const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(x, 1.1, z);
      group.add(pole);
    });
  });

  // Crocodile Silhouette on sandy shore
  const crocodileGeo = new THREE.BoxGeometry(0.6, 0.15, 2.2);
  const crocMat = new THREE.MeshStandardMaterial({ color: 0x223311, roughness: 0.9 });
  const croc = new THREE.Mesh(crocodileGeo, crocMat);
  croc.position.set(5, 0.1, -3);
  croc.rotation.y = Math.PI / 4;
  group.add(croc);
}

function buildKeycardScene(group: THREE.Group) {
  // Golden VIP Card
  const cardGeo = new THREE.BoxGeometry(3.4, 2.1, 0.08);
  const cardMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Gold
    metalness: 0.9,
    roughness: 0.2
  });
  const card = new THREE.Mesh(cardGeo, cardMat);
  card.castShadow = true;
  group.add(card);

  // Card Chip
  const chipGeo = new THREE.BoxGeometry(0.5, 0.4, 0.02);
  const chipMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95 });
  const chip = new THREE.Mesh(chipGeo, chipMat);
  chip.position.set(-1, 0.3, 0.05);
  group.add(chip);
}
