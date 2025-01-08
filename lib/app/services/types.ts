import type { TAnything } from "../types"

export type TOrigin = "no-cors" | "same-origin" | "anonymous" | "cross-origin" | "use-credentials"

export interface IBaseResource {
    source: string | URL
    origin: TOrigin
    loaded: boolean
}

export interface IResourceSpriteSheet extends IBaseResource {
    width: number
    height: number
    border: number | [number, number]
    spacing: number | [number, number]
    grid: number | [number, number] | Record<`row-${number}`, number>
}

export type TExportResource<O extends TAnything = TAnything> = {
    id: string,
    slug: string,
    type: string,
    category: string,
    options: O
}

