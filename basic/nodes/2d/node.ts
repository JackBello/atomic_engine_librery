import { v4 } from "@lukeed/uuid"
import { DEFAULT_CONFIG_BASIC_NODE, DEFAULT_CONFIG_EMPTY_NODE, DEFAULT_CONFIG_NODE_2D } from "../../../configs/nodes/2D/node"
import { AtomicCore, AtomicGame } from "../../index";
import { IOptionsEmptyNode, IOptionsNode, IOptionsNode2D, TCursorOptions } from "../types"
import { TEventNode } from "../../../types";

export class BasicNode {
  [key: string]: any

  public static $game: AtomicGame
  public static $core: AtomicCore

  protected _uuid: string
  protected _nodes: Map<string, BasicNode | Node2D | EmptyNode>
  protected _options: IOptionsNode
  protected _initial: IOptionsNode
  protected _type: string

  constructor(options: Partial<IOptionsNode>) {
    this._uuid = v4();
    this._options = { ...DEFAULT_CONFIG_BASIC_NODE, ...options };
    this._initial = { ...this._options }
    this._nodes = new Map()
    this._type = BasicNode.name
  }

  protected getCurrentScene() {
    return BasicNode.$core.$scenesGame.currentScene
  }

  protected getCore() {
    if (BasicNode.$core.MODE === "edition") return BasicNode.$core
    else return BasicNode.$game;
  }

  public on<T extends TEventNode>(event: T, callback: (...args: any[]) => void) {
    return BasicNode.$core.$canvasEditor.eventObserver.addEventListener(event, callback)
  }

  public dispatchEvent<T extends TEventNode>(event: T, ...args: any[]) {
    return BasicNode.$core.$canvasEditor.eventObserver.emitEvent(event, ...args)
  }

  get type() {
    return this._type
  }

  get uuid() {
    return this._uuid
  }

  get name() {
    return this._options.name;
  }

  get visible() {
    return this._options.visible
  }

  get cursor() {
    return this._options.cursor
  }

  get deep() {
    return this._options.deep
  }

  get x() {
    return this._options.x
  }

  get y() {
    return this._options.y
  }

  get width() {
    return this._options.width
  }

  get height() {
    return this._options.height
  }

  set name(value: string) {
    this._options.name = value;
  }

  set visible(value: boolean) {
    this._options.visible = value
  }

  set cursor(value: TCursorOptions) {
    this._options.cursor = value
  }

  set deep(value: string) {
    this._options.deep = value;
  }

  set x(value: number) {
    this._options.x = value;
  }

  set y(value: number) {
    this._options.y = value
  }

  set width(value: number) {
    this._options.width = value;
  }

  set height(value: number) {
    this._options.height = value;
  }

  public reset() {
    this._options = { ...this._initial };
  }

  public render() { }

  public update() { }

  public destroy() { }

  public clear() { }

  public setOptions(options: Partial<IOptionsNode>) {
    this._options = { ...this._options, ...options };
  }

  public toObject() {
    return {
      ...this._options
    }
  }

  public getNodes() {
    return [...this.nodesValues()]
  }

  public nodesValues() {
    return this._nodes.values()
  }

  public addNode(node: BasicNode | BasicNode[] | Node2D | Node2D[] | EmptyNode | EmptyNode[]) {
    if (Array.isArray(node)) {
      for (const nodeToInsert of node) {
        nodeToInsert.deep = this.deep + "_" + this._nodes.size;
        this._nodes.set(nodeToInsert.uuid, nodeToInsert);
      }
    } else {
      node.deep = this.deep + "_" + this._nodes.size;
      this._nodes.set(node.uuid, node);
    }
  }

  public existNode(uuid: string) {
    return this._nodes.has(uuid)
  }

  public deleteNode(uuid: string) {
    return this._nodes.delete(uuid)
  }

  public getNode(uuid: string) {
    return this._nodes.get(uuid)
  }

  public clearNodes() {
    this._nodes.clear()
  }

  public searchNode(uuid: string): BasicNode | Node2D | EmptyNode | null {
    const nodes = [(this as any)];

    while (nodes.length > 0) {
      let node = nodes.shift();

      if (node.uuid === uuid) {
        return node;
      }

      nodes.push(...Array.from(node._nodes.values() || []));
    }

    return null;
  }
}

export class Node2D extends BasicNode {
  protected _options: IOptionsNode2D

  constructor(options: Partial<IOptionsNode2D>) {
    super({ ...DEFAULT_CONFIG_NODE_2D, ...options })
    this._type = Node2D.name
  }

  get scale() {
    return this._options.scale
  }

  get scaleX() {
    return this._options.scaleX
  }

  get scaleY() {
    return this._options.scaleY
  }

  get rotation() {
    return this._options.rotation
  }

  set scale(value) {
    this._options.scale = value;
    this._options.scaleX = value;
    this._options.scaleY = value;
  }

  set scaleX(value) {
    this._options.scaleX = value
  }

  set scaleY(value) {
    this._options.scaleY = value;
  }

  set rotation(value) {
    this._options.rotation = value;
  }

  public center() {
    this.x = ((this.getCore().width / 2) - ((this.width * this.scaleX) / 2)) / 2
    this.y = ((this.getCore().height / 2) - ((this.height * this.scaleY) / 2)) / 2
  }

  public centerX() {
    this.x = ((this.getCore().width / 2) - ((this.width * this.scaleX) / 2)) / 2
  }

  public centerY() {
    this.y = ((this.getCore().height / 2) - ((this.height * this.scaleY) / 2)) / 2
  }

  protected pointTranslation() {
    // const pointObjectX = this.x + this.width / 2; left
    // const pointObjectY = this.y + this.height / 2; left

    let translateX = this.x;
    let translateY = this.y;

    return {
      translateX,
      translateY,
    }
  }

  protected pointScale() {

  }

  protected pointRotation() {

  }

  public setOptions(options: Partial<IOptionsNode2D>) {
    this._options = { ...this._options, ...options };
  }

  public toObject() {
    return {
      ...this._options
    }
  }
}

export class EmptyNode extends BasicNode {
  constructor(options: Partial<IOptionsEmptyNode>) {
    super({ ...DEFAULT_CONFIG_EMPTY_NODE, ...options })
    this._type = EmptyNode.name
  }

  public setOptions(options: Partial<IOptionsEmptyNode>) {
    this._options = { ...this._options, ...options };
  }

  public toObject() {
    return {
      ...this._options
    }
  }
}
