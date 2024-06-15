import {
  AtomicEngine,
  Scene2D,
  Rectangle2D,
  AtomicGame,
  LineFlowEffect2D
} from "../lib"
import pluginSelection from "@/plugins/new-selection.plugin"
import pluginPanAndZoom from "@/plugins/pan-and-zoom.plugin"

const buttonAddRect = document.querySelector(
  `[data-id="button-add-rect"]`
) as HTMLInputElement

const buttonRunGame = document.querySelector(
  `[data-id="button-run-game"]`
) as HTMLInputElement

const buttonPlayPreview = document.querySelector(
  `[data-id="button-play-preview"]`
) as HTMLInputElement

const buttonPausePreview = document.querySelector(
  `[data-id="button-pause-preview"]`
) as HTMLInputElement

const buttonStopPreview = document.querySelector(
  `[data-id="button-stop-preview"]`
) as HTMLInputElement

const buttonUploadGame = document.querySelector(
  `[data-id="uploadGame"]`
) as HTMLInputElement

const inputVelocity = document.querySelector(
  `[data-id="inputVelocity"]`
) as HTMLInputElement

const buttonToggleModeEdition = document.querySelector(
  `[data-id="buttonToggleModeEdition"]`
) as HTMLInputElement

const uploadDirectory = document.querySelector(
  `[data-id="uploadDirectory"]`
) as HTMLInputElement

const app = new AtomicEngine({
  background: "#eeeeee",
  context: "2d",
  dimension: "2D",
  export: {
    format: "JSON"
  },
  fps: {
    delay: 1000,
    velocity: 60
  },
  game: {
    background: "#000000",
    center: true,
    x: 0,
    y: 0,
    title: "Project Start",
    viewport: {
      width: 800,
      height: 600
    },
    resizable: true
  },
  height: 600,
  width: 600,
  selector: "[data-canvas]",
  canvasMode: "worker"
})

app.plugin(pluginPanAndZoom)
app.plugin(pluginSelection)

const lv1 = new Scene2D({
  name: "lv-1"
})

const rect1 = new Rectangle2D({
  background: "red",
  width: 100,
  height: 100,
  x: 50,
  y: 50,
  name: "player"
})

rect1.script = `
addAttribute("vx", {
  value: 0.8
})
addAttribute("vy", {
  value: 0.5
})
addAttribute("vs", {
  value: 0.001
})

function _ready() {
  // console.log(x, y)

  console.log("ready block")
}

function _process() {
  x += getAttribute("vx").value;
  y += getAttribute("vy").value;

  scaleX += getAttribute("vs").value;
  scaleY += getAttribute("vs").value;

  if ((scaleX < 0.5 || scaleX > 1.5) && (scaleY < 0.5 || scaleY > 1.5)) getAttribute("vs").value *= -1

  if ((x - (width * scaleX / 2)) < 0 || x + (width * scaleX / 2) > viewport.width) {
    getAttribute("vx").value *= -1;
    background = "#" + Math.floor(Math.random() * 16777215).toString(16)
  }
  if ((y - (height * scaleY / 2)) < 0 || y + (height * scaleY / 2) > viewport.height) {
    getAttribute("vy").value *= -1;
    background = "#" + Math.floor(Math.random() * 16777215).toString(16)
  }
}
`

const lineFlow = new LineFlowEffect2D({
  width: 300,
  height: 300,
  x: 50,
  y: 50,
  color:
    "linear-gradient(0.1 #ff5c33, 0.2 #ff66b3, 0.4 #ccccff, 0.6 #b3ffff, 0.8 #80ff80, 0.9 #ffff33)",
  cellSize: 12,
  spacing: 30,
  lineWidth: 1,
  radius: 0
})

lineFlow.script = `
addAttribute("vr", {
  value: 0.03
})

function _process() {
  if (radius > 5 || radius < -5) getAttribute("vr").value *= -1

  radius += getAttribute("vr").value
}

function _ready() {
  console.log("effect ready")
}`

rect1.addNode(lineFlow)
lv1.addNode(rect1)
// lv1.addNode(lineFlow)

app.scenes.add(lv1)

app.scenes.change(lv1.uuid)

await app.start()

console.log(app.export("game"))

const vx = rect1.getAttribute("vx")

if (vx) {
  inputVelocity.value = vx?.value

  inputVelocity.oninput = () => {
    vx.value = Number(inputVelocity.value)
  }
}

buttonToggleModeEdition.addEventListener("click", () => {
  app["pan-and-zoom"].toggleMode()
})

buttonPlayPreview.addEventListener("click", async () => {
  await app.preview().play()
})

buttonStopPreview.addEventListener("click", () => {
  app.preview().stop()
})

buttonPausePreview.addEventListener("click", () => {
  app.preview().pause()
})

buttonAddRect.addEventListener("click", () => {
  const randomRect = new Rectangle2D({
    background: "#" + Math.floor(Math.random() * 16777215).toString(16),
    width: 100,
    height: 100,
    x: 50,
    y: 50
  })

  lv1.addNode(randomRect)

  // randomRect.center()
})

buttonRunGame.addEventListener("click", () => {
  app.game().play()
})

buttonUploadGame.addEventListener("input", () => {
  const reader = new FileReader()

  const files = buttonUploadGame.files as FileList

  if (files.length) {
    reader.readAsText(files[0])

    reader.onload = async function () {
      const game = new AtomicGame()
      await game.load(reader.result as string)
      game.start()

      reader.abort()
    }

    reader.onerror = function () {
      console.log(reader.error)
    }
  }
})

uploadDirectory?.addEventListener("click", async () => {
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
