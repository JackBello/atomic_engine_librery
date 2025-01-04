import type { TAnything } from "@/app/types";

import { GetApp } from "@/app/symbols";
import { $ConstructorNodes, $ConstructorScript } from "../symbols";

import { ConstructorNodes } from "../global/constructors/constructor-nodes";
import ConstructorScript from "../global/constructors/constructor-script";
import { BaseAppAbstract } from "./base.abstract";

export default abstract class AbstractNode extends BaseAppAbstract {
	[key: string | symbol]: TAnything;

	private static CONTEXT = document.createElement("canvas").getContext(
		"2d",
	) as CanvasRenderingContext2D;

	static [$ConstructorNodes] = new ConstructorNodes();
	[$ConstructorScript] = new ConstructorScript();

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
		hasApp: () => {
			if (!this[GetApp])
				throw new Error('you cannot initialize the instance of a node without first creating the instance of “EngineCore” or “GameCore”.')

			return true
		}
	};
}
