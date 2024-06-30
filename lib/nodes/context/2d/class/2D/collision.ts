import { TAllDrawsContext, TTypeNodeOptionsContext2D } from "@/workers/types"
import { Node2D } from "./node"
import { PropType } from "@/nodes/symbols"
import { TTypeNode } from "@/nodes/nodes.types"
import { DEFAULT_CONFIG_NODE_2D } from "@/configs/nodes/2D/node"

export class Collision2D extends Node2D {
  [PropType]: TAllDrawsContext = "2D/collision"

  protected _omit: string[] = [
    "centerRotation",
    "centerScale",
    "flipX",
    "flipY",
    "originX",
    "originY",
    "rotationType",
    "title",
    "name"
  ]

  readonly NODE_NAME: TTypeNode = "Collision2D"

  constructor(
    options?: Partial<TTypeNodeOptionsContext2D["primitive:2D/node"]>
  ) {
    super({ ...DEFAULT_CONFIG_NODE_2D, ...options })
  }
}
