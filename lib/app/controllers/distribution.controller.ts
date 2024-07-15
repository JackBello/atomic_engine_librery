import * as YAML from "yaml"
import JSON5 from "json5"
import { AtomicEngine } from "../../atomic-engine"
import {
  MethodExport,
  MethodGetAllInsideAtomic,
  MethodSetOptions
} from "../../symbols"
import { constructorNode } from "../../nodes/@global/constructor-node"
import { IOptionsAtomicGame } from "@/types"

export class DistributionController {
  private $app: AtomicEngine
  protected _formatExport: "JSON" | "YAML" = "JSON"

  constructor(app: AtomicEngine) {
    this.$app = app
  }

  import(text: string, format: "JSON" | "YAML" = "JSON") {
    const structure = format === "JSON" ? JSON5.parse(text) : YAML.parse(text)

    this.$app[MethodSetOptions](structure.options)

    const scenes = constructorNode(structure.scenes)

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

    if (mode === "game") {
      const optionsGame: IOptionsAtomicGame = {
        background: all.options.game.background,
        context: all.options.context,
        dimension: all.options.dimension,
        fps: {
          delay: all.options.fps.delay,
          velocity: all.options.fps.velocity
        },
        selector: all.options.selector,
        viewport: {
          height: all.options.game.viewport.height,
          width: all.options.game.viewport.width
        },
        x: all.options.game.x,
        y: all.options.game.y,
        center: all.options.game.center,
        full_screen: all.options.game.full_screen,
        full_size: all.options.game.full_size,
        icon: all.options.game.icon,
        resizable: all.options.game.resizable,
        title: all.options.game.title,
        nodes: {
          typeID: all.options.nodes.typeID
        }
      }

      return {
        options: optionsGame,
        scenes,
        $global: all.global,
        scene: this.$app.scenes.currentScene?.slug
      }
    }

    return {
      options: all.options,
      scenes,
      $plugins: all.plugins,
      $configs: all.configs,
      $controls: all.controls,
      $nodes: all.nodes,
      $global: all.global,
      scene: this.$app.scenes.currentScene?.slug
    }
  }
}
