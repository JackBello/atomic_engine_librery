import type { AllTypesSimple, TAnything, TClass, TFunction } from "@/types";
import type { AtomicEngine } from "../atomic-engine";
import type { AtomicGame } from "..";
import type { GlobalNode } from "@/nodes";
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
	config?: Record<string, TAnything>;
	nodes?: Record<string, TClass<GlobalNode>>;
	[HiddenPlugin]: Record<string, TAnything>;
};

export type TPlugin = {
	name: string;
	install(
		app: AtomicEngine | AtomicGame,
		options?: AllTypesSimple,
	): TPluginReturn;
};
