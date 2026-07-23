'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type SceneType =
  | 'torus-knot'
  | 'dna-helix'
  | 'grid-wave'
  | 'sphere-cloud'
  | 'cube-matrix'
  | 'circuit'
  | 'rings'
  | 'pyramid'
  | 'wormhole'
  | 'particles'
  | 'prism'
  | 'pulsing-sphere'
  | 'drift-particles'
  | 'watch-eye'
  | 'mono-grid'

interface Props {
  scene?: SceneType
  accent?: string
  height?: number
}

function pickScene(slug: string): SceneType {
  const map: Record<string, SceneType> = {
    'coroutine':       'dna-helix',
    'viewmodel':       'cube-matrix',
    'koin':            'rings',
    'hilt':            'rings',
    'compose':         'sphere-cloud',
    'build':           'grid-wave',
    'gradle':          'circuit',
    'room':            'cube-matrix',
    'feature-flag':    'wormhole',
    'process':         'torus-knot',
    'navigation':      'particles',
    'spektr':          'sphere-cloud',
    'vektor':          'dna-helix',
    'nocturnd':        'grid-wave',
    'sentinel':        'watch-eye',
    'krate':           'cube-matrix',
    'prism':           'prism',
    'threadwatch':     'watch-eye',
    'pulsar':          'pulsing-sphere',
    'driftlog':        'drift-particles',
    'monobase':        'mono-grid',
  }
  for (const [key, val] of Object.entries(map)) {
    if (slug.includes(key)) return val
  }
  return 'torus-knot'
}

export default function ArticleScene({ scene, accent = '#00ff88', height = 280 }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const w = mount.clientWidth
    const h = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
    camera.position.set(0, 0, 5)
    const sceneTHR = new THREE.Scene()

    const accentColor  = new THREE.Color(accent)
    const accent2Color = new THREE.Color('#ff3366')
    const accent3Color = new THREE.Color('#3d9aff')

    const objects: THREE.Object3D[] = []

    if (scene === 'dna-helix') {
      // DNA double helix using particles
      const count = 120
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 6
        const r = 1.2
        // strand 1
        const geo1 = new THREE.SphereGeometry(0.045, 6, 6)
        const mat1 = new THREE.MeshBasicMaterial({ color: accentColor })
        const s1 = new THREE.Mesh(geo1, mat1)
        s1.position.set(Math.cos(t) * r, (i / count) * 5 - 2.5, Math.sin(t) * r)
        sceneTHR.add(s1)
        objects.push(s1)

        // strand 2 (offset by PI)
        const geo2 = new THREE.SphereGeometry(0.045, 6, 6)
        const mat2 = new THREE.MeshBasicMaterial({ color: accent3Color })
        const s2 = new THREE.Mesh(geo2, mat2)
        s2.position.set(Math.cos(t + Math.PI) * r, (i / count) * 5 - 2.5, Math.sin(t + Math.PI) * r)
        sceneTHR.add(s2)
        objects.push(s2)

        // rungs every 6 steps
        if (i % 6 === 0) {
          const rungGeo = new THREE.CylinderGeometry(0.012, 0.012, r * 2, 4)
          const rungMat = new THREE.MeshBasicMaterial({ color: 0x1e1e1e })
          const rung = new THREE.Mesh(rungGeo, rungMat)
          rung.position.set(0, (i / count) * 5 - 2.5, 0)
          rung.rotation.z = Math.PI / 2
          rung.rotation.y = t
          sceneTHR.add(rung)
        }
      }
    } else if (scene === 'cube-matrix') {
      const grid = 3
      for (let x = -grid; x <= grid; x++) {
        for (let y = -grid; y <= grid; y++) {
          const dist = Math.sqrt(x * x + y * y)
          const geo = new THREE.BoxGeometry(0.28, 0.28, 0.28)
          const mat = new THREE.MeshBasicMaterial({
            color: dist < 1.5 ? accentColor : dist < 2.5 ? accent3Color : accent2Color,
            wireframe: true,
            transparent: true,
            opacity: 0.4 - dist * 0.04,
          })
          const cube = new THREE.Mesh(geo, mat)
          cube.position.set(x * 0.7, y * 0.7, -dist * 0.3)
          sceneTHR.add(cube)
          objects.push(cube)
        }
      }
    } else if (scene === 'grid-wave') {
      const size = 8
      const segments = 24
      const geo = new THREE.PlaneGeometry(size, size, segments, segments)
      const posAttr = geo.attributes.position as THREE.BufferAttribute
      // store original y values for animation
      const origZ = new Float32Array(posAttr.count)
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i)
        const y = posAttr.getY(i)
        origZ[i] = Math.sin(x * 0.8) * Math.cos(y * 0.8) * 0.5
        posAttr.setZ(i, origZ[i])
      }
      geo.computeVertexNormals()
      const mat = new THREE.MeshBasicMaterial({
        color: accentColor,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })
      const plane = new THREE.Mesh(geo, mat)
      plane.rotation.x = -Math.PI / 3
      plane.position.y = -0.5
      sceneTHR.add(plane)
      objects.push(plane)
      ;(plane as any)._waveGeo = geo
      ;(plane as any)._waveOrig = origZ
    } else if (scene === 'sphere-cloud') {
      const count = 180
      for (let i = 0; i < count; i++) {
        const phi   = Math.acos(2 * Math.random() - 1)
        const theta = Math.random() * Math.PI * 2
        const r     = 1.4 + Math.random() * 0.6
        const geo = new THREE.SphereGeometry(0.028 + Math.random() * 0.022, 4, 4)
        const col = [accentColor, accent2Color, accent3Color][Math.floor(Math.random() * 3)]
        const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.7 })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.setFromSphericalCoords(r, phi, theta)
        sceneTHR.add(mesh)
        objects.push(mesh)
      }
      // wireframe sphere outline
      const outGeo = new THREE.SphereGeometry(1.4, 16, 12)
      const outMat = new THREE.MeshBasicMaterial({ color: 0x1e1e1e, wireframe: true, transparent: true, opacity: 0.3 })
      const outline = new THREE.Mesh(outGeo, outMat)
      sceneTHR.add(outline)
      objects.push(outline)
    } else if (scene === 'circuit') {
      // circuit board: grid of lines + nodes
      const gridMat = new THREE.LineBasicMaterial({ color: 0x1e1e1e, transparent: true, opacity: 0.6 })
      for (let i = -4; i <= 4; i++) {
        const hGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, i * 0.5, 0), new THREE.Vector3(4, i * 0.5, 0)])
        const vGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -2, 0), new THREE.Vector3(i, 2, 0)])
        sceneTHR.add(new THREE.Line(hGeo, gridMat))
        sceneTHR.add(new THREE.Line(vGeo, gridMat))
      }
      // accent trace paths
      const traceMat = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.8 })
      const tracePoints = [
        [new THREE.Vector3(-4, 0, 0.01), new THREE.Vector3(-1, 0, 0.01), new THREE.Vector3(-1, 1, 0.01), new THREE.Vector3(2, 1, 0.01)],
        [new THREE.Vector3(-4, -1, 0.01), new THREE.Vector3(0, -1, 0.01), new THREE.Vector3(0, 0.5, 0.01), new THREE.Vector3(3, 0.5, 0.01)],
        [new THREE.Vector3(-2, -2, 0.01), new THREE.Vector3(-2, -0.5, 0.01), new THREE.Vector3(1, -0.5, 0.01), new THREE.Vector3(4, -0.5, 0.01)],
      ]
      for (const pts of tracePoints) {
        const tGeo = new THREE.BufferGeometry().setFromPoints(pts)
        sceneTHR.add(new THREE.Line(tGeo, traceMat))
      }
      // nodes
      const nodeMat = new THREE.MeshBasicMaterial({ color: accentColor })
      const nodePositions = [[-1,0],[-1,1],[2,1],[0,-1],[0,0.5],[3,0.5],[-2,-0.5],[1,-0.5],[4,-0.5]]
      for (const [x,y] of nodePositions) {
        const nGeo = new THREE.CircleGeometry(0.08, 8)
        const node = new THREE.Mesh(nGeo, nodeMat)
        node.position.set(x, y, 0.02)
        sceneTHR.add(node)
        objects.push(node)
      }
      camera.position.set(0, 0, 6)
    } else if (scene === 'rings') {
      for (let i = 0; i < 5; i++) {
        const r = 0.6 + i * 0.4
        const geo = new THREE.TorusGeometry(r, 0.012 + i * 0.004, 4, 60)
        const colors = [accentColor, accent3Color, accent2Color, accentColor, accent3Color]
        const mat = new THREE.MeshBasicMaterial({ color: colors[i], transparent: true, opacity: 0.7 - i * 0.08 })
        const ring = new THREE.Mesh(geo, mat)
        ring.rotation.x = (Math.PI / 5) * i
        ring.rotation.y = (Math.PI / 7) * i
        sceneTHR.add(ring)
        objects.push(ring)
      }
    } else if (scene === 'pyramid') {
      const geo = new THREE.ConeGeometry(1.5, 2.4, 4, 1, true)
      const mat = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true, transparent: true, opacity: 0.5 })
      const cone = new THREE.Mesh(geo, mat)
      cone.position.y = -0.2
      sceneTHR.add(cone)
      objects.push(cone)
      // inner
      const geo2 = new THREE.ConeGeometry(0.9, 1.4, 4, 1, true)
      const mat2 = new THREE.MeshBasicMaterial({ color: accent3Color, wireframe: true, transparent: true, opacity: 0.3 })
      const cone2 = new THREE.Mesh(geo2, mat2)
      cone2.position.y = -0.2
      sceneTHR.add(cone2)
      objects.push(cone2)
      // base
      const baseGeo = new THREE.PlaneGeometry(3, 3, 4, 4)
      const baseMat = new THREE.MeshBasicMaterial({ color: 0x1e1e1e, wireframe: true, transparent: true, opacity: 0.3 })
      const base = new THREE.Mesh(baseGeo, baseMat)
      base.rotation.x = -Math.PI / 2
      base.position.y = -1.4
      sceneTHR.add(base)
    } else if (scene === 'wormhole') {
      const tubePoints: THREE.Vector3[] = []
      for (let i = 0; i <= 80; i++) {
        const t = (i / 80) * Math.PI * 4
        tubePoints.push(new THREE.Vector3(Math.cos(t) * (0.4 + i * 0.02), Math.sin(t) * (0.4 + i * 0.02), i * 0.08 - 3.2))
      }
      const curve = new THREE.CatmullRomCurve3(tubePoints)
      const tubeGeo = new THREE.TubeGeometry(curve, 120, 0.06, 8, false)
      const tubeMat = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true, transparent: true, opacity: 0.4 })
      const tube = new THREE.Mesh(tubeGeo, tubeMat)
      sceneTHR.add(tube)
      objects.push(tube)
      camera.position.set(0, 0, 6)
    } else if (scene === 'particles') {
      const count = 300
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)
      const palette = [accentColor, accent2Color, accent3Color]
      for (let i = 0; i < count; i++) {
        positions[i*3]   = (Math.random()-0.5) * 7
        positions[i*3+1] = (Math.random()-0.5) * 5
        positions[i*3+2] = (Math.random()-0.5) * 4
        const c = palette[Math.floor(Math.random()*3)]
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      const mat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.8 })
      const pts = new THREE.Points(geo, mat)
      sceneTHR.add(pts)
      objects.push(pts)
    } else if (scene === 'prism') {
      // Triangular prism (actual prism geometry)
      const shape = new THREE.Shape()
      shape.moveTo(0, 1.2)
      shape.lineTo(-1.2, -0.6)
      shape.lineTo(1.2, -0.6)
      shape.lineTo(0, 1.2)
      const extrudeSettings = { depth: 2, bevelEnabled: false }
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      const mat = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true, transparent: true, opacity: 0.4 })
      const prism = new THREE.Mesh(geo, mat)
      prism.position.z = -1
      prism.rotation.y = Math.PI / 6
      sceneTHR.add(prism)
      objects.push(prism)
      // inner prism
      const shape2 = new THREE.Shape()
      shape2.moveTo(0, 0.7)
      shape2.lineTo(-0.7, -0.35)
      shape2.lineTo(0.7, -0.35)
      shape2.lineTo(0, 0.7)
      const geo2 = new THREE.ExtrudeGeometry(shape2, { depth: 1.2, bevelEnabled: false })
      const mat2 = new THREE.MeshBasicMaterial({ color: accent3Color, wireframe: true, transparent: true, opacity: 0.25 })
      const prism2 = new THREE.Mesh(geo2, mat2)
      prism2.position.z = -0.6
      prism2.rotation.y = Math.PI / 6
      sceneTHR.add(prism2)
      objects.push(prism2)
    } else if (scene === 'pulsing-sphere') {
      // Pulsar = pulsing sphere with energy rings
      const geo = new THREE.SphereGeometry(1, 32, 32)
      const mat = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true, transparent: true, opacity: 0.3 })
      const sphere = new THREE.Mesh(geo, mat)
      sceneTHR.add(sphere)
      objects.push(sphere)
      // energy rings expanding
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.2 + i * 0.4, 0.015, 4, 40)
        const ringMat = new THREE.MeshBasicMaterial({ color: accent2Color, transparent: true, opacity: 0.5 - i * 0.12 })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.rotation.x = Math.PI / 2
        sceneTHR.add(ring)
        objects.push(ring)
      }
      ;(sphere as any)._pulse = true
    } else if (scene === 'drift-particles') {
      // Driftlog = flowing particle stream
      const count = 400
      const positions = new Float32Array(count * 3)
      const velocities = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        positions[i*3]   = (Math.random()-0.5) * 8
        positions[i*3+1] = (Math.random()-0.5) * 6
        positions[i*3+2] = (Math.random()-0.5) * 6
        velocities[i*3]   = (Math.random()-0.5) * 0.02
        velocities[i*3+1] = (Math.random()-0.5) * 0.02
        velocities[i*3+2] = (Math.random()-0.5) * 0.02
        const c = accentColor
        colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      const mat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.7 })
      const pts = new THREE.Points(geo, mat)
      sceneTHR.add(pts)
      objects.push(pts)
      ;(pts as any)._velocities = velocities
    } else if (scene === 'watch-eye') {
      // Eye watching (for threadwatch/sentinel)
      const eyeGeo = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e1e1e, wireframe: true, transparent: true, opacity: 0.3 })
      const eye = new THREE.Mesh(eyeGeo, eyeMat)
      eye.rotation.x = -Math.PI / 2
      sceneTHR.add(eye)
      objects.push(eye)
      // iris
      const irisGeo = new THREE.CircleGeometry(0.4, 32)
      const irisMat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.7 })
      const iris = new THREE.Mesh(irisGeo, irisMat)
      iris.position.y = 0.01
      iris.rotation.x = -Math.PI / 2
      sceneTHR.add(iris)
      objects.push(iris)
      // pupil
      const pupilGeo = new THREE.CircleGeometry(0.15, 32)
      const pupilMat = new THREE.MeshBasicMaterial({ color: accent2Color })
      const pupil = new THREE.Mesh(pupilGeo, pupilMat)
      pupil.position.y = 0.02
      pupil.rotation.x = -Math.PI / 2
      sceneTHR.add(pupil)
      objects.push(pupil)
    } else if (scene === 'mono-grid') {
      // Monobase = organized grid structure
      const boxSize = 0.35
      const spacing = 0.5
      for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
          for (let z = -1; z <= 1; z++) {
            const geo = new THREE.BoxGeometry(boxSize, boxSize, boxSize)
            const dist = Math.sqrt(x*x + y*y + z*z)
            const col = dist < 1.5 ? accentColor : dist < 2.5 ? accent3Color : accent2Color
            const mat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.3 - dist * 0.03 })
            const cube = new THREE.Mesh(geo, mat)
            cube.position.set(x * spacing, y * spacing, z * spacing)
            sceneTHR.add(cube)
            objects.push(cube)
          }
        }
      }
    } else {
      // default: torus knot
      const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 16)
      const mat = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true, transparent: true, opacity: 0.22 })
      const mesh = new THREE.Mesh(geo, mat)
      sceneTHR.add(mesh)
      objects.push(mesh)
      const geo2 = new THREE.TorusKnotGeometry(1.2, 0.35, 60, 8)
      const mat2 = new THREE.MeshBasicMaterial({ color: accent2Color, wireframe: true, transparent: true, opacity: 0.08 })
      sceneTHR.add(new THREE.Mesh(geo2, mat2))
    }

    // mouse
    const mouse = { x: 0, y: 0 }
    const onMouse = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouse.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    let frame = 0
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      frame += 0.008

      if (scene === 'dna-helix') {
        sceneTHR.rotation.y = frame * 0.4
      } else if (scene === 'cube-matrix') {
        objects.forEach((o, i) => {
          o.rotation.x = frame * 0.3 + i * 0.1
          o.rotation.y = frame * 0.5 + i * 0.15
        })
      } else if (scene === 'grid-wave') {
        const plane = objects[0] as any
        if (plane?._waveGeo) {
          const posAttr = plane._waveGeo.attributes.position as THREE.BufferAttribute
          const orig = plane._waveOrig as Float32Array
          for (let i = 0; i < posAttr.count; i++) {
            const x = posAttr.getX(i)
            const y = posAttr.getY(i)
            posAttr.setZ(i, Math.sin(x * 0.8 + frame) * Math.cos(y * 0.8 + frame) * 0.5)
          }
          posAttr.needsUpdate = true
          plane._waveGeo.computeVertexNormals()
        }
      } else if (scene === 'sphere-cloud') {
        sceneTHR.rotation.y = frame * 0.15
        sceneTHR.rotation.x = Math.sin(frame * 0.3) * 0.1
      } else if (scene === 'rings') {
        objects.forEach((o, i) => {
          o.rotation.z = frame * (0.2 + i * 0.1)
          o.rotation.x = frame * (0.15 + i * 0.07)
        })
      } else if (scene === 'pyramid') {
        objects[0].rotation.y = frame * 0.5
        objects[1].rotation.y = -frame * 0.7
      } else if (scene === 'wormhole') {
        sceneTHR.rotation.z = frame * 0.2
        camera.position.z = 6 + Math.sin(frame * 0.5) * 0.5
      } else if (scene === 'particles') {
        objects[0].rotation.y = frame * 0.06
        objects[0].rotation.x = frame * 0.03
      } else if (scene === 'prism') {
        objects.forEach((o, i) => {
          o.rotation.y = frame * 0.4 + i * 0.3
          o.rotation.x = Math.sin(frame * 0.3) * 0.2
        })
      } else if (scene === 'pulsing-sphere') {
        // sphere pulses scale
        const pulse = 1 + Math.sin(frame * 3) * 0.08
        objects[0].scale.setScalar(pulse)
        // rings expand and fade
        objects.forEach((o, i) => {
          if (i === 0) return
          const scale = 1 + Math.sin(frame * 2 + i * 1.2) * 0.15
          o.scale.setScalar(scale)
          const mat = (o as THREE.Mesh).material as THREE.MeshBasicMaterial
          mat.opacity = (0.5 - (i - 1) * 0.12) * (0.5 + Math.sin(frame * 2 + i) * 0.5)
        })
        sceneTHR.rotation.y = frame * 0.1
      } else if (scene === 'drift-particles') {
        const pts = objects[0] as any
        if (pts?._velocities) {
          const pos = (pts.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute
          const vel = pts._velocities as Float32Array
          for (let i = 0; i < pos.count; i++) {
            let x = pos.getX(i) + vel[i*3]
            let y = pos.getY(i) + vel[i*3+1]
            let z = pos.getZ(i) + vel[i*3+2]
            // wrap around bounds
            if (x > 4) x = -4; if (x < -4) x = 4
            if (y > 3) y = -3; if (y < -3) y = 3
            if (z > 3) z = -3; if (z < -3) z = 3
            pos.setXYZ(i, x, y, z)
          }
          pos.needsUpdate = true
        }
      } else if (scene === 'watch-eye') {
        // iris tracks mouse slowly
        const iris = objects[1]
        const pupil = objects[2]
        if (iris && pupil) {
          iris.position.x += (mouse.x * 0.3 - iris.position.x) * 0.08
          iris.position.z += (-mouse.y * 0.3 - iris.position.z) * 0.08
          pupil.position.x = iris.position.x * 1.1
          pupil.position.z = iris.position.z * 1.1
        }
        objects[0].rotation.z = Math.sin(frame * 0.5) * 0.05
      } else if (scene === 'mono-grid') {
        objects.forEach((o, i) => {
          o.rotation.x = frame * 0.15 + i * 0.02
          o.rotation.y = frame * 0.2 + i * 0.03
        })
        sceneTHR.rotation.y = frame * 0.05
      } else {
        sceneTHR.rotation.x = frame * 0.3
        sceneTHR.rotation.y = frame * 0.5
      }

      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05
      camera.position.y += (-mouse.y * 0.3 - camera.position.y) * 0.05
      camera.lookAt(sceneTHR.position)

      renderer.render(sceneTHR, camera)
    }
    animate()

    const onResize = () => {
      const nw = mount.clientWidth; const nh = mount.clientHeight
      camera.aspect = nw / nh; camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [scene, accent])

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
}

export { pickScene }
export type { SceneType }
