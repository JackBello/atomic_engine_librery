import type { TCanvasNodeOptions, TCanvasNodes } from "@/nodes/types";
import { Node2D } from "./node";
import type { ResourceSpriteSheet } from "@/app/services/resources/sprite-sheet.resource";
import type { TExportNode, TTypeNodes, TVec2 } from "@/nodes/global/types";
import { _Render, GetApp, NodeFunctionClone, NodeFunctionImport, NodeFunctionMake, NodeFunctionReset, NodeFunctionSet, NodePropType } from "@/symbols";
import { GlobalNode, Vector2 } from "@/nodes";
import type { TAnything, TFunction, TSerialize } from "@/app/types";
import type { TEventNode, TEventNode2D } from "@/nodes/events";
import { DEFAULT_CONFIG_SPRITE_2D } from "@/configs/nodes/2D/sprite";

export class Sprite2D<T extends TCanvasNodeOptions["2D/sprite"] = TCanvasNodeOptions["2D/sprite"]> extends Node2D<T> {
    [NodePropType]: TCanvasNodes = "2D/sprite";

    protected _omit: string[] = ["loaded", "type", "format", "element", 'settings'];

    readonly NODE_NAME: TTypeNodes = "Sprite2D";

    protected _resource?: ResourceSpriteSheet;

    get smoothing() {
        return this._options.smoothing
    }

    get smoothingQuality() {
        return this._options.smoothingQuality
    }

    get resource() {
        return this._resource
    }

    get element() {
        return this._options.element
    }

    get format() {
        return this._options.format
    }

    get type() {
        return this._options.type
    }

    get loaded() {
        return this._options.loaded
    }

    get frame() {
        return this._options.frame
    }

    get frameCoords(): Vector2 {
        return this._options.frameCoords as Vector2
    }

    get spriteSettings() {
        return this._options.settings
    }

    get width() {
        return this._options.width;
    }

    get height() {
        return this._options.height;
    }

    set frame(value: number) {
        this._options.frame = value;

        this[GetApp][_Render].draw = true;
    }

    set frameCoords(value: Vector2 | TVec2) {
        if (typeof value === "string") {
            this._options.frameCoords = Vector2.import(value)
        } else {
            this._options.frameCoords = value
        }

        this[GetApp][_Render].draw = true;
    }

    set width(value: number) {
        this._options.width = value;

        this[GetApp][_Render].draw = true;
    }

    set height(value: number) {
        this._options.height = value;

        this[GetApp][_Render].draw = true;
    }

    set smoothing(value: boolean) {
        this._options.smoothing = value

        this[GetApp][_Render].draw = true;
    }

    set smoothingQuality(value: "low" | "medium" | "high") {
        this._options.smoothingQuality = value

        this[GetApp][_Render].draw = true;
    }

    constructor(slug: string, options?: Partial<Omit<TCanvasNodeOptions["2D/sprite"], 'element' | 'format' | 'settings'>>, resource?: ResourceSpriteSheet) {
        super(slug, { ...DEFAULT_CONFIG_SPRITE_2D, ...options });

        if (typeof this._initial.frameCoords === "string") {
            this._initial.frameCoords = Vector2.import(this._initial.frameCoords)
            this._options.frameCoords = this._initial.frameCoords
        }

        this._resource = resource;

        this.loadResource()
    }

    protected loadResource() {
        if (!this._resource) return

        this._initial.loaded = this._resource.loaded
        this._initial.element = this._resource.element
        this._initial.format = this._resource.format
        this._initial.type = this._resource.type
        this._initial.settings = this.utils.omitKeys(this._resource.toObject(), ['source', 'origin', 'loaded']) as TCanvasNodeOptions["2D/sprite"]['settings']

        this._options.loaded = this._initial.loaded
        this._options.element = this._initial.element
        this._options.format = this._initial.format
        this._options.type = this._initial.type
        this._options.settings = this._initial.settings

        this._addons.set(`${this._resource.TYPE}/${this._resource.NAME_CLASS}`, this._resource)
    }

    removeResource() {
        if (!this._resource) return

        this._initial.loaded = false
        this._initial.element = undefined as TAnything
        this._initial.format = "" as TAnything
        this._initial.type = "image"
        this._initial.settings = {} as TAnything

        this._options.loaded = this._initial.loaded
        this._options.element = this._initial.element
        this._options.format = this._initial.format
        this._options.type = this._initial.type
        this._options.settings = this._initial.settings

        this._addons.delete(`${this._resource.TYPE}/${this._resource.NAME_CLASS}`)

        this._resource = undefined

        this[GetApp][_Render].draw = true;
    }

    changeResource(resource?: ResourceSpriteSheet) {
        this._resource = resource
        this.loadResource()

        this[GetApp][_Render].draw = true;
    }

    originalWidth() {
        if (this.loaded) {
            this.width = this._options.settings.width
        }
    }

    originalHeight() {
        if (this.loaded) {
            this.height = this._options.settings.height
        }
    }

    originalSize() {
        this.originalWidth()
        this.originalHeight()
    }

    async clone(): Promise<Sprite2D> {
        return await this[NodeFunctionClone]() as TAnything;
    }

    emit(event: TEventNode | TEventNode2D, callback: TFunction): void {
        this._events.addEventListener(event, callback);
    }

    reset(property?: keyof Omit<TCanvasNodeOptions["2D/sprite"], 'element' | 'format' | 'settings'>): void {
        this[NodeFunctionReset](property)

        this.processOrigin();
        this.processRotation();

        this[GetApp][_Render].draw = true;
    }

    toObject(): T {
        const options = { ...super.toObject() }

        options.frameCoords = this.frameCoords.export() as TVec2

        options.format = this._options.format

        return options
    }

    set(property: keyof Omit<TCanvasNodeOptions["2D/sprite"], 'element' | 'format' | 'settings'>, value: TAnything): void;
    set(properties: Partial<Omit<TCanvasNodeOptions["2D/sprite"], 'element' | 'format' | 'settings'>>): void;
    set(properties?: unknown, value?: unknown): void {
        this[NodeFunctionSet](properties, value)

        this.processOrigin();
        this.processRotation();

        this[GetApp][_Render].draw = true;
    }

    static async import(data: string, format: TSerialize = "JSON"): Promise<Sprite2D> {
        return await GlobalNode[NodeFunctionImport](data, format) as TAnything;
    }

    static async make(structure: TExportNode<TAnything>): Promise<Sprite2D> {
        return await GlobalNode[NodeFunctionMake](structure) as TAnything;
    }

}