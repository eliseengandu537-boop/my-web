import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { AdditiveBlending, Color, DoubleSide, NormalBlending } from "three";
import type { Group, Mesh } from "three";

type ParticleCloud = {
  colors: Float32Array;
  positions: Float32Array;
};

function createGalaxyArms(count = 7600, branches = 4): ParticleCloud {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const radius = 6.9;
  const core = new Color("#ffffff");
  const inner = new Color("#ede9fe");
  const arm = new Color("#818cf8");
  const edge = new Color("#312e81");
  const color = new Color();

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const distance = Math.pow(Math.random(), 0.84) * radius;
    const edgeMix = distance / radius;
    const branchAngle = ((index % branches) / branches) * Math.PI * 2;
    const spiralAngle =
      branchAngle + distance * 1.82 + Math.sin(distance * 1.15 + branchAngle) * 0.12;
    const armSpread = 0.14 + Math.pow(edgeMix, 1.3) * 0.58;
    const diskThickness = (1 - edgeMix) * 0.2 + 0.035;
    const randomX = (Math.random() - 0.5) * armSpread;
    const randomY = (Math.random() - 0.5) * diskThickness;
    const randomZ = (Math.random() - 0.5) * armSpread;

    positions[offset] = Math.cos(spiralAngle) * distance + randomX;
    positions[offset + 1] = randomY + Math.sin(distance * 2.9 + branchAngle) * 0.03 * (1 - edgeMix);
    positions[offset + 2] = Math.sin(spiralAngle) * distance + randomZ;

    color
      .copy(core)
      .lerp(inner, edgeMix * 0.28)
      .lerp(arm, edgeMix * 0.82);
    if (edgeMix > 0.76) {
      color.lerp(edge, (edgeMix - 0.76) / 0.24);
    }

    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  return { positions, colors };
}

function createCoreCluster(count = 2400): ParticleCloud {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const white = new Color("#ffffff");
  const lavender = new Color("#ddd6fe");
  const blue = new Color("#bfdbfe");
  const color = new Color();

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const distance = Math.pow(Math.random(), 2.2) * 1.85;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const stretch = 1.35 - distance * 0.12;

    positions[offset] = Math.sin(phi) * Math.cos(theta) * distance * stretch;
    positions[offset + 1] = Math.cos(phi) * distance * 0.55;
    positions[offset + 2] = Math.sin(phi) * Math.sin(theta) * distance * stretch;

    color
      .copy(white)
      .lerp(lavender, Math.random() * 0.45)
      .lerp(blue, Math.random() * 0.12);
    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  return { positions, colors };
}

function createHaloCloud(count = 1800): ParticleCloud {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const near = new Color("#dbeafe");
  const far = new Color("#6366f1");
  const bright = new Color("#ffffff");
  const color = new Color();

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const distance = 4.5 + Math.random() * 4.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const flatten = 0.55 + Math.random() * 0.4;
    const brightness = Math.random();

    positions[offset] = Math.sin(phi) * Math.cos(theta) * distance;
    positions[offset + 1] = Math.cos(phi) * distance * flatten;
    positions[offset + 2] = Math.sin(phi) * Math.sin(theta) * distance;

    color
      .copy(far)
      .lerp(near, brightness * 0.75)
      .lerp(bright, Math.pow(brightness, 4));
    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  return { positions, colors };
}

function createStarField(
  count: number,
  width: number,
  height: number,
  depth: number,
): ParticleCloud {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const bright = new Color("#ffffff");
  const cool = new Color("#c4b5fd");
  const distant = new Color("#4f46e5");
  const color = new Color();

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const twinkle = Math.random();

    positions[offset] = (Math.random() - 0.5) * width;
    positions[offset + 1] = (Math.random() - 0.5) * height;
    positions[offset + 2] = (Math.random() - 0.5) * depth - 7;

    color
      .copy(distant)
      .lerp(cool, twinkle * 0.82)
      .lerp(bright, Math.pow(twinkle, 3));
    colors[offset] = color.r;
    colors[offset + 1] = color.g;
    colors[offset + 2] = color.b;
  }

  return { positions, colors };
}

function ParticleLayer({
  blending = AdditiveBlending,
  cloud,
  opacity,
  size,
}: {
  blending?: number;
  cloud: ParticleCloud;
  opacity: number;
  size: number;
}) {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[cloud.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[cloud.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        blending={blending}
        depthWrite={false}
        opacity={opacity}
        size={size}
        sizeAttenuation
        toneMapped={false}
        transparent
        vertexColors
      />
    </points>
  );
}

function DriftingStarField({
  count,
  depth,
  drift,
  height,
  opacity,
  size,
  width,
}: {
  count: number;
  depth: number;
  drift: number;
  height: number;
  opacity: number;
  size: number;
  width: number;
}) {
  const group = useRef<Group>(null);
  const [cloud] = useState(() => createStarField(count, width, height, depth));

  useFrame((state, delta) => {
    if (!group.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    group.current.rotation.y += delta * drift;
    group.current.position.y = Math.sin(elapsed * (0.08 + drift * 2.6)) * 0.22;
  });

  return (
    <group ref={group}>
      <ParticleLayer cloud={cloud} opacity={opacity} size={size} />
    </group>
  );
}

function GalacticShine() {
  const group = useRef<Group>(null);
  const ring = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current || !ring.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(elapsed * 0.9) * 0.045;

    group.current.scale.set(pulse, pulse, pulse);
    group.current.rotation.z = Math.sin(elapsed * 0.22) * 0.08;
    ring.current.rotation.z += delta * 0.1;
  });

  return (
    <group ref={group} position={[0.25, 0.15, 0.8]}>
      <mesh scale={[1.1, 1.1, 1]}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#ffffff"
          depthWrite={false}
          opacity={0.18}
          toneMapped={false}
          transparent
        />
      </mesh>
      <mesh scale={[2.15, 2.15, 1]}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#bfdbfe"
          depthWrite={false}
          opacity={0.09}
          toneMapped={false}
          transparent
        />
      </mesh>
      <mesh ref={ring} rotation={[0, 0, 0.18]} scale={[5.3, 1.65, 1]}>
        <ringGeometry args={[0.6, 1, 96]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#c4b5fd"
          depthWrite={false}
          opacity={0.08}
          side={DoubleSide}
          toneMapped={false}
          transparent
        />
      </mesh>
      <mesh rotation={[0, 0, 0.24]} scale={[7.8, 0.11, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#f8fafc"
          depthWrite={false}
          opacity={0.22}
          side={DoubleSide}
          toneMapped={false}
          transparent
        />
      </mesh>
      <mesh rotation={[0, 0, -0.34]} scale={[0.13, 5.2, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#dbeafe"
          depthWrite={false}
          opacity={0.18}
          side={DoubleSide}
          toneMapped={false}
          transparent
        />
      </mesh>
      <mesh rotation={[0, 0, -0.08]} scale={[4.6, 0.24, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#818cf8"
          depthWrite={false}
          opacity={0.12}
          side={DoubleSide}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
}

function RealGalaxy() {
  const system = useRef<Group>(null);
  const disk = useRef<Group>(null);
  const [arms] = useState(() => createGalaxyArms());
  const [core] = useState(() => createCoreCluster());
  const [halo] = useState(() => createHaloCloud());

  useFrame((state, delta) => {
    if (!system.current || !disk.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    system.current.position.x = 1.2 + Math.cos(elapsed * 0.16) * 0.16;
    system.current.position.y = 0.12 + Math.sin(elapsed * 0.28) * 0.08;
    system.current.rotation.y = 0.2 + Math.cos(elapsed * 0.14) * 0.06;
    disk.current.rotation.z += delta * 0.022;
    disk.current.rotation.x = Math.PI * 0.35 + Math.sin(elapsed * 0.12) * 0.03;
  });

  return (
    <group ref={system}>
      <group ref={disk} rotation={[Math.PI * 0.35, 0, -0.14]}>
        <mesh rotation={[0, 0, 0.08]} scale={[6.4, 2.2, 1]}>
          <circleGeometry args={[1, 64]} />
          <meshBasicMaterial
            blending={AdditiveBlending}
            color="#312e81"
            depthWrite={false}
            opacity={0.08}
            toneMapped={false}
            transparent
          />
        </mesh>
        <mesh rotation={[0, 0, -0.22]} scale={[8.1, 2.8, 1]}>
          <circleGeometry args={[1, 64]} />
          <meshBasicMaterial
            blending={NormalBlending}
            color="#1e1b4b"
            depthWrite={false}
            opacity={0.13}
            toneMapped={false}
            transparent
          />
        </mesh>
        <ParticleLayer cloud={halo} opacity={0.22} size={0.04} />
        <ParticleLayer cloud={arms} opacity={0.96} size={0.06} />
        <ParticleLayer cloud={core} opacity={1} size={0.12} />
      </group>
      <GalacticShine />
      <Sparkles
        color="#e0e7ff"
        count={70}
        noise={0.8}
        opacity={0.5}
        scale={[8.5, 4.5, 7]}
        size={3.8}
        speed={0.12}
      />
      <Sparkles
        color="#93c5fd"
        count={24}
        noise={0.3}
        opacity={0.35}
        scale={[3.5, 2, 3]}
        size={6.5}
        speed={0.08}
      />
    </group>
  );
}

export function Scene3D({ interactive = false }: { interactive?: boolean }) {
  return (
    <Canvas
      camera={{ fov: 40, position: [-0.4, 0.45, 10.4] }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#040612", 8, 24]} />
        <DriftingStarField
          count={1800}
          depth={24}
          drift={-0.01}
          height={15}
          opacity={0.56}
          size={0.03}
          width={24}
        />
        <DriftingStarField
          count={620}
          depth={14}
          drift={0.018}
          height={11}
          opacity={0.95}
          size={0.05}
          width={16}
        />
        <RealGalaxy />
        {interactive && (
          <OrbitControls
            enableDamping
            enablePan={false}
            enableZoom={false}
            maxAzimuthAngle={0.34}
            maxPolarAngle={Math.PI * 0.6}
            minAzimuthAngle={-0.34}
            minPolarAngle={Math.PI * 0.4}
            rotateSpeed={0.25}
            target={[1.1, 0.15, 0]}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
