import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, Float, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

interface MousePos { x: number; y: number }
interface Props { mousePos: MousePos; scrollY?: number }

function CameraRig({ scrollY = 0 }: { scrollY: number }) {
  const { camera } = useThree()
  useFrame(() => {
    const target = 3.2 + scrollY * 0.8
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target, 0.05)
  })
  return null
}

function Robot({ mousePos }: { mousePos: MousePos }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/RobotExpressive.glb')
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    const keys = Object.keys(actions)
    const idle = actions['Idle'] ?? actions[keys[0]]
    if (idle) idle.reset().fadeIn(0.5).play()
    return () => { actions['Idle']?.stop() }
  }, [actions])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mousePos.x * 0.45,
      0.04
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mousePos.y * -0.10,
      0.04
    )
  })

  return (
    <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.5}>
      <group ref={groupRef} position={[0.4, -1.2, 0]} scale={1.25} dispose={null}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

useGLTF.preload('/models/RobotExpressive.glb')

export default function CharacterScene({ mousePos, scrollY = 0 }: Props) {
  return (
    <Canvas
      camera={{ fov: 42, position: [0.6, 0.8, 3.2], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#0D0D0D' }}
    >
      <CameraRig scrollY={scrollY} />

      {/* 3-point cinematic lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 3]} intensity={2.8} color="#e8f0ff" castShadow />
      <directionalLight position={[-3, 1, 1]} intensity={0.6} color="#c8d8ff" />
      <pointLight position={[-1, 3, -3]} color="#1A6BFF" intensity={4} />

      <Suspense fallback={null}>
        <Robot mousePos={mousePos} />
        <ContactShadows
          position={[0.4, -1.45, 0]}
          opacity={0.35}
          scale={6}
          blur={3}
          color="#1A6BFF"
        />
      </Suspense>

      <EffectComposer>
        <DepthOfField focusDistance={0.01} focalLength={0.08} bokehScale={2} />
        <Bloom luminanceThreshold={0.4} intensity={0.6} mipmapBlur />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  )
}
