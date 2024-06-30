import { AtomicEngine } from "@/atomic-engine"
import { AtomicGame } from "@/atomic-game"
import { PrimitiveNode } from "@/nodes"
import { CollisionShape2D } from "@/nodes/context/2d/class/2D/collision-shape"

export class CollisionController {
  private $app: AtomicEngine | AtomicGame

  protected shapesCollisions: Record<
    string,
    (
      firstCollision: CollisionShape2D,
      secondCollision: CollisionShape2D
    ) => boolean
  > = {
    "rectangle-rectangle": (
      firstCollision: CollisionShape2D,
      secondCollision: CollisionShape2D
    ) => {
      const firstCollisionWidth = firstCollision.width * firstCollision.scale
      const firstCollisionHeight = firstCollision.height * firstCollision.scale

      const secondCollisionWidth = secondCollision.width * secondCollision.scale
      const secondCollisionHeight =
        secondCollision.height * secondCollision.scale

      return (
        firstCollision.x < secondCollision.x + secondCollisionWidth &&
        firstCollision.x + firstCollisionWidth > secondCollision.x &&
        firstCollision.y < secondCollision.y + secondCollisionHeight &&
        firstCollision.y + firstCollisionHeight > secondCollision.y
      )
    },
    "circle-circle": (
      firstCollision: CollisionShape2D,
      secondCollision: CollisionShape2D
    ) => {
      firstCollision
      secondCollision

      return true
    },
    "rectangle-circle": (
      firstCollision: CollisionShape2D,
      secondCollision: CollisionShape2D
    ) => {
      firstCollision
      secondCollision

      return true
    },
    "circle-rectangle": (
      firstCollision: CollisionShape2D,
      secondCollision: CollisionShape2D
    ) => {
      firstCollision
      secondCollision

      return true
    }
  }

  constructor(app: AtomicEngine | AtomicGame) {
    this.$app = app
  }

  public checkCollisions(nodes: PrimitiveNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const firstNode = nodes[i]
        const secondNode = nodes[j]

        if (
          firstNode instanceof CollisionShape2D &&
          secondNode instanceof CollisionShape2D &&
          this.isColliding(firstNode, secondNode)
        ) {
          this.resolveCollision(firstNode, secondNode)
        }
      }

      if (nodes[i].nodes.length > 0) {
        this.checkCollisions(nodes[i].nodes)
      }
    }
  }

  protected isColliding(
    firstCollision: CollisionShape2D,
    secondCollision: CollisionShape2D
  ) {
    const typeCollision = firstCollision.shape + "-" + secondCollision.shape

    const funcCollision = this.shapesCollisions[typeCollision]

    if (funcCollision) return funcCollision(firstCollision, secondCollision)

    return false
  }

  protected resolveCollision(
    firstNode: CollisionShape2D,
    secondNode: CollisionShape2D
  ) {
    firstNode.collider = secondNode
  }
}
