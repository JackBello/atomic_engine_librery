import type { TAnything } from "@/types";
import type { GameCore } from "@/app/game";
import type { EngineCore } from "@/app/engine";

import { GetApp, SetApp } from "@/symbols";
import { $ConstructorNodes, $ConstructorScript } from "../symbols";

import ConstructorNodes from "../global/constructors/constructor-nodes";
import ConstructorScript from "../global/constructors/constructor-script";

export default abstract class AbstractNode {
	[key: string]: TAnything;

	static [$ConstructorNodes] = new ConstructorNodes();
	[$ConstructorScript] = new ConstructorScript();

	protected static $app: EngineCore | GameCore;

	[GetApp]() {
		return AbstractNode.$app;
	}

	static [SetApp](app: EngineCore | GameCore): void {
		AbstractNode.$app = app;
	}

	protected utils = {
		omitKeys(object: TAnything, keysOmit: string[], keysAdd: string[] = []) {
			const duplicate: Record<string, TAnything> = {};

			for (const key in object) {
				if (keysOmit.indexOf(key) === -1) {
					duplicate[key] = object[key];
				}
			}

			if (keysAdd.length > 0)
				for (const key of keysAdd) {
					duplicate[key] = 0;
				}

			return duplicate;
		},
	};
}
