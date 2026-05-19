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
    
    // Centers with extreme range to reach absolute edges/corners
    // Aspect ratio is applied to P, so centers must also respect it or exceed it
    vec2 c1 = vec2(sin(t * 1.1 + uRandom.x) * 4.5, cos(t * 0.8 + uRandom.y) * 3.0);
    vec2 c2 = vec2(cos(t * 0.9 + uRandom.z) * 4.5, sin(t * 1.2 + uRandom.x * 2.0) * 3.0);
    vec2 c3 = vec2(sin(t * 0.7 + uRandom.y * 3.0) * 4.0, cos(t * 1.1 + uRandom.z * 1.5) * 3.5);

    // Proximity check: dim if centers touch
    float dist12 = length(c1 - c2);
    float dist13 = length(c1 - c3);
    float dist23 = length(c2 - c3);

    float b1 = smoothstep(2.0, 7.0, dist12) * smoothstep(2.0, 7.0, dist13);
    float b2 = smoothstep(2.0, 7.0, dist12) * smoothstep(2.0, 7.0, dist23);
    float b3 = smoothstep(2.0, 7.0, dist13) * smoothstep(2.0, 7.0, dist23);

    // Soft distance fields - very loose falloff for edge glow
    float d1 = length(p - c1) * 0.3;
    float d2 = length(p - c2) * 0.25;
    float d3 = length(p - c3) * 0.4;

    // Weights with proximity-based dimming - low pow (1.5) for massive glow spill
    float w1 = (1.0 / pow(d1 + 0.1, 1.5)) * (0.3 + b1 * 0.7);
    float w2 = (1.0 / pow(d2 + 0.1, 1.5)) * (0.3 + b2 * 0.7);
    float w3 = (1.0 / pow(d3 + 0.1, 1.5)) * (0.3 + b3 * 0.7);
    
    float totalW = w1 + w2 + w3 + 0.5;
    
    vec3 color1 = vec3(0.0, 0.4, 1.0); // #0066FF
    vec3 color2 = vec3(0.0, 0.2, 0.6); // #003399
    vec3 bgColor = vec3(0.02, 0.016, 0.024); // #050406
    
    vec3 finalColor = (color1 * w1 + color2 * w2 + bgColor * (w3 + 0.5)) / totalW;
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
