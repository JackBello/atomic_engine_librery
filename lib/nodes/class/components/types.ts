import type { TVec2 } from "@/nodes/global/types"
import type { Vector2 } from "@/nodes/vectors/vector-2"

export type TCameraComponent = {
    scale: Vector2 | TVec2
    position: Vector2 | TVec2
    offset: Vector2 | TVec2
    rotation: number
}

export type TCharacterBodyComponent = {
    isFloor: boolean
    velocity: Vector2 | TVec2
}

export type TRigidBodyComponent = {
    velocity: Vector2 | TVec2
    acceleration: Vector2 | TVec2
    mass: number
    gravity: number
    friction: number
    angle: number
}

export type TCollisionComponent = {
    debug: boolean
    fill: string
    disabled: boolean
}

export type TCollisionShapeComponent = {
    width: number,
    height: number,
    position: Vector2 | TVec2,
    scale: Vector2 | TVec2,
    rotation: number,
    shape: "rectangle" | "circle" | "triangle",
}