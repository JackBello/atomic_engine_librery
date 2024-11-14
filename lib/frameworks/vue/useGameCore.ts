import { onBeforeUnmount, onMounted, ref } from "vue";
import { GameCore } from "../../index";

export const useEngineCore = (load: string) => {
    const app = ref<GameCore | null>();

    onMounted(async () => {
        app.value = new GameCore();

        await app.value.load(load);
    });

    onBeforeUnmount(() => {
        app.value = null;
    });

    return app;
};
