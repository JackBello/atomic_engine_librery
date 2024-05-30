import * as THREE from "three"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const cubes: any[] = []
for (let x = 0; x < 1000; x += 1) {
  const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = -x
  cubes.push(cube)
  scene.add(cube)
}

console.log(cubes.length)

camera.position.x = -16
camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)

  renderer.setClearColor(0x0000ff)

  for (const cube of cubes) {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  renderer.render(scene, camera)
}

animate()
