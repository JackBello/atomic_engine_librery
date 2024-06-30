// transform.ts
export class Transform2D {
  position: [number, number]
  rotation: number
  scale: [number, number]

  constructor(
    position: [number, number] = [0, 0],
    rotation: number = 0,
    scale: [number, number] = [1, 1]
  ) {
    this.position = position
    this.rotation = rotation
    this.scale = scale
  }

  update(parentTransform: Transform2D) {
    this.position = [
      parentTransform.position[0] + this.position[0],
      parentTransform.position[1] + this.position[1]
    ]
    this.rotation += parentTransform.rotation
    this.scale = [
      parentTransform.scale[0] * this.scale[0],
      parentTransform.scale[1] * this.scale[1]
    ]
  }
}
