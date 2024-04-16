import {
  AtomicEditor,
  EmptyNode,
  NodeLineFlowEffect,
  NodeRectangle,
  Scene2D
} from "../lib"
import { InternalSettings } from "../lib/const"

const inputVelocity = document.querySelector(
  `[data-id="inputVelocity"]`
) as HTMLInputElement
const buttonPlay = document.querySelector(
  `[data-id="buttonPlay"]`
) as HTMLInputElement
const buttonPause = document.querySelector(
  `[data-id="buttonPause"]`
) as HTMLInputElement
const uploadDirectory = document.querySelector(
  `[data-id="uploadDirectory"]`
) as HTMLInputElement

const app = new AtomicEditor({
  background: "#1e1e1e",
  context: "2d",
  dimension: "2D",
  height: document.body.clientHeight,
  width: document.body.clientWidth,
  selector: "[data-canvas]"
})

const lineFlow = new NodeLineFlowEffect({
  x: app.width,
  y: app.height,
  color:
    "linear-gradient(0.1 #ff5c33, 0.2 #ff66b3, 0.4 #ccccff, 0.6 #b3ffff, 0.8 #80ff80, 0.9 #ffff33)",
  cellSize: 12,
  spacing: 30,
  lineWidth: 1,
  radius: 0
})

lineFlow.script = `
$attributes.set("vr", {
  value: 0.03
})

function _process() {
  if (radius > 5 || radius < -5) $attributes.get("vr").value *= -1

  radius += $attributes.get("vr").value
}

function _ready() {
  console.log("effect ready")
}
`

const rect = new NodeRectangle({
  x: 100,
  y: 100
})

rect.script = `
$attributes.velocity = 2

function _process() {
  x += $attributes.velocity
}
`

const emptyNode = new EmptyNode()

emptyNode.script = `
$attributes.radius = 0
$attributes.vr = 0.03

function _process() {
  if ($attributes.radius > 5 || $attributes.radius < -5) $attributes.vr *= -1

  $attributes.radius += $attributes.vr
}

function _draw(context) {
  context.lineWidth = 1
  context.strokeStyle = "white"

  for (let row = 0; row < y; row += 15) {
    for (let column = 0; column < x; column += 15) {
      const angle = (Math.cos(column * 0.01) + Math.sin(row * 0.01)) * $attributes.radius
      context.beginPath()
      context.moveTo(column, row)
      context.lineTo(
        column + Math.cos(angle) * 30,
        row + Math.sin(angle) * 30
      )
      context.stroke()
    }
  }
}

// function _draw(ctx) {
//   for (let cubeY = 0; cubeY < 1000; cubeY += 50) {
//     for (let cubeX = 0; cubeX < 1000; cubeX += 50) {
//       ctx.fillStyle = "red"
//       ctx.fillRect(cubeX * 2, cubeY * 2, 50, 50)
//     }
//   }
// }
`

const lv1 = new Scene2D("lv-1")

// for (let cubeY = 0; cubeY < 1000; cubeY += 50) {
//   for (let cubeX = 0; cubeX < 1000; cubeX += 50) {
//     const cube = new NodeRectangle({
//       width: 50,
//       height: 50,
//       x: cubeX * 2,
//       y: cubeY * 2,
//       background: "red"
//     })

//     cube.script = `
//     $attributes.velocity = 1

//     function _process() {
//       rotation += $attributes.velocity
//     }
//     `

//     lv1.addNode(cube)
//   }
// }

lv1.addNode(lineFlow)
// lv1.addNode(emptyNode)
// lv1.addNode(rect)

console.log(lv1.getNodes())

app.$global[InternalSettings].modeEdition = "pan-and-zoom-element-canvas"

app.$canvas.pan(document.body.clientWidth / 2, document.body.clientHeight / 2)

app.$scenes.add(lv1)

app.$scenes.change(lv1.uuid)

await app.$scenes.script()

// const rect = app.$scenes.currentScene.getNodes()[0]

// inputVelocity.value = rect.attributes.velocity

// inputVelocity.oninput = () => {
//   rect.attributes.velocity = Number(inputVelocity.value)
// }

uploadDirectory.addEventListener("click", async () => {
  const dirHandle = await window.showDirectoryPicker()

  console.log(dirHandle.name)

  for await (const entry of dirHandle.values()) {
    console.log(entry)

    if (entry.kind === "directory") {
      console.log(entry.kind)
    }
    // console.log(entry.kind, entry.name)
  }

  console.log(dirHandle.getDirectoryHandle(".godot"))
})

buttonPlay.addEventListener("click", () => {
  app.startPreview()
})

buttonPause.addEventListener("click", () => {
  app.pausePreview()
})

window.addEventListener("resize", () => {
  app.$canvas.setSize(document.body.clientWidth, document.body.clientHeight)
  app.$canvas.pan(document.body.clientWidth / 2, document.body.clientHeight / 2)
})
