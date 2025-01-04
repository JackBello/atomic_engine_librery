import type { TSerialize } from "@/app/types";
import { Resource } from "./resource";
import type { IBaseResource, TExportResource } from "../types";
import { SetID } from "@/app/symbols";
import { serializers } from "@/app/utils/serialize";

export class ResourceImage<O extends IBaseResource = IBaseResource> extends Resource<"image", O> {
    readonly NAME_CLASS: string = "ResourceImage";

    constructor(slug: string, options: Omit<O, 'loaded'>) {
        super(slug, options)

        this._type = "image"

        this.init()
    }

    protected init(): void {
        this._element = document.createElement("img")

        this._element.setAttribute("data-type", this._type)
        this._element.setAttribute("data-id", this._id)
        this._element.setAttribute("data-slug", this._slug)
        this._element.setAttribute("data-format", this._format)
        this._element.setAttribute("data-src", this.source)
    }

    load(): Promise<boolean> {
        return new Promise(resolve => {
            this.element.src = this.element.getAttribute("data-src") as string
            this.element.removeAttribute("data-src")

            this.element.onload = () => {
                resolve(true)
                this._options.loaded = true
            }

            this.element.onerror = () =>
                resolve(false)
        })
    }

    static import(data: string, format: TSerialize = "JSON"): Resource {
        const structure: TExportResource = serializers[format].parse(data);

        const invoke = new ResourceImage(structure.slug, structure.options)

        invoke[SetID](structure.id)

        return invoke
    }
}