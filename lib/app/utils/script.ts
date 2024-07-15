import { AtomicEngine } from "@/atomic-engine"
import { AtomicGame } from "@/atomic-game"
import { GlobalNode } from "@/nodes"

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

export const handleScript = async (
  code: string,
  node: GlobalNode,
  app: AtomicEngine | AtomicGame
) => {
  let viewport = {
    width: 0,
    height: 0
  }

  if (app instanceof AtomicEngine) {
    viewport = app.options.game.viewport
  } else if (app instanceof AtomicGame) {
    viewport = app.options.viewport
  }

  const _return = `return {$functions:{${
    code.indexOf("_ready") !== -1 ? "_ready," : ""
  }${code.indexOf("_process") !== -1 ? "_process," : ""}${
    code.indexOf("_draw") !== -1 ? "_draw," : ""
  }${code.indexOf("_destroyed") !== -1 ? "_destroyed," : ""}}};`

  const helpers = {
    $collider: () => {
      const collision = node.$nodes.all.find(
        (node) => node.NODE_NAME === "CollisionShape2D"
      )

      return collision?.getCollider()
    },
    $destroy: () => {
      console.log("destroyed")
      // app.scenes.currentScene?.$nodes.delete(node.path as any)
    },
    $finish: () => {
      app.changeGlobal("status", "pause")
    }
  }

  const _code = `with(helpers) { with (node) {${code}; ${_return}} }`

  const execute = new AsyncFunction("node, helpers, viewport", _code)

  return await execute(node, helpers, viewport)
}
