const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

export const executeScript = async (code: string, node: any) => {
  const _return = `return {$functions:{${
    code.indexOf("_ready") !== -1 ? "_ready," : ""
  }${code.indexOf("_process") !== -1 ? "_process," : ""}${
    code.indexOf("_draw") !== -1 ? "_draw," : ""
  }}};`

  const _code = `with (node) {${code};
${_return}}`

  const execute = new AsyncFunction("node, $attributes", _code)

  return await execute(node, node._attributes)
}
