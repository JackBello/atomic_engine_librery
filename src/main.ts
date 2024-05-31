import { AtomicEngine, Scene2D, Rectangle2D } from "../lib"

const addRect = document.querySelector(
  `[data-id="addRect"]`
) as HTMLInputElement

const buttonPlay = document.querySelector(
  `[data-id="buttonPlay"]`
) as HTMLInputElement

const buttonPreview = document.querySelector(
  `[data-id="preview"]`
) as HTMLInputElement

const buttonEdition = document.querySelector(
  `[data-id="edition"]`
) as HTMLInputElement

const buttonUploadGame = document.querySelector(
  `[data-id="uploadGame"]`
) as HTMLInputElement

const inputVelocity = document.querySelector(
  `[data-id="inputVelocity"]`
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
    height: 500,
    width: 500,
    center: true,
    x: 0,
    y: 0,
    title: "Project Start"
  },
  height: 600,
  width: 600,
  mode: "editor",
  selector: "[data-canvas]"
})

const lv1 = new Scene2D({
  name: "lv-1"
})

const rect1 = new Rectangle2D({
  background: "red",
  width: 100,
  height: 100,
  x: 50,
  y: 50
})

rect1.script = `
console.log(1)

addAttribute("velocity", {
  value: 2
})

function _ready() {
  console.log(2)
  console.log("hello")
}

function _process() {
  console.log(3)
  x += getAttribute("velocity").value
}
`

lv1.addNode(rect1)

app.scenes.add(lv1)

app.scenes.change(lv1.uuid)

await app.start()

const velocity = rect1.getAttribute("velocity")

if (velocity) {
  inputVelocity.value = velocity?.value

  inputVelocity.oninput = () => {
    velocity.value = Number(inputVelocity.value)
  }
}

buttonPreview.addEventListener("click", () => {
  app.preview().play()
})

buttonEdition.addEventListener("click", () => {
  app.preview().pause()
})

addRect.addEventListener("click", () => {
  const randomRect = new Rectangle2D({
    background: "red",
    width: 100,
    height: 100,
    x: 50,
    y: 50
  })

  lv1.addNode(randomRect)
})

buttonPlay.addEventListener("click", () => {
  app.game().play()
})

buttonUploadGame.addEventListener("input", () => {
  let reader = new FileReader()

  const files = buttonUploadGame.files as FileList

  reader.readAsText(files[0])

  reader.onload = async function () {
    app.import(reader.result as string)
    app.preview().play()
    await app.start()
  }

  reader.onerror = function () {
    console.log(reader.error)
  }
})
