import * as YAML from "yaml"
import { PrepareExport, SetCore } from "../const"

export class ControllerExport {
  protected static $core: any

  protected getCore() {
    return ControllerExport.$core
  }

  public save(format: "JSON" | "YAML" = "JSON") {
    const $scenes = this.getCore().$scenes[PrepareExport]()

    const data = {
      background: this.getCore()._options.background,
      context: this.getCore().CONTEXT,
      dimension: this.getCore().DIMENSION,
      width: this.getCore().width,
      height: this.getCore().height,
      $config: {
        currentScene: {
          name: this.getCore().$scenes.currentScene.name,
          uuid: this.getCore().$scenes.currentScene.uuid
        },
        pan: {
          translateX: this.getCore().$global.PAN.translateX,
          translateY: this.getCore().$global.PAN.translateY
        },
        zoom: {
          scale: this.getCore().$global.ZOOM.scale
        },
        selection: {
          background: this.getCore().$global.SELECTION.background,
          border: this.getCore().$global.SELECTION.border,
          borderColor: this.getCore().$global.SELECTION.borderColor,
          borderWidth: this.getCore().$global.SELECTION.borderWidth,
          radius: this.getCore().$global.SELECTION.radius
        },
        axis: {
          show: this.getCore().$global.AXIS.show,
          colorX: this.getCore().$global.AXIS.colorX,
          colorY: this.getCore().$global.AXIS.colorY
        },
        grid: {
          show: this.getCore().$global.GRID.show,
          cell: this.getCore().$global.GRID.cell,
          color: this.getCore().$global.GRID.color
        }
      },
      $scenes
    }

    if (format === "YAML") return YAML.stringify(data)

    return JSON.stringify(data)
  }

  static [SetCore](core: any) {
    ControllerExport.$core = core
  }
}
