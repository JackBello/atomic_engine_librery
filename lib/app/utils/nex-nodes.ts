export interface INodeRootWorker {
  __type__: string
  __path__: string
  location: {
    id: string
    index: number
    slug: string
  }
  options?: Record<string, any>
  nodes: INodeWorker[]
}

export interface INodeWorker extends INodeRootWorker {
  __root__: INodeRootWorker
  parent?: INodeWorker | INodeRootWorker
}

export type TNodesWorker = INodeRootWorker[] | INodeWorker[]

export type TMode = "id" | "index" | "slug"

/**

path default (index) = 0/0/2/1

path {
    - id = dcbc3e65506a7e6f15d30a357e884432/dcbc3e65506a7e6f15d30a357e884432/dcbc3e65506a7e6f15d30a357e884432 (string)
    - index = 0/0/2/1 (string)
    - slug = player-0/collision/shape
}

location
    - id = UID/dcbc3e65506a7e6f15d30a357e884432 | UUID/400fa120-5e9f-411e-94bd-2a23f6695704 (string)
    - index = 0 (number)
    - slug = player-0 | player_0 | player0 (string)
*/

export const useNodes = (nodes: TNodesWorker) => {
  const _nodes_ = (path: string) => new Function("nodes", `return nodes${path}`)

  const getNodeByPath = (path: string, type: TMode = "index") => {}

  const getNodeByPathUid = (path: string) => {}

  const getNodeByPathSlug = (path: string) => {
    const parts = path.split(".")

    let $nodes = undefined

    for (const part of parts) {
      if ($nodes) {
        $nodes = $nodes.find((node) => (node.location.slug = part))?.nodes ?? []
      } else {
        $nodes = nodes.find((node) => (node.location.slug = part))?.nodes ?? []
      }
    }
  }

  const getNodeByPathIndex = (path: string) => {
    path = "[" + path.replace(/\//g, "].nodes[") + "]"

    return _nodes_(path)(nodes)
  }

  const getNodeByLocation = (
    location: string | number,
    type: TMode = "index"
  ) => {}

  const getNodeByLocationUid = (uid: string) => {}

  const getNodeByLocationIndex = (index: string) => {}

  const getNodeByLocationSlug = (slug: string) => {}

  return {
    getNodeByPath,
    getNodeByPathIndex,
    getNodeByPathSlug,
    getNodeByPathUid,
    getNodeByLocation,
    getNodeByLocationIndex,
    getNodeByLocationSlug,
    getNodeByLocationUid
  }
}

const nodes: [INodeRootWorker] = [
  {
    __path__: "0",
    __type__: "2D/scene",
    location: {
      index: 0,
      slug: "lv1",
      id: "efdfdfdfdfdffdf"
    },
    options: {},
    nodes: []
  }
]

nodes[0].nodes = [
  {
    __path__: "0/0",
    __root__: nodes[0],
    __type__: "2D/node",
    location: {
      index: 0,
      slug: "player-1",
      id: "sdfsdfsdf"
    },
    nodes: [],
    options: {},
    parent: nodes[0]
  }
]

nodes[0].nodes[0].nodes = [
  {
    __path__: "0/0/0",
    __root__: nodes[0],
    __type__: "2D/collision",
    location: {
      index: 0,
      slug: "collision",
      id: "sdvscvsfsdvdfdbrtg"
    },
    nodes: [],
    options: {},
    parent: nodes[0].nodes[0]
  }
]

const handlerNodes = useNodes(nodes)
