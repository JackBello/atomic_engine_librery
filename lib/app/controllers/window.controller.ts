import { AtomicEngine } from "../../atomic-engine"
import { IOptionsGame } from "../../types"
import jsonEscape from "json-escaping"

export class WindowController {
  private $app: AtomicEngine

  protected _window!: Window | null

  constructor(app: AtomicEngine) {
    this.$app = app
  }

  protected makeConfigWindow(game: IOptionsGame) {
    let config = `scrollbars=no,status=no,menubar=no,toolbar=no,location=no,directories=no`

    if (game.full_size) {
      config += `,width=${screen.availWidth},height=${screen.availHeight}`
    } else {
      config += `,width=${game.viewport.width},height=${game.viewport.height}`
    }

    if (game.center && !game.full_size) {
      const top = screen.height / 2 - game.viewport.height / 2
      const left = screen.width / 2 - game.viewport.width / 2

      config += `,top=${top},left=${left}`
    } else if (!game.full_size) {
      config += `,top=${game.y},left=${game.x}`
    } else {
      config += `,top=0,left=0`
    }

    if (game.resizable) {
      config += `,resizable=yes`
    } else {
      config += `,resizable=no`
    }

    if (game.full_screen) {
      config += `,fullscreen=yes`
    } else {
      config += `,fullscreen=no`
    }

    if (game.title) {
      config += `,titlebar=yes`
    } else {
      config += `,titlebar=no`
    }

    return config.trim()
  }

  protected makeCanvas(game: IOptionsGame) {
    const template = /* html */ `
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
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        canvas {
          display: block;
        }
        </style>
    </head>
    <body>
      <div data-canvas></div>
        <script>
          window.addEventListener("DOMContentLoaded", () => {
            (async ({ AtomicGame }) => {
              const app = new AtomicGame()

              await app.load(${jsonEscape(this.$app.export("game"))})

              app.start()
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
              window.resizeTo(${game.viewport.width}, ${game.viewport.height});
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
