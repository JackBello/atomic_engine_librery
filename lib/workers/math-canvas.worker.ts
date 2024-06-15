import { ICalculate } from "@/nodes/nodes-2d.types"

self.onmessage = function (event) {
  if (event.data.action === "node:process-calculate") {
    const scaleViewport = event.data.options.scaleViewport
    const options = event.data.options
    const calculate: ICalculate["calculate"] = {
      middleScaleFactor: {
        height: 0,
        width: 0
      },
      rotation: 0,
      scaleFactor: {
        height: 0,
        width: 0
      },
      translate: {
        x: 0,
        y: 0
      }
    }

    if (options.__parent && options.__parent.__type__ == "draw:2D/node") {
      calculate.translate = {
        x: options.__parent.x + options.x * scaleViewport,
        y: options.__parent.y + options.y * scaleViewport
      }
    } else {
      calculate.translate = {
        x: options.x * scaleViewport,
        y: options.y * scaleViewport
      }
    }

    calculate.rotation =
      options.rotationType === "degrees"
        ? (options.rotation * Math.PI) / 180
        : options.rotation

    calculate.scaleFactor = {
      width: options.width * options.scaleX * scaleViewport,
      height: options.height * options.scaleY * scaleViewport
    }

    calculate.middleScaleFactor = {
      width: calculate.scaleFactor.width / 2,
      height: calculate.scaleFactor.height / 2
    }

    self.postMessage({
      type: "node:process-calculate",
      result: calculate
    })
  }
}
