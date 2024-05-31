export const omitKeys = (object: any, keys: string[]) => {
  var duplicate: any = {}

  for (var key in object) {
    if (keys.indexOf(key) == -1) {
      duplicate[key] = object[key]
    }
  }

  return duplicate
}
