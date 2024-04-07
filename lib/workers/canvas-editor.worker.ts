import { useFunctionsContext } from "../contexts/functions"
import { TCanvasTypeEdition, TContextCanvasName } from "../types"

let globalContext: TContextCanvasName
let layers: Record<TCanvasTypeEdition, OffscreenCanvas> = {} as any

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
}

const loadContext = (options: { context: TContextCanvasName }) => {
  if (options.context) globalContext = options.context
}

const resize = (options: any) => {
  if (!options.size) return

  layers.grid.width = options.size.width
  layers.grid.height = options.size.height
  layers.background.width = options.size.width
  layers.background.height = options.size.height
  layers.scene.width = options.size.width
  layers.scene.height = options.size.height
  layers.ui.width = options.size.width
  layers.ui.height = options.size.height
  layers.editor.width = options.size.width
  layers.editor.height = options.size.height
}

const handleActions = (
  action: string,
  canvas: TCanvasTypeEdition,
  options: any
) => {
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

  if (exec) exec(drawer, options)
}

self.onmessage = function (event) {
  loadContext(event.data)
  loadLayer(event.data)
  resize(event.data)

  const settings = event.data.settings

  if (settings)
    handleActions(settings.action, settings.canvas, settings.options)
}
