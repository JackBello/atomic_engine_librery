import { AtomicGame } from "../lib"

const buttonUploadGame = document.querySelector(
  `[data-id="uploadGame"]`
) as HTMLInputElement

const game = new AtomicGame()

buttonUploadGame.addEventListener("input", () => {
  const reader = new FileReader()

  const files = buttonUploadGame.files as FileList

  if (files.length) {
    reader.readAsText(files[0])

    reader.onload = async function () {
      await game.load(reader.result as string)

      game.start()

      buttonUploadGame.remove()

      reader.abort()
    }

    reader.onerror = function () {
      console.log(reader.error)
    }
  }
})
