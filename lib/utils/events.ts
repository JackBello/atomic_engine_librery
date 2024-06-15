import { TFunction } from "@/types"

export function throttle(func: TFunction, limit: number) {
  let lastFunc: number
  let lastRan: number
  return function (...args: any[]) {
    if (!lastRan) {
      func(...args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}
