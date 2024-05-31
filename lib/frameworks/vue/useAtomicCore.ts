import { ref, onMounted, onBeforeUnmount } from "vue"
import { AtomicEngine } from "../../index"
import { IOptionsEngine } from "../../types"

export const useAtomicCore = (options?: Partial<IOptionsEngine>) => {
  const app = ref<AtomicEngine | null>()

  onMounted(() => {
    app.value = new AtomicEngine(options)
  })

  onBeforeUnmount(() => {
    app.value = null
  })

  return app
}
