export const DEFAULT_CONFIG_EDITION = {
  MODE: "edition",
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
    padding: 5,
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
  NODES: {},
  FPS: {
    delay: 1000,
    velocity: 60
  }
}
