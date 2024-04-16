import { SetCore } from "../../const"
import { ControllerGlobal } from "../../controllers/controller-global"
import { AtomicEditor } from "../atomic-editor"
import { MainCanvas } from "../canvas/canvas"

export class PanAndZoomElementCanvas {
  protected static $core: AtomicEditor

  protected static _mouseCoords = {
    x: 0,
    y: 0
  }

  protected static _control = {
    isPanning: false,
    startCoords: {
      x: 0,
      y: 0
    },
    pan: {
      x: 0,
      y: 0
    },
    zoom: {
      scale: 1.0,
      speed: 0.1,
      min: 0.009,
      max: 15.0
    }
  }

  protected static getCanvasEditor() {
    return (this.$core.$canvas.getCanvas("editor") as MainCanvas).canvas
  }

  protected static getPosition(event: MouseEvent) {
    const { left, top } = this.getCanvasEditor().getBoundingClientRect()

    this._mouseCoords = {
      x: event.clientX - left,
      y: event.clientY - top
    }
  }

  public static pan(x: number, y: number) {
    this._control.pan = {
      x,
      y
    }

    this.$core.$global.PAN.translateX = x
    this.$core.$global.PAN.translateY = y
  }

  public static zoom(scale: number) {
    this._control.zoom.scale = scale

    this.$core.$global.ZOOM.scale = scale
  }

  public static mousedown(event: MouseEvent) {
    if (event.button !== 0) return

    this.getCanvasEditor().style.cursor = "grabbing"

    this._control.isPanning = true

    this._control.startCoords.x = event.clientX
    this._control.startCoords.y = event.clientY
  }

  public static mouseup(event: MouseEvent) {
    if (event.button !== 0) return

    this.getCanvasEditor().style.cursor = "grab"

    this._control.isPanning = false
  }

  public static mousemove(event: MouseEvent) {
    if (!this._control.isPanning) return

    this.getCanvasEditor().style.cursor = "grabbing"

    const dx = event.clientX - this._control.startCoords.x
    const dy = event.clientY - this._control.startCoords.y

    this._control.pan.x += dx
    this._control.pan.y += dy

    this.$core.$global.PAN.translateX = this._control.pan.x
    this.$core.$global.PAN.translateY = this._control.pan.y

    this._control.startCoords.x = event.clientX
    this._control.startCoords.y = event.clientY
  }

  public static wheel(event: WheelEvent) {
    const delta = event.deltaY > 0 ? -1 : 1

    this._control.zoom.scale += delta * this._control.zoom.speed
    this._control.zoom.scale = Math.max(
      this._control.zoom.min,
      Math.min(this._control.zoom.max, this._control.zoom.scale)
    )

    this.$core.$global.ZOOM.scale = this._control.zoom.scale
  }

  static [SetCore](core: any) {
    PanAndZoomElementCanvas.$core = core
  }
}
