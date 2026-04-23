import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function MushroomMesh() {
  const group = useRef();
  const glowLight = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y += 0.005;
    if (glowLight.current) glowLight.current.intensity = 0.8 + Math.sin(t * 1.5) * 0.6;
  });

  const capPts = [];
  for (let i = 0; i <= 32; i++) {
    const t = i / 32;
    const angle = t * Math.PI * 0.72;
    capPts.push(new THREE.Vector2(Math.sin(angle) * 1.55, 1.9 + (1 - Math.cos(angle)) * 0.95));
  }
  const underPts = [
    new THREE.Vector2(0, 1.9), new THREE.Vector2(0.4, 1.85),
    new THREE.Vector2(0.9, 1.78), new THREE.Vector2(1.35, 1.68),
    new THREE.Vector2(1.55, 1.55),
  ];
  const stemPts = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    stemPts.push(new THREE.Vector2(0.28 - t * 0.06 + Math.sin(t * Math.PI) * 0.055, t * 1.9));
  }
  const veilPts = [
    new THREE.Vector2(0.28, 1.05), new THREE.Vector2(0.52, 0.92), new THREE.Vector2(0.42, 0.80),
  ];
  const gills = Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2;
    return Array.from({ length: 13 }, (_, j) => {
      const s = j / 12;
      return new THREE.Vector3(Math.cos(angle) * (0.18 + s * 1.28), 1.88 - s * 0.1 - Math.sin(s * Math.PI) * 0.06, Math.sin(angle) * (0.18 + s * 1.28));
    });
  });
  const spots = [
    { x: 0.872, y: 2.128, z: 0.503, r: 0.055 },
    { x: 0, y: 2.446, z: 1.402, r: 0.055 },
    { x: -1.117, y: 2.274, z: 0.521, r: 0.055 },
    { x: -1.308, y: 2.635, z: -0.755, r: 0.055 },
    { x: 0, y: 2.328, z: -1.296, r: 0.055 },
    { x: 1.087, y: 2.173, z: 0, r: 0.055 },
    { x: 0.741, y: 2.571, z: 1.283, r: 0.055 },
    { x: -0.993, y: 2.768, z: 1.183, r: 0.055 },
    { x: -1.158, y: 2.274, z: -0.421, r: 0.055 },
    { x: 1.283, y: 2.571, z: -0.741, r: 0.055 },
  ];
  const babies = [
    { x: -1.8, z: 0.6, scale: 0.38 }, { x: 1.9, z: -0.5, scale: 0.42 },
    { x: -0.9, z: -1.7, scale: 0.28 }, { x: 1.2, z: 1.6, scale: 0.32 },
  ];

  const darkCap = <meshStandardMaterial color="#0a2410" emissive="#003a0c" emissiveIntensity={0.5} roughness={0.7} metalness={0.05} envMapIntensity={0} />;
  const darkStem = <meshStandardMaterial color="#040c05" emissive="#001204" emissiveIntensity={0.08} roughness={0.95} envMapIntensity={0} />;

  return (
    <group ref={group} position={[0, -1.6, 0]}>
      <ambientLight intensity={0.35} color="#001a08" />
      <pointLight position={[2, 4, 2]} intensity={0.8} color="#002a0c" />
      <pointLight ref={glowLight} position={[0, 2.8, 0]} intensity={0.6} color="#00ff41" distance={4} />

      {/* Ground rings */}
      {[1.0, 1.8, 2.8].map((r, i) => (
        <mesh key={i} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.04, r, 64]} />
          <meshBasicMaterial color="#00ff41" transparent opacity={0.06 - i * 0.015} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Mycelium threads */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const len = 1.4 + (i % 3) * 0.7;
        return (
          <line key={i}>
            <bufferGeometry setFromPoints={[new THREE.Vector3(0, 0.02, 0), new THREE.Vector3(Math.cos(angle) * len, 0.02, Math.sin(angle) * len)]} />
            <lineBasicMaterial color="#00ff41" transparent opacity={0.12} />
          </line>
        );
      })}

      {/* Stem */}
      <mesh castShadow>
        <latheGeometry args={[stemPts, 32]} />
        {darkStem}
      </mesh>

      {/* Veil */}
      <mesh>
        <latheGeometry args={[veilPts, 24]} />
        <meshStandardMaterial color="#040c05" emissive="#003a10" emissiveIntensity={0.2} roughness={0.9} transparent opacity={0.9} envMapIntensity={0} />
      </mesh>

      {/* Underside */}
      <mesh>
        <latheGeometry args={[underPts, 48]} />
        <meshStandardMaterial color="#030a04" emissive="#001a06" emissiveIntensity={0.1} roughness={0.95} side={THREE.DoubleSide} envMapIntensity={0} />
      </mesh>

      {/* Gills */}
      {gills.map((pts, i) => (
        <line key={i}>
          <bufferGeometry setFromPoints={pts} />
          <lineBasicMaterial color="#00ff41" transparent opacity={0.15} />
        </line>
      ))}

      {/* Main cap — DARK */}
      <mesh castShadow>
        <latheGeometry args={[capPts, 64]} />
        {darkCap}
      </mesh>

      {/* Glowing spots — these should be the ONLY bright things */}
      {spots.map((s, i) => {
        const ref = useRef();
        useFrame(({ clock }) => {
          if (ref.current) ref.current.emissiveIntensity = 2 + Math.sin(clock.elapsedTime * 2 + i * 0.8) * 1.5;
        });
        return (
          <mesh key={i} position={[s.x, s.y, s.z]}>
            <sphereGeometry args={[s.r, 10, 10]} />
            <meshStandardMaterial ref={ref} color="#a0ffb0" emissive="#00ff41" emissiveIntensity={2} roughness={0} envMapIntensity={0} />
          </mesh>
        );
      })}

      {/* Baby mushrooms */}
      {babies.map((b, i) => {
        const bCapPts = Array.from({ length: 17 }, (_, j) => {
          const t = j / 16; const angle = t * Math.PI * 0.68;
          return new THREE.Vector2(Math.sin(angle) * 0.7, 0.85 + (1 - Math.cos(angle)) * 0.42);
        });
        const bStemPts = [new THREE.Vector2(0.12, 0), new THREE.Vector2(0.11, 0.4), new THREE.Vector2(0.10, 0.85)];
        return (
          <group key={i} position={[b.x, 0, b.z]} scale={b.scale}>
            <mesh><latheGeometry args={[bStemPts, 12]} /><meshStandardMaterial color="#040c05" emissive="#001204" emissiveIntensity={0.06} roughness={0.95} envMapIntensity={0} /></mesh>
            <mesh><latheGeometry args={[bCapPts, 24]} /><meshStandardMaterial color="#050f07" emissive="#001a06" emissiveIntensity={0.1} roughness={0.9} envMapIntensity={0} /></mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function Bottle3D({ height = 480 }) {
  return (
    <div style={{ width: '100%', height }} className="relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-72 h-72 rounded-full glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.14) 0%, transparent 70%)' }} />
      </div>
      <Canvas camera={{ position: [0, 1.2, 6.5], fov: 44 }} gl={{ antialias: true, alpha: true }} shadows
        style={{ background: 'transparent', zIndex: 1, position: 'relative' }}>
        <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.7} floatingRange={[-0.12, 0.12]}>
          <MushroomMesh />
        </Float>
        <ContactShadows position={[0, -3.0, 0]} opacity={0.3} scale={7} blur={3} color="#00ff41" />
      </Canvas>
      <div className="absolute left-0 right-0 h-px scan-anim pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,65,.4),transparent)' }} />
    </div>
  );
}