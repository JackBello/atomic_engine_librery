import type { TAnything } from "@/app/types";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";

import { GetApp, SetApp } from "@/app/symbols";
import { $ConstructorNodes, $ConstructorScript } from "../symbols";

import ConstructorNodes from "../global/constructors/constructor-nodes";
import ConstructorScript from "../global/constructors/constructor-script";

export default abstract class AbstractNode {
	[key: string | symbol]: TAnything;

	private static CONTEXT = document.createElement("canvas").getContext(
		"2d",
	) as CanvasRenderingContext2D;

	private static APP: EngineCore | GameCore;

	static [$ConstructorNodes] = new ConstructorNodes();
	[$ConstructorScript] = new ConstructorScript();

	get [GetApp]() {
		return AbstractNode.APP;
	}

	static [SetApp](app: EngineCore | GameCore): void {
		AbstractNode.APP = app;
	}

	protected readonly utils = {
		omitKeys(
			object: TAnything,
			keysOmit: string[],
			keysAdd: string[] = [],
		) {
			const duplicate: Record<string, TAnything> = {};

			for (const key in object) {
				if (keysOmit.indexOf(key) === -1) {
					duplicate[key] = object[key];
				}
			}

			if (keysAdd.length > 0) {
				for (const key of keysAdd) {
					duplicate[key] = 0;
				}
			}

			return duplicate;
		},
		infoText: (text: string, font: string) => {
			AbstractNode.CONTEXT.font = font;

			return AbstractNode.CONTEXT.measureText(text);
		},
	};
}
