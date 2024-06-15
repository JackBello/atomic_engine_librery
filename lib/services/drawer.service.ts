import EventObserver from "@/utils/observer"
import { AtomicEngine, AtomicGame } from ".."
import { TFunction } from "@/types"
import { MethodDispatchEvent } from "@/symbols"
import { TEventDrawer } from "./event.type"

import EditorCanvasWorker from "@/workers/editor-canvas.worker?worker&inline"
import RenderCanvasWorker from "@/workers/render-canvas.worker?worker&inline"
import NodesCanvasWorker from "@/workers/nodes-canvas.worker?worker&inline"
import MathCanvasWorker from "@/workers/math-canvas.worker?worker&inline"
import { INodeWorker, TCursorOptions } from "@/nodes/nodes.types"

export class DrawerService {
  private $app: AtomicEngine | AtomicGame

  protected _workerEditor: Worker
  protected _workerRender: Worker
  protected _workerNodes: Worker
  protected _workerMath: Worker
  protected _events: EventObserver = new EventObserver()

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app

    this._workerEditor = new EditorCanvasWorker()
    this._workerRender = new RenderCanvasWorker()
    this._workerNodes = new NodesCanvasWorker()
    this._workerMath = new MathCanvasWorker()

    this.loadWorker()
    this.listenWorker()
  }

  protected loadWorker() {
    this._workerRender.postMessage({
      action: "load:rendered",
      options: {
        context: this.$app.options.context,
        mode: this.$app.mode,
        dimension: this.$app.options.dimension,
        width: this.$app.canvas.instance.clientWidth,
        height: this.$app.canvas.instance.clientHeight
      }
    })
  }

  protected listenWorker() {
    this._workerRender.onmessage = (event) => {
      const imageBitMap = event.data.imageBitMap as ImageBitmap

      if (imageBitMap) {
        const context = this.$app.canvas.instance.getContext(
          "bitmaprenderer"
        ) as ImageBitmapRenderingContext

        context.transferFromImageBitmap(imageBitMap)
      }
    }
  }

  setSize(width: number, height: number) {
    this._workerRender.postMessage({
      action: "resize:drawer",
      options: {
        width,
        height
      }
    })
  }

  setAfterDraw(afterDraw: any[]) {
    this._workerRender.postMessage({
      action: "set:after-draw",
      list: afterDraw
    })
  }

  setBeforeDraw(beforeDraw: any[]) {
    this._workerRender.postMessage({
      action: "set:before-draw",
      list: beforeDraw
    })
  }

  setSizeEditor(width: number, height: number) {
    this._workerRender.postMessage({
      action: "set:size-editor",
      size: {
        width,
        height
      }
    })
  }

  setViewportGame(width: number, height: number) {
    this._workerRender.postMessage({
      action: "set:viewport-game",
      viewport: {
        width,
        height
      }
    })
  }

  setScaleViewport(scale: number) {
    this._workerRender.postMessage({
      action: "set:scale-viewport",
      scaleViewport: scale
    })
  }

  setAnimation(animation: { timestamp: number; deltaTime: number }) {
    this._workerRender.postMessage({
      action: "set:animation",
      animation
    })
  }

  setFrame(control: { velocity: number; delay: number }) {
    this._workerRender.postMessage({
      action: "set:frame",
      control
    })
  }

  setConfigs(configs: any) {
    this._workerRender.postMessage({
      action: "set:configs",
      configs
    })
  }

  async getRootNode() {
    this._workerNodes.postMessage({
      action: "get:root"
    })

    return new Promise((resolve) => {
      this._workerNodes.onmessage = (event) => {
        if (event.data.type === "get:root") {
          resolve(event.data.node)
        }
      }
    })
  }

  setRootNode(node: any) {
    this._workerNodes.postMessage({
      action: "set:root",
      root: node
    })
  }

  addNode(node: any, location: string, mode: "uuid" | "index" | "deep") {
    this._workerNodes.postMessage({
      action: "add:node",
      location,
      mode,
      node
    })
  }

  updateNode(
    location: string,
    type: "property" | "properties",
    mode: "uuid" | "index" | "deep",
    options: any
  ) {
    this._workerNodes.postMessage({
      action: "update:node",
      location,
      type,
      mode,
      options
    })
  }

  reDraw() {
    this._workerRender.postMessage({
      action: "re-draw"
    })
  }

  async process() {
    const root = await this.getRootNode()

    this._workerEditor.postMessage({
      action: "set:root",
      root
    })
    this._workerRender.postMessage({
      action: "render",
      root
    })
  }

  editor() {
    return {
      selectNode: async (mouseCoords: {
        x: number
        y: number
      }): Promise<INodeWorker | undefined> => {
        this._workerEditor.postMessage({
          action: "select:node",
          mouseCoords
        })

        return new Promise((resolve) => {
          this._workerEditor.onmessage = function (event) {
            if (event.data.type === "select:node") {
              resolve(event.data.result)
            }
          }
        })
      },
      cursorNode: async (mouseCoords: {
        x: number
        y: number
      }): Promise<TCursorOptions> => {
        this._workerEditor.postMessage({
          action: "cursor:node",
          mouseCoords
        })

        return new Promise((resolve) => {
          this._workerEditor.onmessage = function (event) {
            if (event.data.type === "cursor:node") {
              resolve(event.data.result)
            }
          }
        })
      }
    }
  }

  emit(name: TEventDrawer, callback: TFunction) {
    this._events.addEventListener(name, callback)
  }

  [MethodDispatchEvent](name: TEventDrawer, ...args: any[]) {
    this._events.emitEvent(name, args)
  }
}
