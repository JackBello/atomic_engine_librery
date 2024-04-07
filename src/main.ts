import { AtomicCore } from "../lib"

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

const data = `{"background":"#1e1e1e","context":"2d","dimension":"2D","width":1845,"height":887,"$config":{"currentScene":{"uuid":"62f8d72d-4c55-4153-858c-744478abdc88"},"pan":{"translateX":922.5,"translateY":443.5},"zoom":{"scale":1},"selection":{"background":"rgba(52, 131, 235, 0.3)","border":true,"borderColor":"rgba(52, 131, 235, 0.8)","borderWidth":2,"radius":1},"axis":{"show":true,"colorX":"#CD6155","colorY":"#58D68D"},"grid":{"show":false,"cell":30,"color":"rgba(255, 255, 255, .2)"}},"$scenes":[{"uuid":"62f8d72d-4c55-4153-858c-744478abdc88","attributes":{},"type":"Scene2D","nodes":[{"uuid":"f8d72d4c-5501-43c5-8c74-4478abdc88f2","attributes":{"velocity":2},"type":"NodeRectangle","script":"\\n$attributes.velocity = 2\\n\\nfunction _process(delta) {\\n  x += $attributes.velocity\\n}\\n\\nfunction _ready() {\\n  console.log(background)\\n}","nodes":[],"options":{"rotation":0,"cursor":"default","deep":"0_0","height":100,"name":"NodeRectangle","origin":"center","originX":"center","originY":"center","angleOrigin":"center","angleOriginX":"center","angleOriginY":"center","scaleOrigin":"center","scaleOriginX":"center","scaleOriginY":"center","translateOrigin":"center","translateOriginX":"center","translateOriginY":"center","scale":1,"scaleX":1,"scaleY":1,"skew":1,"skewX":1,"skewY":1,"visible":true,"width":100,"x":50,"y":50,"background":"red","border":false,"borderColor":"","borderWidth":0,"radius":0}},{"uuid":"d72d4c55-0153-458c-b444-78abdc88f212","attributes":{},"type":"NodeRectangle","script":"\\nfunction _process(delta) {\\n  width += 1\\n  height += 1\\n}","nodes":[],"options":{"rotation":0,"cursor":"default","deep":"0_1","height":100,"name":"NodeRectangle","origin":"center","originX":"center","originY":"center","angleOrigin":"center","angleOriginX":"center","angleOriginY":"center","scaleOrigin":"center","scaleOriginX":"center","scaleOriginY":"center","translateOrigin":"center","translateOriginX":"center","translateOriginY":"center","scale":1,"scaleX":1,"scaleY":1,"skew":1,"skewX":1,"skewY":1,"visible":true,"width":100,"x":220,"y":220,"background":"blue","border":false,"borderColor":"","borderWidth":0,"radius":0}}],"options":{"rotation":0,"cursor":"default","deep":"0","height":1000,"origin":"center","originX":"center","originY":"center","angleOrigin":"center","angleOriginX":"center","angleOriginY":"center","scaleOrigin":"center","scaleOriginX":"center","scaleOriginY":"center","translateOrigin":"center","translateOriginX":"center","translateOriginY":"center","scale":1,"scaleX":1,"scaleY":1,"skew":1,"skewX":1,"skewY":1,"visible":true,"width":1000,"x":0,"y":0}}]}`

const app = new AtomicCore({
  background: "#1e1e1e",
  context: "2d",
  dimension: "2D",
  height: document.body.clientHeight,
  width: document.body.clientWidth,
  selector: "[data-canvas]"
})

app.import(data)

await app.$scenesGame.script()

app.$scenesGame.currentScene.name = "lv-1"

const rect = app.$scenesGame.currentScene.getNodes()[0]

app.init()

console.log(app.export())

inputVelocity.value = rect.attributes.velocity

inputVelocity.oninput = () => {
  rect.attributes.velocity = Number(inputVelocity.value)
}

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
  app.setSize(document.body.clientWidth, document.body.clientHeight)
  app.pan(document.body.clientWidth / 2, document.body.clientHeight / 2)
})
