import type { AllTypesSimple, TClass, TFunction } from "@/types";
import type { AtomicEngine } from "../atomic-engine";
import type { AtomicGame, GlobalNode } from "..";
import { HiddenPlugin } from "@/symbols";

export type TPluginReturn = {
	process?: {
		after?: (
			app: AtomicEngine | AtomicGame,
			animation: {
				timestamp: number;
				deltaTime: number;
			},
		) => void;
		before?: (
			app: AtomicEngine | AtomicGame,
			animation: {
				timestamp: number;
				deltaTime: number;
			},
		) => void;
	};
	functions?: Record<string, TFunction>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	config?: Record<string, any>;
	nodes?: Record<string, TClass<GlobalNode>>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[HiddenPlugin]: Record<string, any>;
};

export type TPlugin = {
	name: string;
	install(
		app: AtomicEngine | AtomicGame,
		options?: AllTypesSimple,
	): TPluginReturn;
};
