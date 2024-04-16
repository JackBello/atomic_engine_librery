import { ref, onMounted, onBeforeUnmount } from "vue"
import { IOptionsAtomCoreGame } from "../../types"
import { AtomicEditor } from "../../"

export const useAtomicCore = (options: Partial<IOptionsAtomCoreGame>) => {
  const app = ref<AtomicEditor>()

  onMounted(() => {
    app.value = new AtomicEditor(options)
  })

  onBeforeUnmount(() => {
    app.value
  })

  return app
}
