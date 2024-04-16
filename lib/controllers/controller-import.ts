import * as YAML from "yaml"
import { NodeRectangle } from "../basic/nodes/2d/rectangle"
import { Scene2D } from "../basic/nodes/2d/scene"
import { SetAttributesNode, SetCore, SetUUIDNode } from "../const"

export class ControllerImport {
  protected static $core: any

  protected getCore() {
    return ControllerImport.$core
  }

  public load(data: string, format: "JSON" | "YAML" = "JSON") {
    const convert = format === "JSON" ? JSON.parse(data) : YAML.parse(data)

    this.getCore()._options.background = convert.background
    this.getCore()._options.context = convert.context
    this.getCore()._options.dimension = convert.dimension
    this.getCore()._options.height = convert.height
    this.getCore()._options.width = convert.width

    const $scenes = convert.$scenes
    const $config = convert.$config

    this.getCore().$global.AXIS.show = $config.axis.show
    this.getCore().$global.AXIS.colorX = $config.axis.colorX
    this.getCore().$global.AXIS.colorY = $config.axis.colorY

    this.getCore().$global.GRID.show = $config.grid.show
    this.getCore().$global.GRID.cell = $config.grid.cell
    this.getCore().$global.GRID.color = $config.grid.color

    this.getCore().$global.SELECTION.background = $config.selection.background
    this.getCore().$global.SELECTION.border = $config.selection.border
    this.getCore().$global.SELECTION.borderWidth = $config.selection.borderWidth
    this.getCore().$global.SELECTION.borderColor = $config.selection.borderColor
    this.getCore().$global.SELECTION.radius = $config.selection.radius

    this.executeNodes($scenes)

    this.getCore().$scenes.change($config.currentScene.uuid)

    this.getCore().$canvas.pan($config.pan.translateX, $config.pan.translateY)
    this.getCore().$canvas.zoom($config.zoom.scale)
  }

  protected executeNodes(nodes: any[], parent: any = undefined) {
    let create

    for (const node of nodes) {
      if (node.type === "Scene2D") {
        create = new Scene2D(node.name)
        create[SetUUIDNode](node.uuid)

        this.executeNodes(node.nodes, create)

        this.getCore().$scenes.add(create)
      }

      if (node.type === "NodeRectangle" && parent) {
        create = new NodeRectangle(node.options)
        create[SetUUIDNode](node.uuid)
        create[SetAttributesNode](node.attributes)
        create.setScript(node.script)

        parent.addNode(create)

        this.executeNodes(node.nodes, create)
      }
    }
  }

  static [SetCore](core: any) {
    ControllerImport.$core = core
  }
}
