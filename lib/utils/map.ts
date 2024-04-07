export class MapObject<V = any> {
  private OBJECT: Record<string, V | undefined> = {}

  get size() {
    return this.keys().length
  }

  public set(key: string, value: V) {
    this.OBJECT[key] = value
  }

  public get(key: string): V | undefined {
    return this.OBJECT[key]
  }

  public has(key: string): boolean {
    return this.OBJECT[key] != undefined
  }

  public delete(key: string): boolean {
    this.OBJECT[key] = undefined

    return true
  }

  public clear() {
    this.OBJECT = {}
  }

  public keys(): string[] {
    return Object.keys(this.OBJECT)
  }

  public values(): (V | undefined)[] {
    return Object.values(this.OBJECT)
  }

  public entries() {
    return Object.entries(this.OBJECT)
  }
}
