import {
  AtomicEngine,
  Scene,
  Rectangle2D,
  AtomicGame,
  LineFlowEffect2D,
  CollisionShape2D
} from "../lib"
// import pluginSelection from "@/plugins/new-selection.plugin"
// import pluginPanAndZoom from "@/plugins/pan-and-zoom.plugin"

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

const inputRotation = document.querySelector(
  `[data-id="input-rotation"]`
) as HTMLInputElement

const buttonToggleModeEdition = document.querySelector(
  `[data-id="buttonToggleModeEdition"]`
) as HTMLInputElement

const uploadDirectory = document.querySelector(
  `[data-id="uploadDirectory"]`
) as HTMLInputElement

const saveFileTest = document.querySelector(
  `[data-id="saveFileTest"]`
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
  selector: "[data-canvas]"
})

// app.plugin(pluginPanAndZoom)
// app.plugin(pluginSelection)

const lv1 = new Scene("lv-1")

const rect1 = new Rectangle2D("player", {
  background: "red",
  width: 100,
  height: 100,
  x: 100,
  y: 100
})

rect1.script = `
$attributes.add("vx", {
  value: 0.8
})
$attributes.add("vy", {
  value: 0.5
})
$attributes.add("vs", {
  value: 0.001
})

function _ready() {
  console.log("ready block")

  console.log($collider())
}

function _process() {
  // const collider = $collider()

  // if (!collider) return

  // if (collider.name === "enemy") {
  //   $destroy()
  // }

  console.log($collider()?.slug)

  x += $attributes.get("vx").value;
  y += $attributes.get("vy").value;

  scaleX += $attributes.get("vs").value;
  scaleY += $attributes.get("vs").value;

  if ((scaleX < 0.5 || scaleX > 1.5) && (scaleY < 0.5 || scaleY > 1.5)) $attributes.get("vs").value *= -1

  if ((x - (width * scaleX / 2)) < 0 || x + (width * scaleX / 2) > viewport.width) {
    $attributes.get("vx").value *= -1;
    background = "#" + Math.floor(Math.random() * 16777215).toString(16)
  }
  if ((y - (height * scaleY / 2)) < 0 || y + (height * scaleY / 2) > viewport.height) {
    $attributes.get("vy").value *= -1;
    background = "#" + Math.floor(Math.random() * 16777215).toString(16)
  }
}

function _destroyed() {
  $finish();
  console.log("game over")
}
`

const lineFlow = new LineFlowEffect2D("effect-1", {
  width: 200,
  height: 200,
  x: 50,
  y: 50,
  color:
    "linear-gradient(0.1 #ff5c33, 0.2 #ff66b3, 0.4 #ccccff, 0.6 #b3ffff, 0.8 #80ff80, 0.9 #ffff33)",
  cellSize: 12,
  spacing: 30,
  lineWidth: 1,
  rotation: 0,
  radius: 0
})

lineFlow.script = `
$attributes.add("vr", {
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

const collision = new CollisionShape2D("collision", {
  shape: "rectangle",
  width: 100,
  height: 100,
  x: 0,
  y: 0
})

rect1.$nodes.add(lineFlow)
rect1.$nodes.add(collision)
lv1.$nodes.add(rect1)
// lv1.addNode(lineFlow)

app.scenes.add(lv1)
app.scenes.change(lv1.slug)

// console.log(lv1.nodes)

await app.start()

// console.log(app.export("game"))

const vx = rect1.$attributes.get("vx")

if (vx) {
  inputVelocity.value = vx?.value

  inputVelocity.oninput = () => {
    vx.value = Number(inputVelocity.value)
  }
}

inputRotation.value = rect1.rotation.toString()

inputRotation.addEventListener("input", () => {
  rect1.rotation = Number(inputRotation.value)
})

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
  const randomRect = new Rectangle2D("enemy", {
    background: "#" + Math.floor(Math.random() * 16777215).toString(16),
    width: 100,
    height: 100,
    x: 50,
    y: 50
  })

  const collision = new CollisionShape2D("collision", {
    shape: "rectangle",
    width: 100,
    height: 100,
    x: 0,
    y: 0
  })

  lv1.$nodes.add(randomRect)
  randomRect.$nodes.add(collision)

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

  console.log(await dirHandle.getDirectoryHandle(".godot"))
})

saveFileTest.addEventListener("click", async () => {
  try {
    const contents = app.export("game")
    await saveNewFile(contents)
  } catch (err) {
    console.error("Error to save file:", err)
  }
})

async function saveFile(handle: FileSystemFileHandle, contents: string) {
  const writable = await handle.createWritable()
  await writable.write(contents)
  await writable.close()
}

async function saveNewFile(contents: string) {
  const options: SaveFilePickerOptions = {
    types: [
      {
        description: "Game Format Export",
        accept: {
          "application/json": [".json5"]
        }
      }
    ]
  }

  const handle = await window.showSaveFilePicker(options)
  await saveFile(handle, contents)
}
