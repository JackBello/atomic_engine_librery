import { useFunctionsContext } from "../contexts/functions"
import { TCanvasTypeGame, TContextCanvasName } from "../types"

let globalContext: TContextCanvasName
let layers: Record<TCanvasTypeGame, OffscreenCanvas> = {} as any

const loadLayer = (options: Record<TCanvasTypeGame, OffscreenCanvas>) => {
  if (!options.background && !options.scene && !options.ui) return

  layers = {
    background: options.background,
    ui: options.ui,
    scene: options.scene
  }
}

const loadContext = (options: { context: TContextCanvasName }) => {
  if (options.context) globalContext = options.context
}

const resize = (options: any) => {
  if (!options.size) return

  if (layers.background) {
    layers.background.width = options.size.width
    layers.background.height = options.size.height
  }

  if (layers.scene) {
    layers.scene.width = options.size.width
    layers.scene.height = options.size.height
  }

  if (layers.ui) {
    layers.ui.width = options.size.width
    layers.ui.height = options.size.height
  }
}

const handleActions = (
  action: string,
  canvas: TCanvasTypeGame,
  options: any
) => {
  if (!layers[canvas]) return

  const bufferCanvas = new OffscreenCanvas(
    layers[canvas].width,
    layers[canvas].height
  )

  const drawerBuffer = bufferCanvas.getContext(
    globalContext.replace("-", "") as any
  ) as any

  const drawer = layers[canvas].getContext(
    globalContext.replace("-", "") as any
  ) as any

  const functions = useFunctionsContext(globalContext)

  const actions: Record<string, any> = {
    "canvas:clear": functions.clear_window,
    "canvas:save": functions.save_window,
    "canvas:restore": functions.restore_window,
    "canvas:translate": functions.translate_window,
    "canvas:scale": functions.scale_window,
    "grid:make": functions.grid_make,
    "draw:rectangle": functions.draw_rectangle,
    "draw:selection": functions.draw_selection,
    "draw:text": functions.draw_text,
    "draw:control-edition": functions.draw_control_edition
  }

  const exec = actions[action]

  drawerBuffer.imageSmoothingEnabled = false

  console.log(drawerBuffer)

  if (exec) exec(drawerBuffer, options)

  drawer.drawImage(drawerBuffer, 0, 0)
}

self.onmessage = function (event) {
  loadContext(event.data)
  loadLayer(event.data)
  resize(event.data)

  const settings = event.data.settings

  if (settings)
    handleActions(settings.action, settings.canvas, settings.options)
}
