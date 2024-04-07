import { ref, onMounted, onBeforeUnmount } from "vue"
import { IOptionsAtomCoreGame } from "../../types"
import { AtomicCore } from "../../"

export const useAtomicCore = (options: Partial<IOptionsAtomCoreGame>) => {
  const app = ref<AtomicCore>()

  onMounted(() => {
    app.value = new AtomicCore(options)
  })

  onBeforeUnmount(() => {
    app.value
  })

  return app
}
