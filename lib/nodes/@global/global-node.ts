import * as YAML from "yaml"
import JSON5 from "json5"
import { uid } from "uid"
import { v4 } from "@lukeed/uuid"
import { AbstractNode } from "../abstract/node.abstract"
import {
  IControlEditor,
  IControlHierarchy,
  IControlNode,
  IGlobalNode,
  INodeRootWorker,
  INodeWorker,
  TExportNode,
  TFunctionTuple,
  TTypeNodes
} from "./node.types"
import {
  MethodSetIndex,
  MethodSetId,
  PropType,
  MethodSetParent
} from "../symbols"
import { constructorNode } from "./constructor-node"
import { TFunction } from "../../types"
import EventObserver from "../../app/utils/observer"
import { handleScript } from "../../app/utils/script"
import { DEFAULT_CONFIG_PRIMITIVE_NODE } from "../../configs/nodes/@global/node"
import { TEventGlobalNode } from "../event.type"
import {
  MethodDispatchEvent,
  MethodDispatchScript,
  MethodExport,
  MethodExportWorker,
  MethodGetApp
} from "../../symbols"
import { omitKeys } from "@/app/utils/json"
import { TCanvasNodes, TCanvasNodeOptions } from "../types"
import { HandlerAttribute } from "./handlers/attributes"
import { HandlerComponent } from "./handlers/components"
import { HandlerFunction } from "./handlers/functions"
import { HandlerMetaKey } from "./handlers/meta-keys"
import { HandlerNode } from "./handlers/nodes"

export class GlobalNode
  extends AbstractNode
  implements IGlobalNode, IControlEditor, IControlNode, IControlHierarchy
{
  protected _omit: string[] = ["name", "description"]

  protected _options: TCanvasNodeOptions["global/node"]
  protected _initial: TCanvasNodeOptions["global/node"]

  protected _parent: undefined | GlobalNode

  protected _events: EventObserver

  protected _index: number
  protected _slug: string
  protected _id: string;

  [PropType]: TCanvasNodes = "global/node"

  readonly NODE_NAME: TTypeNodes = "GlobalNode"

  readonly $attributes: HandlerAttribute
  readonly $components: HandlerComponent
  readonly $functions: HandlerFunction
  readonly $metaKeys: HandlerMetaKey
  readonly $nodes: HandlerNode

  script: string | URL | null

  get parent(): GlobalNode | undefined {
    return this._parent
  }

  get first(): GlobalNode | undefined {
    if (this.parent) return this.parent.$nodes.all[0]
    else return undefined
  }

  get last(): GlobalNode | undefined {
    if (this.parent) return this.parent.$nodes.all[this.parent.$nodes.size - 1]
    else return undefined
  }

  get nextSibling(): GlobalNode | undefined {
    if (this.parent) return this.parent.$nodes.all[this.index + 1]
    else return undefined
  }

  get previousSibling(): GlobalNode | undefined {
    if (this.parent) return this.parent.$nodes.all[this.index - 1]
    else return undefined
  }

  get index(): number {
    return this._index
  }

  get path(): string {
    if (this.parent) return this.parent.path + "/" + this._index
    else return this._index.toString()
  }

  get slug() {
    return this._slug
  }

  get id(): string {
    return this._id
  }

  set slug(value: string) {
    this._slug = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        slug: value
      },
      this.path,
      "path",
      "index"
    )
  }

  get title() {
    return this._options.title
  }

  get description() {
    return this._options.description
  }

  set title(value: string) {
    this._options.title = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        title: value
      },
      this.path,
      "path",
      "index"
    )
  }

  set description(value: string) {
    this._options.description = value

    this[MethodGetApp]().drawer.nodes.updateNode(
      {
        description: value
      },
      this.path,
      "path",
      "index"
    )

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  constructor(
    slug: string,
    options?: Partial<TCanvasNodeOptions["global/node"]>
  ) {
    super()

    this._initial = {
      ...DEFAULT_CONFIG_PRIMITIVE_NODE,
      ...options
    }
    this._options = { ...this._initial }

    this._events = new EventObserver()

    this._index = 0
    this._slug = slug
    this._id =
      this[MethodGetApp]().options.nodes.typeID === "uuid" ? v4() : uid(12)

    this.script = null

    this.$attributes = new HandlerAttribute(this)
    this.$components = new HandlerComponent(this)
    this.$functions = new HandlerFunction(this)
    this.$metaKeys = new HandlerMetaKey(this)
    this.$nodes = new HandlerNode(this)
  }

  clone(): GlobalNode {
    return constructorNode(this[MethodExport](true))
  }

  emit(event: TEventGlobalNode, callback: TFunction): void {
    return this._events.addEventListener(event, callback)
  }

  reset(property?: keyof TCanvasNodeOptions["global/node"]): void {
    if (property) {
      this._options[property] = this._initial[property]

      if (!this._omit.includes(property)) {
        const relative: any = {}

        relative[property] = this._initial[property]

        this[MethodGetApp]().drawer.nodes.updateNode(
          relative,
          this.path,
          "path",
          "index"
        )
      }
    } else {
      this._options = { ...this._initial }

      this[MethodGetApp]().drawer.nodes.updateNode(
        omitKeys(this._initial, this._omit),
        this.path,
        "path",
        "index"
      )
    }

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  toObject(): TCanvasNodeOptions["global/node"] {
    return this._options
  }

  set(property: keyof TCanvasNodeOptions["global/node"], value: any): void
  set(properties: Partial<TCanvasNodeOptions["global/node"]>): void
  set(property?: unknown, value?: unknown, properties?: unknown): void {
    if (property && typeof property === "string" && value) {
      this._options[property as keyof TCanvasNodeOptions["global/node"]] =
        value as any

      if (!this._omit.includes(property)) {
        const relative: any = {}

        relative[property] = value

        this[MethodGetApp]().drawer.nodes.updateNode(
          relative,
          this.path,
          "path",
          "index"
        )
      }
    } else if (typeof properties !== "string") {
      for (const [key, value] of Object.entries(this.properties)) {
        this._options[key as keyof TCanvasNodeOptions["global/node"]] =
          value as any
      }

      this[MethodGetApp]().drawer.nodes.updateNode(
        omitKeys(properties, this._omit),
        this.path,
        "path",
        "index"
      )
    }

    this[MethodGetApp]().drawer.render.reDraw()

    this[MethodGetApp]().changeGlobal("re-draw", true)
  }

  export(format: "JSON" | "YAML" = "JSON"): string {
    return format === "YAML"
      ? YAML.stringify(this[MethodExport]())
      : JSON5.stringify(this[MethodExport]())
  }

  static import(data: string, format: "JSON" | "YAML" = "JSON"): GlobalNode {
    const structure: TExportNode<TCanvasNodeOptions["global/node"]> =
      format === "YAML" ? YAML.parse(data) : JSON5.parse(data)

    return constructorNode(structure)
  }

  [MethodSetParent](parent: GlobalNode | undefined) {
    this._parent = parent
  }

  [MethodSetIndex](index: number): void {
    this._index = index
  }

  [MethodSetId](uuid: string): void {
    this._id = uuid
  }

  [MethodDispatchEvent](event: any, ...args: any[]): void {
    return this._events.emitEvent(event, ...args)
  }

  async [MethodDispatchScript]() {
    if (this.script === null) return

    const response = await handleScript(
      this.script as string,
      this,
      this[MethodGetApp]()
    )

    const functions: TFunctionTuple[] = Object.entries(response.$functions)

    functions.forEach(([name, func]) => {
      if (!name.startsWith("_")) this[name] = func
      this.$functions.add(name, func)
    })
  }

  [MethodExportWorker](childNode: boolean = true): INodeRootWorker {
    const nodes: INodeWorker[] = []

    if (childNode && this.$nodes.size)
      for (const node of this.$nodes.all) {
        nodes.push(node[MethodExportWorker](true) as INodeWorker)
      }

    return {
      __type__: this[PropType],
      __path__: this.path,
      location: {
        id: this.id,
        index: this.index,
        slug: this.slug
      },
      nodes: nodes,
      options: omitKeys(this.toObject(), this._omit)
    }
  }

  [MethodExport](
    childNode: boolean = true
  ): TExportNode<TCanvasNodeOptions["global/node"]> {
    const nodes: TExportNode<any>[] = []

    if (childNode && this.$nodes.size)
      for (const node of this.$nodes.all) {
        nodes.push(node[MethodExport](childNode))
      }

    return {
      id: this.id,
      slug: this.slug,
      attributes: this.$attributes.toEntries(),
      metaKeys: this.$metaKeys.toEntries(),
      type: this.NODE_NAME,
      script: this.script,
      path: this.path,
      index: this.index,
      nodes,
      options: this.toObject()
    }
  }
}
