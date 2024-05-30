import * as YAML from "yaml"
import { makerNodes2D } from "../maker-2d"
import { GlobalNode } from "../@global/node"
import {
  IControlEditor,
  IHandleSystemDraw,
  TExportNode,
  TOptionalNodes,
  TTypeNode
} from "../nodes.types"
import { PropAttributes, PropFunctions, PropMetaKeys } from "../symbols"
import { MethodExport } from "../../symbols"

export class Scene2D extends GlobalNode implements IHandleSystemDraw {
  readonly type: TTypeNode = "Scene2D"

  constructor(options?: Partial<IControlEditor>) {
    super(options)
  }

  process(): void {
    const _draw = this.getFunction("_draw")
    const _ready = this.getFunction("_ready")

    const mode =
      this.getApp().$global.MODE === "preview" ||
      this.getApp().$global.MODE === "game"

    if (_ready && mode) _ready()
    if (_draw && mode) _draw()
  }

  reset(property?: keyof IControlEditor): void {
    if (property) {
      this[property as string] = this._initial[property]
    } else {
      for (const key of Object.keys(this._initial)) {
        this[key] = this._initial[key as keyof IControlEditor]
      }
    }
  }

  toObject(): IControlEditor {
    return {
      ...(this as any)
    }
  }

  set(property: keyof IControlEditor, value: any): void
  set(properties: IControlEditor): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this[property] = value
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this._initial)) {
        this[key] = value
      }
    }
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON") {
    const structure: TExportNode<IControlEditor> =
      format === "YAML" ? YAML.parse(data) : JSON.parse(data)

    return makerNodes2D([structure])[0] as Scene2D
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<IControlEditor> & TOptionalNodes<"children"> {
    const nodes = []

    if (childNode)
      for (const node of this.getNodes()) {
        nodes.push(node[MethodExport]())
      }

    return {
      uuid: this._uuid,
      functions: [...this[PropFunctions].entries()],
      attributes: [...this[PropAttributes].entries()],
      metaKeys: [...this[PropMetaKeys].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
      script: this.script,
      parent: this.parent,
      deep: this.deep,
      index: this.index,
      nodes,
      options: {
        ...this.toObject()
      }
    }
  }
}
