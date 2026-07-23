'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()
    const w = mount.clientWidth
    const h = mount.clientHeight
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.set(0, 0, 4.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // --- Grid plane ---
    const gridHelper = new THREE.GridHelper(12, 20, 0x1e1e1e, 0x1e1e1e)
    gridHelper.position.y = -1.8
    gridHelper.rotation.x = 0.18
    scene.add(gridHelper)

    // --- Wireframe torus knot ---
    const torusGeo = new THREE.TorusKnotGeometry(1.1, 0.32, 128, 20)
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    scene.add(torus)

    // --- Glowing inner torus knot ---
    const innerGeo = new THREE.TorusKnotGeometry(1.1, 0.32, 64, 8)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    })
    const inner = new THREE.Mesh(innerGeo, innerMat)
    scene.add(inner)

    // --- Floating particles ---
    const particleCount = 220
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const c1 = new THREE.Color(0x00ff88)
    const c2 = new THREE.Color(0xff3366)
    const c3 = new THREE.Color(0x3d9aff)
    const palette = [c1, c2, c3]

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      const col = palette[Math.floor(Math.random() * 3)]
      colors[i * 3]     = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // --- Orbiting ring ---
    const ringGeo = new THREE.TorusGeometry(1.9, 0.008, 4, 80)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff3366,
      transparent: true,
      opacity: 0.5,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.5
    scene.add(ring)

    // --- Second ring ---
    const ring2Geo = new THREE.TorusGeometry(2.3, 0.006, 4, 80)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x3d9aff,
      transparent: true,
      opacity: 0.3,
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI / 3
    ring2.rotation.z = Math.PI / 6
    scene.add(ring2)

    // --- Mouse tracking ---
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouse.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // --- Animation ---
    let frame = 0
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      frame += 0.005

      torus.rotation.x = frame * 0.4
      torus.rotation.y = frame * 0.6
      inner.rotation.x = -frame * 0.3
      inner.rotation.y = frame * 0.5

      ring.rotation.z  = frame * 0.25
      ring2.rotation.z = -frame * 0.18

      particles.rotation.y = frame * 0.05
      particles.rotation.x = frame * 0.02

      // subtle camera drift toward mouse
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    // --- Resize ---
    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
