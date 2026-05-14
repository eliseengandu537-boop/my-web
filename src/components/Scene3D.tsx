import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Knot() {
  const ref = useRef<Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.2;
      ref.current.rotation.y += d * 0.3;
    }
  });
  return (
    <mesh ref={ref} scale={1.6}>
      <torusKnotGeometry args={[1, 0.32, 220, 32]} />
      <MeshDistortMaterial color="#ff7a1a" distort={0.35} speed={2} roughness={0.15} metalness={0.6} />
    </mesh>
  );
}

function OrbitingCubes() {
  const group = useRef<any>(null);
  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.25;
  });
  return (
    <group ref={group}>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const r = 3.5;
        return (
          <Float key={i} speed={2} rotationIntensity={1.5} floatIntensity={1.2}>
            <mesh position={[Math.cos(a) * r, Math.sin(a * 2) * 0.5, Math.sin(a) * r]}>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#ffffff" : "#ff7a1a"} metalness={0.7} roughness={0.2} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export function Scene3D({ interactive = false }: { interactive?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ff7a1a" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ffffff" />
        <Stars radius={50} depth={50} count={1500} factor={3} fade speed={1} />
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
          <Knot />
        </Float>
        <OrbitingCubes />
        {interactive && <OrbitControls enableZoom={false} enablePan={false} />}
      </Suspense>
    </Canvas>
  );
}
