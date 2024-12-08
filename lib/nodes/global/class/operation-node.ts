import * as stdUlid from "@std/ulid";

import type { EngineCore } from "@/app/engine";
import type { GameCore } from "@/app/game";
import type { TAnything } from "@/app/types";
import EventObserver from "@/app/utils/observer";
import { NodeFunctionReset, NodeFunctionSet } from "@/nodes/symbols";

export class OperationNode<T = TAnything, C = CanvasRenderingContext2D> {
	[key: string]: TAnything;

	protected $app: EngineCore | GameCore

	protected _options!: T;

	protected _events: EventObserver;

	protected _index: number;
	protected _slug: string;
	protected _id: string;

	constructor(app: EngineCore | GameCore, slug: string) {
		this.$app = app;

		this._events = new EventObserver();

		this._index = 0;
		this._slug = slug;
		this._id = stdUlid.monotonicUlid(12);
	}

	init() {

	}

	execute(context: C) {
		context
	}

	[NodeFunctionReset](property?: TAnything) {
		if (property) {
			(this._options as TAnything)[property] = (this._initial as TAnything)[
				property
			];
		} else {
			this._options = { ...this._initial };
		}
	}

	[NodeFunctionSet](property: TAnything, value: TAnything): void;
	[NodeFunctionSet](properties: TAnything): void;
	[NodeFunctionSet](properties?: TAnything, value?: TAnything): void {
		if (properties && typeof properties === "string" && value) {
			(this._options as TAnything)[properties] = value;
		}

		if (properties && typeof properties !== "object") {
			for (const [key, value] of Object.entries(properties)) {
				(this._options as TAnything)[key] = value;
			}
		}
	}
}
