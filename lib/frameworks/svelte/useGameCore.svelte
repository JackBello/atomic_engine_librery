<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { GameCore } from "../../index";

    let app: GameCore | null = null

    export let load: string = ""

    onMount(async () => {
        app = new GameCore()

        await app.load(load)
    })

    onDestroy(() => {
        app = null
    })
</script>