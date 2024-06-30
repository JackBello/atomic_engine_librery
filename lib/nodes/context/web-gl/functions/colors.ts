export const transformColor = (color: number, index: number) => {
  if (index === 3) return color
  return color / 255
}

export const transformRGB = (color: string): number[] => {
  if (color.match(/rgba([0-9]+, [0-9]+, [0-9], [0-9])/g)) {
    return color
      .replace("rgb", "")
      .slice(1, -1)
      .split(",")
      .map((value) => Number(value.trim()))
  }

  return color
    .replace("rgb", "")
    .slice(1, -1)
    .split(",")
    .map((value) => Number(value.trim()))
}

export const formatterColor = (color: string) => {
  let rgb: number[] = []

  if (color.includes("hsl")) {
    rgb = [1, 1, 1, 1]
  }
  if (color.includes("rgb")) {
    rgb = transformRGB(color)
  }

  if (rgb.length === 3) rgb.push(1)

  return rgb.map(transformColor)
}
