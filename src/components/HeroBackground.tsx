import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uRandom;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float ratio = uResolution.x / uResolution.y;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= ratio;

    float t = uTime * 0.05;

    // 5 Centers with varied ranges and random offsets
    vec2 c1 = vec2(sin(t * 1.1 + uRandom.x) * 3.5, cos(t * 0.8 + uRandom.y) * 2.5);
    vec2 c2 = vec2(cos(t * 0.9 + uRandom.z) * 3.5, sin(t * 1.2 + uRandom.x * 2.0) * 2.5);
    vec2 c3 = vec2(sin(t * 0.7 + uRandom.y * 3.0) * 3.0, cos(t * 1.1 + uRandom.z * 1.5) * 2.5);
    vec2 c4 = vec2(cos(t * 1.3 - uRandom.y) * 3.2, sin(t * 0.9 + uRandom.x) * 2.2);
    vec2 c5 = vec2(sin(t * 0.8 + uRandom.z * 2.0) * 2.8, cos(t * 1.4 - uRandom.x) * 3.0);

    // Proximity check for all pairs (simplified)
    float b1 = smoothstep(1.5, 4.0, length(c1-c2)) * smoothstep(1.5, 4.0, length(c1-c3));
    float b2 = smoothstep(1.5, 4.0, length(c2-c1)) * smoothstep(1.5, 4.0, length(c2-c4));
    float b3 = smoothstep(1.5, 4.0, length(c3-c1)) * smoothstep(1.5, 4.0, length(c3-c5));
    float b4 = smoothstep(1.5, 4.0, length(c4-c2)) * smoothstep(1.5, 4.0, length(c4-c5));
    float b5 = smoothstep(1.5, 4.0, length(c5-c3)) * smoothstep(1.5, 4.0, length(c5-c4));

    // Soft distance fields
    float d1 = length(p - c1) * 0.6;
    float d2 = length(p - c2) * 0.5;
    float d3 = length(p - c3) * 0.7;
    float d4 = length(p - c4) * 0.55;
    float d5 = length(p - c5) * 0.65;

    // Weights - pow 2.2 for smaller, more defined blobs
    float w1 = (1.0 / pow(d1 + 0.1, 2.2)) * (0.4 + b1 * 0.6);
    float w2 = (1.0 / pow(d2 + 0.1, 2.2)) * (0.4 + b2 * 0.6);
    float w3 = (1.0 / pow(d3 + 0.1, 2.2)) * (0.4 + b3 * 0.6);
    float w4 = (1.0 / pow(d4 + 0.1, 2.2)) * (0.4 + b4 * 0.6);
    float w5 = (1.0 / pow(d5 + 0.1, 2.2)) * (0.4 + b5 * 0.6);

    float totalW = w1 + w2 + w3 + w4 + w5 + 1.0;

    vec3 colRed = vec3(0.75, 0.04, 0.15); // #C00B27
    vec3 colDeep = vec3(0.55, 0.01, 0.10); // Deeper red
    vec3 colPurple = vec3(0.25, 0.02, 0.20); // Dark accent
    vec3 bgColor = vec3(0.02, 0.016, 0.024); // #050406

    vec3 finalColor = (colRed * (w1 + w4) + colDeep * (w2 + w5) + colPurple * w3 + bgColor) / totalW;

// Add subtle vignetting - relaxed to allow corner reach
float vignette = smoothstep(3.5, 0.5, length(p));
finalColor *= vignette;

gl_FragColor = vec4(finalColor, 1.0);
}
`;

const ShaderPlane = () => {
const meshRef = useRef<THREE.Mesh>(null);
const { size } = useThree();

const uniforms = useMemo(
() => ({
  uTime: { value: 0 },
  uResolution: { value: new THREE.Vector2(size.width, size.height) },
  uRandom: { value: new THREE.Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10) }
}),
[]
);

useFrame((state) => {
if (meshRef.current) {
  (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
  (meshRef.current.material as THREE.ShaderMaterial).uniforms.uResolution.value.set(size.width, size.height);
}
});

return (
<mesh ref={meshRef}>
  <planeGeometry args={[2, 2]} />
  <shaderMaterial
    vertexShader={vertexShader}
    fragmentShader={fragmentShader}
    uniforms={uniforms}
    depthWrite={false}
    depthTest={false}
  />
</mesh>
);
};

export const HeroBackground = () => {
return (
<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
  <Canvas
    orthographic
    camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10, position: [0, 0, 1] }}
    gl={{ antialias: false, alpha: true }}
    dpr={[1, 1.5]}
  >
    <ShaderPlane />
  </Canvas>
  {/* Noise overlay for texture */}
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
</div>
);
};
