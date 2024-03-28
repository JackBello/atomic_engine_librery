import { useFunctionsContext } from "../contexts/functions";
import { TCanvasType, TCanvasTypeEdition, TContextCanvasName } from "../types";

let globalContext: TContextCanvasName;
let layers: Record<TCanvasTypeEdition, OffscreenCanvas> = {} as any

const loadLayer = ({ grid, background, scene, ui, editor }: Record<TCanvasTypeEdition, OffscreenCanvas>) => {
  if (!grid && !background && !scene && !ui && !editor) return

  layers = {
    grid,
    background,
    scene,
    ui,
    editor
  }
}

const loadContext = ({ context }: { context: TContextCanvasName }) => {
  if (context) globalContext = context;
}

const resize = ({ size }: any) => {
  if (!size) return;

  const { width, height } = size;

  layers.grid.width = width;
  layers.grid.height = height;
  layers.background.width = width;
  layers.background.height = height;
  layers.scene.width = width;
  layers.scene.height = height;
  layers.ui.width = width;
  layers.ui.height = height;
  layers.editor.width = width;
  layers.editor.height = height;
}

const handleActions = (action: string, canvas: TCanvasTypeEdition, options: any) => {
  const drawer = layers[canvas].getContext(globalContext.replace("-", "") as any) as any

  const { draw_rectangle, draw_selection, clear_window, save_window, restore_window, translate_window, grid_make } = useFunctionsContext(globalContext);

  const actions: Record<string, any> = {
    "canvas:clear": clear_window,
    "canvas:save": save_window,
    "canvas:restore": restore_window,
    "canvas:translate": translate_window,
    "grid:make": grid_make,
    "draw:rectangle": draw_rectangle,
    "draw:selection": draw_selection,
  }

  const exec = actions[action]

  if (exec) exec(drawer, options)
}

self.onmessage = function (event) {
  loadContext(event.data)
  loadLayer(event.data)
  resize(event.data)

  const settings = event.data.settings;

  if (settings) handleActions(settings.action, settings.canvas, settings.options);
};
