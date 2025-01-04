import { SetID } from "@/app/symbols";
import type { TSerialize } from "@/app/types";
import { serializers } from "@/app/utils/serialize";
import type { IResourceSpriteSheet, TExportResource } from "../types";
import { ResourceImage } from "./image.resource";
import type { Resource } from "./resource";

export class ResourceSpriteSheet<O extends IResourceSpriteSheet = IResourceSpriteSheet> extends ResourceImage<O> {
    readonly NAME_CLASS: string = "ResourceSpriteSheet";

    constructor(slug: string, options: Omit<O, 'loaded'>) {
        super(slug, options)

        this._type = "image"

        this.init()
    }

    toObject(): O {
        return { ...this._options }
    }

    protected init(): void {
        this._element = document.createElement("img")

        this._element.setAttribute("data-type", this._type)
        this._element.setAttribute("data-id", this._id)
        this._element.setAttribute("data-slug", this._slug)
        this._element.setAttribute("data-format", this._format)
        this._element.setAttribute("data-resource", "sprite-sheet")
        this._element.setAttribute("data-src", this.source)
    }

    static import(data: string, format: TSerialize = "JSON"): Resource {
        const structure: TExportResource = serializers[format].parse(data);

        const invoke = new ResourceSpriteSheet(structure.slug, structure.options)

        invoke[SetID](structure.id)

        return invoke
    }
}