import { onBeforeUnmount, onMounted, ref } from "vue";
import { EngineCore } from "../../index";
import type { IOptionsEngineCore } from "../../app/types";

export const useEngineCore = (options?: Partial<IOptionsEngineCore>) => {
	const app = ref<EngineCore | null>();

	onMounted(() => {
		app.value = new EngineCore(options);
	});

	onBeforeUnmount(() => {
		app.value = null;
	});

	return app;
};
