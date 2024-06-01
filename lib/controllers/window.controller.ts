import { AtomicEngine } from "../atomic-engine"
import { IOptionsGame } from "../types"
import jsonEscape from "json-escaping"

export class WindowController {
  private $app: AtomicEngine

  protected _window!: Window | null

  constructor(app: AtomicEngine) {
    this.$app = app
  }

  protected makeConfigWindow(game: IOptionsGame) {
    let config = `scrollbars=0,status=0,menubar=0,toolbar=0,location=0,directories=0`

    if (game.full_size) {
      config += `,width=${screen.availWidth},height=${screen.availHeight}`
    } else {
      config += `,width=${game.width},height=${game.height}`
    }

    if (game.center && !game.full_size) {
      const top = screen.height / 2 - game.height / 2
      const left = screen.width / 2 - game.width / 2

      config += `,top=${top},left=${left}`
    } else if (!game.full_size) {
      config += `,top=${game.y},left=${game.x}`
    } else {
      config += `,top=0,left=0`
    }

    if (game.resizable) {
      config += `,resizable=1`
    } else {
      config += `,resizable=0`
    }

    if (game.full_screen) {
      config += `,fullscreen=1`
    } else {
      config += `,fullscreen=0`
    }

    if (game.title) {
      config += `,titlebar=1`
    } else {
      config += `,titlebar=0`
    }

    return config.trim()
  }

  protected makeCanvas(game: IOptionsGame) {
    const template = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://localhost:5173/atomic-engine.iife.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      ${
        game.icon
          ? `<link rel="icon" type="image/png" href="${game.icon}">`
          : ""
      }
      <title>${game.title ? game.title : "Atomic Engine"}</title>
      <style>
            body, html {
                padding: 0;
                margin: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
      <div data-canvas></div>
        <script>
          window.addEventListener("DOMContentLoaded", () => {
            (async ({ AtomicEngine }) => {
              const app = new AtomicEngine({}, true)

              app.import(${jsonEscape(this.$app.export("game"))})

              app.preview().play()

              await app.start()
            })(Atomic)

            ${
              game.full_screen
                ? `
            if (!document.fullscreenElement) {
              app.canvas.instance.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
            `
                : ""
            }

            ${
              game.resizable
                ? ""
                : `window.onresize = function() {
              window.resizeTo(${game.width}, ${game.height});
            }`
            }
          })
        </script>
    </body>
    </html>
`

    return template
  }

  createWindow() {
    if (this._window) return

    this._window = window.open(
      "",
      "window-game",
      this.makeConfigWindow(this.$app.options.game)
    )

    if (this.$app.options.game.full_size) {
      this._window?.focus()
    }

    this._window?.document.write(this.makeCanvas(this.$app.options.game))

    this._window?.document.close()
  }

  closeWindow() {
    if (!this._window) return

    this._window.close()

    this._window = null
  }
}
