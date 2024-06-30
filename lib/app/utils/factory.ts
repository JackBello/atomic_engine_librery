import { TClass } from "../../types"

export default class Factory {
  [key: string]: any

  private object: any
  protected format: any = {}

  constructor(object: any) {
    this.object = object

    this.formatResource()
  }

  private formatResource() {
    this.mapGetters()
    this.deleteGetters()
    this.applyFormat()
  }

  private mapGetters() {
    for (const key in this.object) {
      this[key] = this.object[key]
    }
  }

  private deleteGetters() {
    const formatKeys = Object.keys(this.format)
    const resourceKeys = Object.keys(this.object)

    resourceKeys.forEach((key) => {
      if (formatKeys.includes(key)) return
      delete this[key]
    })

    delete this.object
  }

  private applyFormat() {
    const formatKeys = Object.keys(this.format)

    formatKeys.forEach((key) => {
      this[key] = this.format[key]
    })
  }

  static collection(array: Array<any>, constructor: TClass<Factory>) {
    if (!Array.isArray(array)) {
      const typeOf = typeof array

      throw new Error(`Given data must be an Iterable: ${typeOf} given`)
    }

    return array.map((item) => new constructor(item))
  }

  static create(object: any, constructor: TClass<Factory>) {
    return new constructor(object)
  }
}
