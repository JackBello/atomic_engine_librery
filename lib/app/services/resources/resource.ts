import * as stdUlid from "@std/ulid";
import type { MapFormatSource, MapTypeSource, SourceType } from "@/nodes/global/types";
import { ExportData, SetID } from "@/app/symbols";
import type { TAnything, TSerialize } from "@/app/types";
import type { IBaseResource, TExportResource, TOrigin } from "../types";
import { DEFAULT_CONFIG_RESOURCE } from "@/configs/resources/resource.config"
import { serializers } from "@/app/utils/serialize";

export class Resource<S extends SourceType = SourceType, O extends IBaseResource = IBaseResource> {
    protected _omit: string[] = [];

    protected _id: string
    protected _slug: string
    protected _element!: MapTypeSource[S]
    protected _type!: S
    protected _format: MapFormatSource[S]
    protected _options: O

    readonly TYPE: string = "resource"
    readonly NAME_CLASS: string = "Resource"

    get id() {
        return this._id
    }

    get slug() {
        return this._slug
    }

    get source() {
        if (this._options.source instanceof URL) return this._options.source.href
        return this._options.source
    }

    get origin() {
        return this._options.origin
    }

    get loaded() {
        return this._options.loaded
    }

    get format() {
        return this._format
    }

    get type() {
        return this._type
    }

    get element() {
        return this._element
    }

    set origin(value: TOrigin) {
        this._options.origin = value
    }

    constructor(slug: string, options?: Partial<Pick<O, "source" | "origin">>) {
        this._id = stdUlid.monotonicUlid(12);
        this._slug = slug
        this._options = { ...DEFAULT_CONFIG_RESOURCE, ...options } as O

        if (this._options.source === "" || (this._options.source as URL).href === "")
            throw new Error("You cannot assign an empty source to a resource.")

        this._format = this.getFormat(this._options.source) as MapFormatSource[S]
    }

    async resolver(): Promise<TAnything> { }

    async load(): Promise<TAnything> { }

    protected init() { }

    protected getFormat(src: string | URL) {
        let format = ""

        if (typeof src === "string" && URL.canParse(src) && !src.startsWith("data:")) {
            format = src.slice(src.lastIndexOf(".") + 1)
        } else if (typeof src === "string" && URL.canParse(src) && src.startsWith("data:")) {
            const [data] = src.split(";")
            format = data.slice(5).split("/")[1]
        } else if (src instanceof URL) {
            const source = src.href
            format = source.slice(source.lastIndexOf(".") + 1)
        }

        return format
    }

    toObject(): O {
        return { ...this._options }
    }

    export(format: TSerialize = "JSON") {
        return serializers[format].stringify(this[ExportData]());
    }

    static import(data: string, format: TSerialize = "JSON"): Resource {
        const structure: TExportResource = serializers[format].parse(data);

        const invoke = new Resource(structure.slug, structure.options)

        invoke[SetID](structure.id)

        return invoke
    }

    [SetID](id: string) {
        this._id = id;
    }

    [ExportData](): TExportResource {
        return {
            id: this._id,
            slug: this._slug,
            type: this.TYPE,
            name_class: this.NAME_CLASS,
            options: this.toObject()
        }
    }
}