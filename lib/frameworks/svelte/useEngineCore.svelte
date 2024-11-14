<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { EngineCore } from "../../index";
    import type { IOptionsEngineCore } from "../../types";

    let app: EngineCore | null = null

    export let options: Partial<IOptionsEngineCore> = {}

    onMount(() => {
        app = new EngineCore(options)
    })

    onDestroy(() => {
        app = null
    })
</script>