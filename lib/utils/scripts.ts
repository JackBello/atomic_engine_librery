const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

export const executeScript = async (code: string, context: any, node: any) => {
  const _return = `return {$functions:{${
    code.indexOf("_ready") !== -1 ? "_ready," : ""
  }${code.indexOf("_process") !== -1 ? "_process," : ""}}};`

  const _code = `with (node) {${code};
${_return}}`

  const execute = new AsyncFunction("context, node, $attributes", _code)

  return await execute(context, node, node._attributes)
}
