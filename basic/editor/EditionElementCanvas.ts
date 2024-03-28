import { AtomicCore } from "..";
import { TEventCanvas } from "../../types";
import { MainCanvas } from "../canvas/canvas";
import { Node2D, BasicNode, EmptyNode } from "../nodes/2d/node";

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
        isDragging: boolean,
        coords: {
            x: number
            y: number
        },
        node?: Node2D | BasicNode | EmptyNode
    } = {
            isDragging: false,
            coords: {
                x: 0,
                y: 0
            },
            node: undefined
        }

    protected static getCanvasEditor() {
        return (this.$core.$canvasEditor.getCanvas("editor") as MainCanvas).canvas
    }

    protected static validationPositionNode(node: Node2D | BasicNode | EmptyNode) {
        // const X = object.x * PanAndZoomCanvasScene.control.scale + PanAndZoomCanvasScene.control.offsetX;
        // const Y = object.y * PanAndZoomCanvasScene.control.scale + PanAndZoomCanvasScene.control.offsetY;
        // const WIDTH = (object.width * object.scaleX) * PanAndZoomCanvasScene.control.scale;
        // const HEIGHT = (object.height * object.scaleY) * PanAndZoomCanvasScene.control.scale;

        const X = node.x - node.width * node.scaleX / 2;
        const Y = node.y - node.height * node.scaleY / 2;
        const WIDTH = node.width * node.scaleX;
        const HEIGHT = node.height * node.scaleY;

        const mouseX = (this._mouseCoords.x - node.x) * Math.cos(-node.rotation * Math.PI / 180) - (this._mouseCoords.y - node.y) * Math.sin(-node.rotation * Math.PI / 180) + node.x;
        const mouseY = (this._mouseCoords.x - node.x) * Math.sin(-node.rotation * Math.PI / 180) + (this._mouseCoords.y - node.y) * Math.cos(-node.rotation * Math.PI / 180) + node.y;

        return (
            // (this._mouseCoords.x >= X && this._mouseCoords.x <= (X + WIDTH)) &&
            // (this._mouseCoords.y >= Y && this._mouseCoords.y <= (Y + HEIGHT))
            (mouseX >= X && mouseX <= (X + WIDTH)) &&
            (mouseY >= Y && mouseY <= (Y + HEIGHT))
        )
    }

    protected static getPosition(event: MouseEvent) {
        const { left, top } = this.getCanvasEditor().getBoundingClientRect()

        this._mouseCoords = {
            x: event.clientX - left,
            y: event.clientY - top
        }
    }

    protected static moveObject(node: Node2D | BasicNode | EmptyNode) {
        // const mouseXWithOffsetAndScale = (this._mouseCoords.x - PanAndZoomCanvasScene.control.offsetX) / PanAndZoomCanvasScene.control.scale
        // const mouseYWithOffsetAndScale = (this._mouseCoords.y - PanAndZoomCanvasScene.control.offsetY) / PanAndZoomCanvasScene.control.scale

        node.x = this._mouseCoords.x - this._control.coords.x;
        node.y = this._mouseCoords.y - this._control.coords.y;

        this.$core.$canvasEditor.dispatchEvent("canvas/node:modified", node)
        this.$core.$canvasEditor.dispatchEvent("canvas/node:moving", node)
    }

    public static mousedown(event: MouseEvent) {
        this.getPosition(event)

        let select: Node2D | BasicNode | EmptyNode | undefined;
        let minDistance = Number.MAX_VALUE;
        let canvasEvent: TEventCanvas = "canvas/node:unselect";

        if (event.button !== 0) return

        if (this.$core.$scenesGame.currentScene) {
            const objects = this.$core.$scenesGame.currentScene.getNodes();

            for (let index = objects.length - 1; index >= 0; index--) {
                const object = objects[index];

                if (this.validationPositionNode(object)) {
                    let isDragging = false;
                    const centerX = object.x + object.width / 2;
                    const centerY = object.y + object.height / 2;

                    let distance = Math.sqrt(Math.pow(this._mouseCoords.x - centerX, 2) + Math.pow(this._mouseCoords.y - centerY, 2));

                    if (distance < minDistance) {
                        minDistance = distance;
                        isDragging = true;
                    }

                    this._control.isDragging = isDragging;
                    this._control.node = object;

                    select = object
                    canvasEvent = "canvas/node:select"

                    // const mouseXWithOffsetAndScale = (this._mouseCoords.x - PanAndZoomCanvasScene.control.offsetX) / PanAndZoomCanvasScene.control.scale
                    // const mouseYWithOffsetAndScale = (this._mouseCoords.y - PanAndZoomCanvasScene.control.offsetY) / PanAndZoomCanvasScene.control.scale

                    this._control.coords.x = this._mouseCoords.x - object.x;
                    this._control.coords.y = this._mouseCoords.y - object.y;

                    break
                }
            }
        }

        this.$core.$canvasEditor.dispatchEvent(canvasEvent, select)

        if (!select) {
            this._control.coords.x = this._mouseCoords.x;
            this._control.coords.y = this._mouseCoords.y;
            this._control.isDragging = true;
            this.$core.$canvasEditor.edition.selection.active = true
            this.$core.$canvasEditor.edition.selection.node.setOptions({
                background: "rgba(52, 131, 235, 0.3)",
                radius: 0,
                border: false,
                borderColor: "rgba(52, 131, 235, 0.8)",
                borderWidth: 0,
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                startX: this._mouseCoords.x,
                startY: this._mouseCoords.y,
                endX: 0,
                endY: 0
            })

            this.$core.$canvasEditor.dispatchEvent("canvas/selection:start")
        }
    }

    public static mouseup(event: MouseEvent) {
        this.getPosition(event)

        if (event.button !== 0) return

        if (this._control.isDragging) {
            this._control.isDragging = false
            this._control.node = undefined
            this.$core.$canvasEditor.edition.selection.active = false

            this.$core.$canvasEditor.dispatchEvent("canvas/selection:end")

            this.$core.$canvasEditor.edition.selection.node.setOptions({
                background: "rgba(52, 131, 235, 0.3)",
                radius: 0,
                border: false,
                borderColor: "rgba(52, 131, 235, 0.8)",
                borderWidth: 0,
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                endX: this._mouseCoords.x,
                endY: this._mouseCoords.y
            })

            this.$core.renderEditor()
        }
    }

    public static mousemove(event: MouseEvent) {
        this.getPosition(event)

        let cursor: "default" | "auto" | "move" = "default";

        if (!this._control.isDragging && this.$core.$scenesGame.currentScene) {
            this.$core.$scenesGame.currentScene.getNodes().forEach(node => {
                if (this.validationPositionNode(node))
                    cursor = "move"
            })
        }

        if (this._control.node && this._control.isDragging && this.$core.$scenesGame.currentScene) {
            cursor = "move"
            this.moveObject(this._control.node)
            this.$core.renderScene()
        }

        if (!this._control.node && this._control.isDragging) {
            this.$core.$canvasEditor.edition.selection.node.setOptions({
                background: "rgba(52, 131, 235, 0.2)",
                radius: 1,
                border: true,
                borderColor: "rgba(52, 131, 235, 0.8)",
                borderWidth: 2,
                width: this._mouseCoords.x - this._control.coords.x,
                height: this._mouseCoords.y - this._control.coords.y,
                x: this._control.coords.x,
                y: this._control.coords.y,
                endX: this._mouseCoords.x,
                endY: this._mouseCoords.y
            });

            this.$core.renderEditor()

            this.$core.$canvasEditor.edition.selection.node.selectionElements()

            this.$core.$canvasEditor.dispatchEvent("canvas/selection:moving", this.$core.$canvasEditor.edition.selection.node.nodesSelected)
        }

        this.getCanvasEditor().style.cursor = cursor
    }
}