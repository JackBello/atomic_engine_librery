import { ref, onMounted, onBeforeUnmount } from "vue"
import { IOptionsAtomCoreGame } from "../../../lib-old/types"
import { AtomicEditor } from "../../../lib-old"

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
