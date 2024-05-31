import { TFunction } from "../types"

let isExecute = false
export const executeOnlyOne = (func: TFunction) => {
  let result: any

  return async function (this: any, ...args: any[]) {
    if (!isExecute) {
      result = await func.apply(this, args)
      isExecute = true
    }

    return result
  }
}
