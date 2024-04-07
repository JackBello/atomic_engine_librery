export class AtomicGlobal {
  protected static _options: Record<string, any> = {
    MODE: "edition",
    STATUS_GAME: "paused",
    PAN: {
      active: false,
      translateX: 0,
      translateY: 0
    },
    ZOOM: {
      active: false,
      scale: 1
    },
    SELECTION: {
      active: false,
      radius: 1,
      background: "rgba(52, 131, 235, 0.3)",
      borderColor: "rgba(52, 131, 235, 0.8)",
      borderWidth: 2,
      border: true
    },
    CONTROL: {
      active: false,
      padding: 0,
      border: true,
      borderWidth: 1,
      borderColor: "rgb(16 130 212)",
      cornerSize: 6,
      cornerColor: "rgb(16 130 212)",
      cornerBorder: false,
      cornerColorBorder: "blue",
      showCorner: true
    },
    GRID: {
      show: false,
      cell: 30,
      color: "rgba(255, 255, 255, .2)"
    },
    AXIS: {
      show: true,
      colorX: "#CD6155",
      colorY: "#58D68D"
    },
    NODES: {}
  }

  constructor(options: Partial<any> = {}) {
    AtomicGlobal._options = { ...AtomicGlobal._options, ...options }
  }

  static get MODE(): "edition" | "game" | "preview" {
    return AtomicGlobal._options.MODE
  }

  static set MODE(value: "edition" | "game" | "preview") {
    AtomicGlobal._options.MODE = value
  }

  static get STATUS_GAME() {
    return AtomicGlobal._options.STATUS_GAME
  }

  static set STATUS_GAME(value: string) {
    AtomicGlobal._options.STATUS_GAME = value
  }

  static get PAN() {
    return AtomicGlobal._options.PAN
  }

  static set PAN(value: any) {
    AtomicGlobal._options.PAN = value
  }

  static get ZOOM() {
    return AtomicGlobal._options.ZOOM
  }

  static set ZOOM(value: any) {
    AtomicGlobal._options.ZOOM = value
  }

  static get SELECTION() {
    return AtomicGlobal._options.SELECTION
  }

  static set SELECTION(value: any) {
    AtomicGlobal._options.SELECTION = value
  }

  static get CONTROL() {
    return AtomicGlobal._options.CONTROL
  }

  static set CONTROL(value: any) {
    AtomicGlobal._options.CONTROL = value
  }

  static get GRID() {
    return AtomicGlobal._options.GRID
  }

  static set GRID(value: any) {
    AtomicGlobal._options.GRID = value
  }

  static get AXIS() {
    return AtomicGlobal._options.AXIS
  }

  static set AXIS(value: any) {
    AtomicGlobal._options.AXIS = value
  }

  static get NODES() {
    return AtomicGlobal._options.NODES
  }

  public static setOptions(options: any) {
    AtomicGlobal._options = { ...AtomicGlobal._options, ...options }
  }
}
