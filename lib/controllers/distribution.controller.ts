import * as YAML from "yaml"
import JSON5 from "json5"
import { AtomicEngine } from "../atomic-engine"
import {
  MethodExport,
  MethodGetAllInsideAtomic,
  MethodSetOptions
} from "../symbols"
import { makerNodes2D } from "../nodes/maker-2d"

export class DistributionController {
  private $app: AtomicEngine
  protected _formatExport: "JSON" | "YAML" = "JSON"

  constructor(app: AtomicEngine) {
    this.$app = app
  }

  import(text: string, format: "JSON" | "YAML" = "JSON") {
    const structure = format === "JSON" ? JSON5.parse(text) : YAML.parse(text)

    this.$app[MethodSetOptions](structure.options)

    const scenes = makerNodes2D(structure.scenes)

    this.$app.scenes.add(...scenes)

    this.$app.scenes.change(structure.scene)
    // const $config = structure.$config
  }

  export(
    mode: "editor" | "game",
    format: "JSON" | "YAML" = this.$app.options.export.format
  ) {
    return format === "YAML"
      ? YAML.stringify(this[MethodExport](mode))
      : JSON5.stringify(this[MethodExport](mode))
  }

  [MethodExport](mode: "editor" | "game") {
    const scenes = this.$app.scenes[MethodExport]()
    const all = this.$app[MethodGetAllInsideAtomic]()

    // $config: {
    //   currentScene: {
    //     name: this.getCore().$scenes.currentScene.name,
    //     uuid: this.getCore().$scenes.currentScene.uuid
    //   },
    //   pan: {
    //     translateX: this.getCore().$global.PAN.translateX,
    //     translateY: this.getCore().$global.PAN.translateY
    //   },
    //   zoom: {
    //     scale: this.getCore().$global.ZOOM.scale
    //   },
    //   selection: {
    //     background: this.getCore().$global.SELECTION.background,
    //     border: this.getCore().$global.SELECTION.border,
    //     borderColor: this.getCore().$global.SELECTION.borderColor,
    //     borderWidth: this.getCore().$global.SELECTION.borderWidth,
    //     radius: this.getCore().$global.SELECTION.radius
    //   },
    //   axis: {
    //     show: this.getCore().$global.AXIS.show,
    //     colorX: this.getCore().$global.AXIS.colorX,
    //     colorY: this.getCore().$global.AXIS.colorY
    //   },
    //   grid: {
    //     show: this.getCore().$global.GRID.show,
    //     cell: this.getCore().$global.GRID.cell,
    //     color: this.getCore().$global.GRID.color
    //   }
    // },

    return {
      options: all.options,
      scenes,
      $plugins: all.plugins,
      $configs: all.configs,
      $providers: all.providers,
      $controls: all.controls,
      $nodes: all.nodes,
      $global: all.global,
      scene: this.$app.scenes.currentScene.uuid
    }
  }
}
