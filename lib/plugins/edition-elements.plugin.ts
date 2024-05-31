/*
// Obtén una referencia al elemento canvas
const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// Define las propiedades de los elementos
const rectangulo = { x: 50, y: 50, ancho: 100, alto: 100 };
const arco = { x: 150, y: 150, radio: 50, inicio: 0, fin: Math.PI * 2 };
const triangulo = { p1: { x: 200, y: 50 }, p2: { x: 250, y: 150 }, p3: { x: 150, y: 150 } };
const poligono = { puntos: [{ x: 300, y: 50 }, { x: 350, y: 50 }, { x: 325, y: 100 }, { x: 300, y: 100 }] };

// Registra el evento de mousemove en el canvas
canvas.addEventListener('mousemove', handleMouseMove);

// Controlador de eventos mousemove
function handleMouseMove(event) {
  // Obtén las coordenadas del puntero del mouse en relación con el canvas
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Verifica si el puntero del mouse está dentro de los límites de cada elemento
  if (isInsideRect(mouseX, mouseY, rectangulo)) {
    // Acciones para el rectángulo
    console.log('Hover en el rectángulo');
  } else if (isInsideArc(mouseX, mouseY, arco)) {
    // Acciones para el arco
    console.log('Hover en el arco');
  } else if (isInsideTriangle(mouseX, mouseY, triangulo)) {
    // Acciones para el triángulo
    console.log('Hover en el triángulo');
  } else if (isInsidePolygon(mouseX, mouseY, poligono)) {
    // Acciones para el polígono
    console.log('Hover en el polígono');
  }
}

// Funciones de detección de hover para cada tipo de elemento

function isInsideRect(x, y, rect) {
  return x > rect.x && x < rect.x + rect.ancho && y > rect.y && y < rect.y + rect.alto;
}

function isInsideArc(x, y, arco) {
  const dx = x - arco.x;
  const dy = y - arco.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < arco.radio;
}

function isInsideTriangle(x, y, triangulo) {
  const { p1, p2, p3 } = triangulo;
  const area1 = calculateTriangleArea(x, y, p2.x, p2.y, p3.x, p3.y);
  const area2 = calculateTriangleArea(x, y, p1.x, p1.y, p3.x, p3.y);
  const area3 = calculateTriangleArea(x, y, p1.x, p1.y, p2.x, p2.y);
  const mainArea = calculateTriangleArea(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  return Math.abs(mainArea - (area1 + area2 + area3)) <= 1;
}

function calculateTriangleArea(x1, y1, x2, y2, x3, y3) {
  return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
}

function isInsidePolygon(x, y, poligono) {
  const puntos = poligono.puntos;
  let inside = false;
  for (let i = 0, j = puntos.length - 1; i < puntos.length; j = i++) {
    const xi = puntos[i].x;
    const yi = puntos[i].y;
    const xj = puntos[j].x;
    const yj = puntos[j].y;
    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

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
  }
*/

// class EditionElementCanvas {
//   protected static $core: any

//   protected static _mouseCoords = {
//     x: 0,
//     y: 0
//   }

//   protected static _control: {
//     isDragging: boolean
//     startCoords: {
//       x: number
//       y: number
//     }
//     node?: Node2D
//   } = {
//     isDragging: false,
//     startCoords: {
//       x: 0,
//       y: 0
//     },
//     node: undefined
//   }

//   protected static getCanvasEditor() {
//     return (this.$core.$canvas.getCanvas("editor") as MainCanvas).canvas
//   }

//   protected static validationPositionNode(node: Node2D) {
//     const zoomScale = this.$core.$global.ZOOM.scale
//     const panX = this.$core.$global.PAN.translateX
//     const panY = this.$core.$global.PAN.translateY

//     const X = node.x - (node.width * node.scaleX) / 2
//     const Y = node.y - (node.height * node.scaleY) / 2
//     const WIDTH = node.width * node.scaleX
//     const HEIGHT = node.height * node.scaleY

//     const mouseX = (this._mouseCoords.x - panX) / zoomScale
//     const mouseY = (this._mouseCoords.y - panY) / zoomScale

//     const rotatedMouseX =
//       (mouseX - node.x) * Math.cos((-node.rotation * Math.PI) / 180) -
//       (mouseY - node.y) * Math.sin((-node.rotation * Math.PI) / 180) +
//       node.x
//     const rotatedMouseY =
//       (mouseX - node.x) * Math.sin((-node.rotation * Math.PI) / 180) +
//       (mouseY - node.y) * Math.cos((-node.rotation * Math.PI) / 180) +
//       node.y

//     return (
//       rotatedMouseX >= X &&
//       rotatedMouseX <= X + WIDTH &&
//       rotatedMouseY >= Y &&
//       rotatedMouseY <= Y + HEIGHT
//     )
//   }

//   protected static getPosition(event: MouseEvent) {
//     const { left, top } = this.getCanvasEditor().getBoundingClientRect()

//     this._mouseCoords = {
//       x: event.clientX - left,
//       y: event.clientY - top
//     }
//   }

//   protected static moveKeyboardNode(
//     node: Node2D | BasicNode | EmptyNode,
//     direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
//   ) {
//     if (direction === "ArrowUp") node.y -= 2
//     if (direction === "ArrowDown") node.y += 2
//     if (direction === "ArrowLeft") node.x -= 2
//     if (direction === "ArrowRight") node.x += 2

//     this.$core.$canvas[DispatchEventObserver]("canvas/node:modified", node)
//     this.$core.$canvas[DispatchEventObserver]("canvas/node:moving", node)
//   }

//   protected static moveMouseNode(node: Node2D | BasicNode | EmptyNode) {
//     node.x =
//       (this._mouseCoords.x - this.$core.$global.PAN.translateX) /
//         this.$core.$global.ZOOM.scale -
//       this._control.startCoords.x
//     node.y =
//       (this._mouseCoords.y - this.$core.$global.PAN.translateY) /
//         this.$core.$global.ZOOM.scale -
//       this._control.startCoords.y

//     this.$core.$canvas[DispatchEventObserver]("canvas/node:modified", node)
//     this.$core.$canvas[DispatchEventObserver]("canvas/node:moving", node)
//   }

//   public static mousedown(event: MouseEvent) {
//     this.getPosition(event)

//     let select: Node2D | undefined
//     let minDistance = Number.MAX_VALUE
//     let canvasEvent: TEventCanvas = "canvas/node:unselect"

//     if (event.button !== 0) return

//     if (this.$core.$scenes.currentScene) {
//       const nodes = this.$core.$scenes.currentScene.getNodes()

//       for (let index = nodes.length - 1; index >= 0; index--) {
//         const node = nodes[index]

//         if (this.validationPositionNode(node)) {
//           let isDragging = false
//           const centerX = node.x + node.width / 2
//           const centerY = node.y + node.height / 2

//           let distance = Math.sqrt(
//             Math.pow(this._mouseCoords.x - centerX, 2) +
//               Math.pow(this._mouseCoords.y - centerY, 2)
//           )

//           if (distance < minDistance) {
//             minDistance = distance
//             isDragging = true
//           }

//           this._control.isDragging = isDragging

//           select = node
//           canvasEvent = "canvas/node:select"

//           this._control.startCoords.x =
//             (this._mouseCoords.x - ControllerGlobal.PAN.translateX) /
//               ControllerGlobal.ZOOM.scale -
//             node.x
//           this._control.startCoords.y =
//             (this._mouseCoords.y - ControllerGlobal.PAN.translateY) /
//               ControllerGlobal.ZOOM.scale -
//             node.y

//           break
//         }
//       }
//     }

//     if (canvasEvent === "canvas/node:select" && select) {
//       this.$core.$global.NODES[NodeControlEditionDefault].setOptions({
//         x: select.x,
//         y: select.y,
//         width: select.width,
//         height: select.height,
//         scaleX: select.scaleX,
//         scaleY: select.scaleY,
//         padding: ControllerGlobal.CONTROL.padding,
//         border: ControllerGlobal.CONTROL.border,
//         borderWidth: ControllerGlobal.CONTROL.borderWidth,
//         borderColor: ControllerGlobal.CONTROL.borderColor,
//         cornerSize: ControllerGlobal.CONTROL.cornerSize,
//         cornerColor: ControllerGlobal.CONTROL.cornerColor,
//         cornerBorder: ControllerGlobal.CONTROL.cornerBorder,
//         cornerColorBorder: ControllerGlobal.CONTROL.cornerColorBorder,
//         showCorner: ControllerGlobal.CONTROL.showCorner
//       })
//       this.$core.$global.CONTROL.active = true
//     }

//     if (canvasEvent === "canvas/node:unselect") {
//       this.$core.$global.CONTROL.active = false
//       this.$core.$global.NODES[NodeControlEditionDefault].setOptions({
//         x: 0,
//         y: 0,
//         width: 0,
//         height: 0,
//         scaleX: 1,
//         scaleY: 1,
//         padding: 0,
//         border: false,
//         borderWidth: 0,
//         borderColor: "black",
//         cornerSize: 0,
//         cornerColor: "black",
//         cornerBorder: false,
//         cornerColorBorder: "black",
//         showCorner: false
//       })
//     }

//     this._control.node = select
//     this.$core.$canvas[DispatchEventObserver](canvasEvent, select)

//     if (!select) {
//       this._control.startCoords.x =
//         this._mouseCoords.x - this.$core.$global.PAN.translateX
//       this._control.startCoords.y =
//         this._mouseCoords.y - this.$core.$global.PAN.translateY
//       this._control.isDragging = true
//       this.$core.$global.SELECTION.active = true
//       this.$core.$global.NODES[NodeSelectionDefault].setOptions({
//         startX: this._mouseCoords.x - this.$core.$global.PAN.translateX,
//         startY: this._mouseCoords.y - this.$core.$global.PAN.translateY
//       })

//       this.$core.$canvas[DispatchEventObserver]("canvas/selection:start")
//     }
//   }

//   public static mouseup(event: MouseEvent) {
//     this.getPosition(event)

//     if (event.button !== 0) return

//     if (this._control.isDragging) {
//       this._control.isDragging = false
//       this.$core.$global.SELECTION.active = false

//       this.$core.$canvas[DispatchEventObserver]("canvas/selection:end")

//       this.$core.$global.NODES[NodeSelectionDefault].setOptions({
//         background: "",
//         radius: 0,
//         border: false,
//         borderColor: "",
//         borderWidth: 0,
//         width: 0,
//         height: 0,
//         x: 0,
//         y: 0,
//         startX: 0,
//         startY: 0,
//         endX: this._mouseCoords.x - this.$core.$global.PAN.translateX,
//         endY: this._mouseCoords.y - this.$core.$global.PAN.translateY
//       })
//     }
//   }

//   public static mousemove(event: MouseEvent) {
//     this.getPosition(event)

//     let cursor: TCursorOptions = "default"

//     if (!this._control.isDragging && this.$core.$scenes.currentScene) {
//       const nodes = this.$core.$scenes.currentScene.getNodes()

//       for (let index = nodes.length - 1; index >= 0; index--) {
//         const node = nodes[index]
//         if (this.validationPositionNode(node)) {
//           cursor = "move"
//           this.$core.$canvas[DispatchEventObserver]("canvas/node:hover", node)
//           break
//         }
//       }
//     }

//     if (
//       this._control.node &&
//       this._control.isDragging &&
//       this.$core.$scenes.currentScene
//     ) {
//       cursor = "move"
//       this.moveMouseNode(this._control.node)
//       this.$core.$global.NODES[NodeControlEditionDefault].setOptions({
//         x: this._control.node.x,
//         y: this._control.node.y,
//         width: this._control.node.width,
//         height: this._control.node.height,
//         scaleX: this._control.node.scaleX,
//         scaleY: this._control.node.scaleY,
//         padding: this.$core.$global.CONTROL.padding,
//         border: this.$core.$global.CONTROL.border,
//         borderWidth: this.$core.$global.CONTROL.borderWidth,
//         borderColor: this.$core.$global.CONTROL.borderColor,
//         cornerSize: this.$core.$global.CONTROL.cornerSize,
//         cornerColor: this.$core.$global.CONTROL.cornerColor,
//         cornerBorder: this.$core.$global.CONTROL.cornerBorder,
//         cornerColorBorder: this.$core.$global.CONTROL.cornerColorBorder,
//         showCorner: this.$core.$global.CONTROL.showCorner
//       })
//     }

//     if (!this._control.node && this._control.isDragging) {
//       this.$core.$global.NODES[NodeSelectionDefault].setOptions({
//         background: this.$core.$global.SELECTION.background,
//         radius: this.$core.$global.SELECTION.radius,
//         border: this.$core.$global.SELECTION.border,
//         borderColor: this.$core.$global.SELECTION.borderColor,
//         borderWidth: this.$core.$global.SELECTION.borderWidth,
//         width:
//           this._mouseCoords.x -
//           this.$core.$global.PAN.translateX -
//           this._control.startCoords.x,
//         height:
//           this._mouseCoords.y -
//           this.$core.$global.PAN.translateY -
//           this._control.startCoords.y,
//         x: this._control.startCoords.x,
//         y: this._control.startCoords.y,
//         endX: this._mouseCoords.x - this.$core.$global.PAN.translateX,
//         endY: this._mouseCoords.y - this.$core.$global.PAN.translateY
//       })

//       this.$core.$global.NODES[NodeSelectionDefault].selectionElements(
//         this.$core.$scenes.currentScene.getNodes()
//       )

//       this.$core.$canvas[DispatchEventObserver](
//         "canvas/selection:moving",
//         this.$core.$global.NODES[NodeSelectionDefault].nodesSelected
//       )
//     }

//     this.getCanvasEditor().style.cursor = cursor
//   }

//   public static keydown(event: KeyboardEvent) {
//     if (!this._control.node) return

//     this.moveKeyboardNode(this._control.node, event.key as any)
//   }

//   public static keyup(event: KeyboardEvent) {}

//   public static keypress(event: KeyboardEvent) {}

//   static [SetCore](core: any) {
//     EditionElementCanvas.$core = core
//   }
// }