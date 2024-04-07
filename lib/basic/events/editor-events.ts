import { AtomicCore } from "../atomic-core"
import { EditionElementCanvas } from "../editor/EditionElementCanvas"
import { PanAndZoomElementCanvas } from "../editor/PanAndZoomElementCanvas"

export class EventsEditor {
  public static $core: AtomicCore

  protected getCore() {
    return EventsEditor.$core
  }

  public mousedown(event: MouseEvent) {
    if (this.getCore().$canvasEditor.modeEdition === "edition-element-canvas")
      EditionElementCanvas.mousedown(event)
    if (
      this.getCore().$canvasEditor.modeEdition === "pan-and-zoom-element-canvas"
    )
      PanAndZoomElementCanvas.mousedown(event)
  }

  public mouseup(event: MouseEvent) {
    if (this.getCore().$canvasEditor.modeEdition === "edition-element-canvas")
      EditionElementCanvas.mouseup(event)
    if (
      this.getCore().$canvasEditor.modeEdition === "pan-and-zoom-element-canvas"
    )
      PanAndZoomElementCanvas.mouseup(event)
  }

  public mousemove(event: MouseEvent) {
    if (this.getCore().$canvasEditor.modeEdition === "edition-element-canvas")
      EditionElementCanvas.mousemove(event)
    if (
      this.getCore().$canvasEditor.modeEdition === "pan-and-zoom-element-canvas"
    )
      PanAndZoomElementCanvas.mousemove(event)
  }

  public wheel(event: WheelEvent) {
    if (
      this.getCore().$canvasEditor.modeEdition === "pan-and-zoom-element-canvas"
    )
      PanAndZoomElementCanvas.wheel(event)
  }

  public keydown(event: KeyboardEvent) {
    if (this.getCore().$canvasEditor.modeEdition === "edition-element-canvas")
      EditionElementCanvas.keydown(event)
  }

  public keyup(event: KeyboardEvent) {
    if (this.getCore().$canvasEditor.modeEdition === "edition-element-canvas")
      EditionElementCanvas.keyup(event)
  }

  public keypress(event: KeyboardEvent) {
    if (this.getCore().$canvasEditor.modeEdition === "edition-element-canvas")
      EditionElementCanvas.keypress(event)
  }
}
