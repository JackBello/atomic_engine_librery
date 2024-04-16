import { useFunctionsContext } from "../contexts/functions"
import { TCanvasTypeEdition, TContextCanvasName } from "../types"

let globalContext: TContextCanvasName
let layers: Record<TCanvasTypeEdition, OffscreenCanvas> = {} as any
// let bufferCanvas: Record<TCanvasTypeEdition, OffscreenCanvas> = {} as any
let bufferCanvas: any
let drawers: Record<TCanvasTypeEdition, any> = {} as any
// let drawerBuffer: Record<TCanvasTypeEdition, any> = {} as any
let drawerBuffer: any

const loadLayer = (options: Record<TCanvasTypeEdition, OffscreenCanvas>) => {
  if (
    !options.grid &&
    !options.background &&
    !options.scene &&
    !options.ui &&
    !options.editor
  )
    return

  layers = {
    grid: options.grid,
    background: options.background,
    scene: options.scene,
    ui: options.ui,
    editor: options.editor
  }

  bufferCanvas = new OffscreenCanvas(
    options.editor.width,
    options.editor.height
  )

  // bufferCanvas.grid = new OffscreenCanvas(
  //   options.grid.width,
  //   options.grid.height
  // )
  // bufferCanvas.background = new OffscreenCanvas(
  //   options.background.width,
  //   options.background.height
  // )
  // bufferCanvas.scene = new OffscreenCanvas(
  //   options.scene.width,
  //   options.scene.height
  // )
  // bufferCanvas.ui = new OffscreenCanvas(options.ui.width, options.ui.height)
  // bufferCanvas.editor = new OffscreenCanvas(
  //   options.editor.width,
  //   options.editor.height
  // )
}

const loadContext = (options: { context: TContextCanvasName }) => {
  if (options.context) globalContext = options.context
}

const loadDrawers = () => {
  if (
    !layers.grid &&
    !layers.background &&
    !layers.scene &&
    !layers.ui &&
    !layers.editor
  )
    return

  const context = globalContext.replace("-", "") as any

  // drawerBuffer.grid = bufferCanvas.grid.getContext(context) as any
  // drawerBuffer.background = bufferCanvas.background.getContext(context) as any
  // drawerBuffer.scene = bufferCanvas.scene.getContext(context) as any
  // drawerBuffer.ui = bufferCanvas.ui.getContext(context) as any
  // drawerBuffer.editor = bufferCanvas.editor.getContext(context) as any

  drawerBuffer = bufferCanvas.getContext(context)

  drawers.grid = layers.grid.getContext(context)
  drawers.background = layers.background.getContext(context)
  drawers.scene = layers.scene.getContext(context)
  drawers.ui = layers.ui.getContext(context)
  drawers.editor = layers.editor.getContext(context)
}

const resize = (options: any) => {
  if (!options.size) return

  if (layers.grid) {
    layers.grid.width = options.size.width
    layers.grid.height = options.size.height

    // bufferCanvas.grid.width = options.size.width
    // bufferCanvas.grid.height = options.size.height
  }

  if (layers.background) {
    layers.background.width = options.size.width
    layers.background.height = options.size.height

    // bufferCanvas.background.width = options.size.width
    // bufferCanvas.background.height = options.size.height
  }

  if (layers.scene) {
    layers.scene.width = options.size.width
    layers.scene.height = options.size.height

    // bufferCanvas.scene.width = options.size.width
    // bufferCanvas.scene.height = options.size.height
  }

  if (layers.ui) {
    layers.ui.width = options.size.width
    layers.ui.height = options.size.height

    // bufferCanvas.ui.width = options.size.width
    // bufferCanvas.ui.height = options.size.height
  }

  if (layers.editor) {
    layers.editor.width = options.size.width
    layers.editor.height = options.size.height

    // bufferCanvas.editor.width = options.size.width
    // bufferCanvas.editor.height = options.size.height
  }

  bufferCanvas.width = options.size.width
  bufferCanvas.height = options.size.height
}

const handleActions = (
  action: string,
  canvas: TCanvasTypeEdition,
  options: any
) => {
  if (!drawers[canvas]) return

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
    "draw:control-edition": functions.draw_control_edition,
    "draw:effect": functions.draw_effect
  }

  const exec = actions[action]

  drawers[canvas].imageSmoothingEnabled = false
  // drawerBuffer[canvas].imageSmoothingEnabled = false

  drawerBuffer.imageSmoothingEnabled = false

  // if (exec) exec(drawerBuffer[canvas], options)
  if (exec) exec(drawerBuffer, options)

  drawers[canvas].clearRect(
    0,
    0,
    // bufferCanvas[canvas].width,
    // bufferCanvas[canvas].height
    bufferCanvas.width,
    bufferCanvas.height
  )
  // drawers[canvas].drawImage(bufferCanvas[canvas], 0, 0)
  drawers[canvas].drawImage(bufferCanvas, 0, 0)
}

self.onmessage = function (event) {
  loadContext(event.data)
  loadLayer(event.data)
  loadDrawers()
  resize(event.data)

  const settings = event.data.settings

  if (settings)
    handleActions(settings.action, settings.canvas, settings.options)
}
