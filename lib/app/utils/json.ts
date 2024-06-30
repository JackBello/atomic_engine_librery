export const omitKeys = (
  object: any,
  keysOmit: string[],
  keysAdd: string[] = []
) => {
  const duplicate: Record<string, any> = {}

  for (const key in object) {
    if (keysOmit.indexOf(key) == -1) {
      duplicate[key] = object[key]
    }
  }

  if (keysAdd.length > 0)
    for (const key of keysAdd) {
      duplicate[key] = 0
    }

  return duplicate
}
