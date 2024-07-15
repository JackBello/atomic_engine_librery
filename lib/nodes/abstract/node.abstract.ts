import { MethodGetApp, MethodStaticSetApp } from "../../symbols"
import { AtomicEngine } from "@/atomic-engine"
import { AtomicGame } from "@/atomic-game"

export abstract class AbstractNode {
  [key: string]: any

  protected static $app: AtomicEngine | AtomicGame

  static import(data: string, format: "JSON" | "YAML" = "JSON"): any {
    data
    format
    throw new Error("Method not implemented! Use derived class")
  }

  [MethodGetApp]() {
    return AbstractNode.$app
  }

  static [MethodStaticSetApp](app: AtomicEngine | AtomicGame): void {
    AbstractNode.$app = app
  }
}
