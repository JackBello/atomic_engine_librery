import { AtomicCore } from "../atomic-core"
import { NodeControlEditionDefault, NodeSelectionDefault } from "../../const"
import { TEventCanvas } from "../../types"
import { MainCanvas } from "../canvas/canvas"
import { Node2D, BasicNode, EmptyNode } from "../nodes/2d/node"
import { TCursorOptions } from "../nodes/types"
import { AtomicGlobal } from "../atomic-global"

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
*/

export class EditionElementCanvas {
  public static $core: AtomicCore

  protected static _mouseCoords = {
    x: 0,
    y: 0
  }

  protected static _control: {
    isDragging: boolean
    startCoords: {
      x: number
      y: number
    }
    node?: Node2D | BasicNode | EmptyNode
  } = {
    isDragging: false,
    startCoords: {
      x: 0,
      y: 0
    },
    node: undefined
  }

  protected static getCanvasEditor() {
    return (this.$core.$canvasEditor.getCanvas("editor") as MainCanvas).canvas
  }

  protected static validationPositionNode(
    node: Node2D | BasicNode | EmptyNode
  ) {
    const zoomScale = AtomicGlobal.ZOOM.scale
    const panX = AtomicGlobal.PAN.translateX
    const panY = AtomicGlobal.PAN.translateY

    const X = node.x - (node.width * node.scaleX) / 2
    const Y = node.y - (node.height * node.scaleY) / 2
    const WIDTH = node.width * node.scaleX
    const HEIGHT = node.height * node.scaleY

    const mouseX = (this._mouseCoords.x - panX) / zoomScale
    const mouseY = (this._mouseCoords.y - panY) / zoomScale

    const rotatedMouseX =
      (mouseX - node.x) * Math.cos((-node.rotation * Math.PI) / 180) -
      (mouseY - node.y) * Math.sin((-node.rotation * Math.PI) / 180) +
      node.x
    const rotatedMouseY =
      (mouseX - node.x) * Math.sin((-node.rotation * Math.PI) / 180) +
      (mouseY - node.y) * Math.cos((-node.rotation * Math.PI) / 180) +
      node.y

    return (
      rotatedMouseX >= X &&
      rotatedMouseX <= X + WIDTH &&
      rotatedMouseY >= Y &&
      rotatedMouseY <= Y + HEIGHT
    )
  }

  protected static getPosition(event: MouseEvent) {
    const { left, top } = this.getCanvasEditor().getBoundingClientRect()

    this._mouseCoords = {
      x: event.clientX - left,
      y: event.clientY - top
    }
  }

  protected static moveKeyboardNode(
    node: Node2D | BasicNode | EmptyNode,
    direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
  ) {
    if (direction === "ArrowUp") node.y -= 2
    if (direction === "ArrowDown") node.y += 2
    if (direction === "ArrowLeft") node.x -= 2
    if (direction === "ArrowRight") node.x += 2

    this.$core.$canvasEditor.dispatchEvent("canvas/node:modified", node)
    this.$core.$canvasEditor.dispatchEvent("canvas/node:moving", node)
  }

  protected static moveMouseNode(node: Node2D | BasicNode | EmptyNode) {
    node.x =
      (this._mouseCoords.x - AtomicGlobal.PAN.translateX) /
        AtomicGlobal.ZOOM.scale -
      this._control.startCoords.x
    node.y =
      (this._mouseCoords.y - AtomicGlobal.PAN.translateY) /
        AtomicGlobal.ZOOM.scale -
      this._control.startCoords.y

    this.$core.$canvasEditor.dispatchEvent("canvas/node:modified", node)
    this.$core.$canvasEditor.dispatchEvent("canvas/node:moving", node)
  }

  public static mousedown(event: MouseEvent) {
    this.getPosition(event)

    let select: Node2D | BasicNode | EmptyNode | undefined
    let minDistance = Number.MAX_VALUE
    let canvasEvent: TEventCanvas = "canvas/node:unselect"

    if (event.button !== 0) return

    if (this.$core.$scenesGame.currentScene) {
      const nodes = this.$core.$scenesGame.currentScene.getNodes()

      for (let index = nodes.length - 1; index >= 0; index--) {
        const node = nodes[index]

        if (this.validationPositionNode(node)) {
          let isDragging = false
          const centerX = node.x + node.width / 2
          const centerY = node.y + node.height / 2

          let distance = Math.sqrt(
            Math.pow(this._mouseCoords.x - centerX, 2) +
              Math.pow(this._mouseCoords.y - centerY, 2)
          )

          if (distance < minDistance) {
            minDistance = distance
            isDragging = true
          }

          this._control.isDragging = isDragging

          select = node
          canvasEvent = "canvas/node:select"

          this._control.startCoords.x =
            (this._mouseCoords.x - AtomicGlobal.PAN.translateX) /
              AtomicGlobal.ZOOM.scale -
            node.x
          this._control.startCoords.y =
            (this._mouseCoords.y - AtomicGlobal.PAN.translateY) /
              AtomicGlobal.ZOOM.scale -
            node.y

          break
        }
      }
    }

    if (canvasEvent === "canvas/node:select" && select) {
      AtomicGlobal.NODES[NodeControlEditionDefault].setOptions({
        x: select.x,
        y: select.y,
        width: select.width,
        height: select.height,
        scaleX: select.scaleX,
        scaleY: select.scaleY,
        padding: AtomicGlobal.CONTROL.padding,
        border: AtomicGlobal.CONTROL.border,
        borderWidth: AtomicGlobal.CONTROL.borderWidth,
        borderColor: AtomicGlobal.CONTROL.borderColor,
        cornerSize: AtomicGlobal.CONTROL.cornerSize,
        cornerColor: AtomicGlobal.CONTROL.cornerColor,
        cornerBorder: AtomicGlobal.CONTROL.cornerBorder,
        cornerColorBorder: AtomicGlobal.CONTROL.cornerColorBorder,
        showCorner: AtomicGlobal.CONTROL.showCorner
      })
      AtomicGlobal.CONTROL.active = true
    }

    if (canvasEvent === "canvas/node:unselect") {
      AtomicGlobal.CONTROL.active = false
      AtomicGlobal.NODES[NodeControlEditionDefault].setOptions({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        scaleX: 1,
        scaleY: 1,
        padding: 0,
        border: false,
        borderWidth: 0,
        borderColor: "black",
        cornerSize: 0,
        cornerColor: "black",
        cornerBorder: false,
        cornerColorBorder: "black",
        showCorner: false
      })
    }

    this._control.node = select
    this.$core.$canvasEditor.dispatchEvent(canvasEvent, select)

    if (!select) {
      this._control.startCoords.x =
        this._mouseCoords.x - AtomicGlobal.PAN.translateX
      this._control.startCoords.y =
        this._mouseCoords.y - AtomicGlobal.PAN.translateY
      this._control.isDragging = true
      AtomicGlobal.SELECTION.active = true
      AtomicGlobal.NODES[NodeSelectionDefault].setOptions({
        startX: this._mouseCoords.x - AtomicGlobal.PAN.translateX,
        startY: this._mouseCoords.y - AtomicGlobal.PAN.translateY
      })

      this.$core.$canvasEditor.dispatchEvent("canvas/selection:start")
    }
  }

  public static mouseup(event: MouseEvent) {
    this.getPosition(event)

    if (event.button !== 0) return

    if (this._control.isDragging) {
      this._control.isDragging = false
      AtomicGlobal.SELECTION.active = false

      this.$core.$canvasEditor.dispatchEvent("canvas/selection:end")

      AtomicGlobal.NODES[NodeSelectionDefault].setOptions({
        background: "",
        radius: 0,
        border: false,
        borderColor: "",
        borderWidth: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
        endX: this._mouseCoords.x - AtomicGlobal.PAN.translateX,
        endY: this._mouseCoords.y - AtomicGlobal.PAN.translateY
      })
    }
  }

  public static mousemove(event: MouseEvent) {
    this.getPosition(event)

    let cursor: TCursorOptions = "default"

    if (!this._control.isDragging && this.$core.$scenesGame.currentScene) {
      const nodes = this.$core.$scenesGame.currentScene.getNodes()

      for (let index = nodes.length - 1; index >= 0; index--) {
        const node = nodes[index]
        if (this.validationPositionNode(node)) {
          cursor = "pointer"
          this.$core.$canvasEditor.dispatchEvent("canvas/node:hover", node)
          break
        }
      }
    }

    if (
      this._control.node &&
      this._control.isDragging &&
      this.$core.$scenesGame.currentScene
    ) {
      cursor = "move"
      this.moveMouseNode(this._control.node)
      AtomicGlobal.NODES[NodeControlEditionDefault].setOptions({
        x: this._control.node.x,
        y: this._control.node.y,
        width: this._control.node.width,
        height: this._control.node.height,
        scaleX: this._control.node.scaleX,
        scaleY: this._control.node.scaleY,
        padding: AtomicGlobal.CONTROL.padding,
        border: AtomicGlobal.CONTROL.border,
        borderWidth: AtomicGlobal.CONTROL.borderWidth,
        borderColor: AtomicGlobal.CONTROL.borderColor,
        cornerSize: AtomicGlobal.CONTROL.cornerSize,
        cornerColor: AtomicGlobal.CONTROL.cornerColor,
        cornerBorder: AtomicGlobal.CONTROL.cornerBorder,
        cornerColorBorder: AtomicGlobal.CONTROL.cornerColorBorder,
        showCorner: AtomicGlobal.CONTROL.showCorner
      })
    }

    if (!this._control.node && this._control.isDragging) {
      AtomicGlobal.NODES[NodeSelectionDefault].setOptions({
        background: AtomicGlobal.SELECTION.background,
        radius: AtomicGlobal.SELECTION.radius,
        border: AtomicGlobal.SELECTION.border,
        borderColor: AtomicGlobal.SELECTION.borderColor,
        borderWidth: AtomicGlobal.SELECTION.borderWidth,
        width:
          this._mouseCoords.x -
          AtomicGlobal.PAN.translateX -
          this._control.startCoords.x,
        height:
          this._mouseCoords.y -
          AtomicGlobal.PAN.translateY -
          this._control.startCoords.y,
        x: this._control.startCoords.x,
        y: this._control.startCoords.y,
        endX: this._mouseCoords.x - AtomicGlobal.PAN.translateX,
        endY: this._mouseCoords.y - AtomicGlobal.PAN.translateY
      })

      AtomicGlobal.NODES[NodeSelectionDefault].selectionElements()

      this.$core.$canvasEditor.dispatchEvent(
        "canvas/selection:moving",
        AtomicGlobal.NODES[NodeSelectionDefault].nodesSelected
      )
    }

    this.getCanvasEditor().style.cursor = cursor
  }

  public static keydown(event: KeyboardEvent) {
    if (!this._control.node) return

    this.moveKeyboardNode(this._control.node, event.key as any)
  }

  public static keyup(event: KeyboardEvent) {}

  public static keypress(event: KeyboardEvent) {}
}
