import type { AllTypesSimple, TAnything, TClass, TFunction } from "@/types";
import type { GlobalNode } from "@/nodes";
import { HiddenPlugin } from "@/symbols";
import type { EngineCore } from "@/app/engine";
import type { GameCore } from "@/app/game";

export type TPluginReturn = {
	process?: {
		after?: (
			app: EngineCore | GameCore,
			animation: {
				timestamp: number;
				deltaTime: number;
			},
		) => void;
		before?: (
			app: EngineCore | GameCore,
			animation: {
				timestamp: number;
				deltaTime: number;
			},
		) => void;
	};
	functions?: Record<string, TFunction>;
	config?: Record<string, TAnything>;
	nodes?: Record<string, TClass<GlobalNode>>;
	[HiddenPlugin]: Record<string, TAnything>;
};

export type TPlugin = {
	name: string;
	install(app: EngineCore | GameCore, options?: AllTypesSimple): TPluginReturn;
};
