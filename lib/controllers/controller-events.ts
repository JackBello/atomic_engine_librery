import { AtomicEditor } from "../basic/atomic-editor"
import { EditionElementCanvas } from "../basic/editor/EditionElementCanvas"
import { PanAndZoomElementCanvas } from "../basic/editor/PanAndZoomElementCanvas"
import { InternalSettings, LoadEvents, SetCore } from "../const"

export class ControllerEvents {
  protected static $core: AtomicEditor

  protected getCore() {
    return ControllerEvents.$core
  }

  public mousedown(event: MouseEvent) {
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "edition-element-canvas"
    )
      EditionElementCanvas.mousedown(event)
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "pan-and-zoom-element-canvas"
    )
      PanAndZoomElementCanvas.mousedown(event)
  }

  public mouseup(event: MouseEvent) {
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "edition-element-canvas"
    )
      EditionElementCanvas.mouseup(event)
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "pan-and-zoom-element-canvas"
    )
      PanAndZoomElementCanvas.mouseup(event)
  }

  public mousemove(event: MouseEvent) {
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "edition-element-canvas"
    )
      EditionElementCanvas.mousemove(event)
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "pan-and-zoom-element-canvas"
    )
      PanAndZoomElementCanvas.mousemove(event)
  }

  public wheel(event: WheelEvent) {
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "pan-and-zoom-element-canvas"
    )
      PanAndZoomElementCanvas.wheel(event)
  }

  public keydown(event: KeyboardEvent) {
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "edition-element-canvas"
    )
      EditionElementCanvas.keydown(event)
  }

  public keyup(event: KeyboardEvent) {
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "edition-element-canvas"
    )
      EditionElementCanvas.keyup(event)
  }

  public keypress(event: KeyboardEvent) {
    if (
      this.getCore().$global[InternalSettings].modeEdition ===
      "edition-element-canvas"
    )
      EditionElementCanvas.keypress(event)
  }

  static [SetCore](core: AtomicEditor) {
    ControllerEvents.$core = core
  }

  [LoadEvents]() {
    let ref: any

    window.addEventListener("mousedown", (event) => {
      ref = (event.target as HTMLElement).dataset.typeCanvas

      if (ref === "editor") {
        event.preventDefault()
        this.mousedown(event)
      }
    })

    window.addEventListener("mouseup", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this.mouseup(event)
      }
    })

    window.addEventListener("mousemove", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this.mousemove(event)
      }
    })

    window.addEventListener("wheel", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this.wheel(event)
      }
    })

    window.addEventListener("keydown", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this.keydown(event)
      }
    })

    window.addEventListener("keyup", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this.keyup(event)
      }
    })

    window.addEventListener("keypress", (event) => {
      if (ref === "editor") {
        event.preventDefault()
        this.keypress(event)
      }
    })
  }
}
