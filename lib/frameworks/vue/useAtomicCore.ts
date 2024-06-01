import { ref, onMounted, onBeforeUnmount } from "vue"
import { AtomicEngine } from "../../index"
import { IOptionsAtomicEngine } from "../../types"

export const useAtomicCore = (options?: Partial<IOptionsAtomicEngine>) => {
  const app = ref<AtomicEngine | null>()

  onMounted(() => {
    app.value = new AtomicEngine(options)
  })

  onBeforeUnmount(() => {
    app.value = null
  })

  return app
}
