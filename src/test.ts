import { AtomicGame } from "../lib"

import {
  clearNodes,
  deleteNode,
  getFirstNode,
  getLastNode,
  getNextSiblingNode,
  getNode,
  getNodes,
  getPreviousSiblingNode,
  hasNode,
  moveNode,
  replaceNode,
  searchNode
} from "@/app/utils/nodes"

const buttonUploadGame = document.querySelector(
  `[data-id="uploadGame"]`
) as HTMLInputElement

const game = new AtomicGame()

buttonUploadGame.addEventListener("input", () => {
  const reader = new FileReader()

  const files = buttonUploadGame.files as FileList

  if (files.length) {
    reader.readAsText(files[0])

    reader.onload = async function () {
      await game.load(reader.result as string)

      game.start()

      buttonUploadGame.remove()

      reader.abort()
    }

    reader.onerror = function () {
      console.log(reader.error)
    }
  }
})

// const nodes = [
//   {
//     x: 50,
//     y: 50,
//     width: 50,
//     height: 50,
//     background: "red",
//     type: "rect",
//     deep: "0",
//     index: 0,
//     nodes: [
//       {
//         x: 10,
//         y: 10,
//         width: 20,
//         height: 20,
//         background: "green",
//         type: "rect",
//         deep: "0_0",
//         index: 0,
//         nodes: []
//       },
//       {
//         x: 10,
//         y: 10,
//         width: 20,
//         height: 20,
//         background: "yellow",
//         type: "rect",
//         deep: "0_1",
//         index: 1,
//         nodes: [
//           {
//             x: 10,
//             y: 10,
//             width: 20,
//             height: 20,
//             background: "pink",
//             type: "rect",
//             deep: "0_1_0",
//             index: 0,
//             nodes: []
//           }
//         ]
//       },
//       {
//         x: 10,
//         y: 10,
//         width: 20,
//         height: 20,
//         background: "gray",
//         type: "rect",
//         deep: "0_2",
//         index: 2,
//         nodes: []
//       }
//     ]
//   },
//   {
//     x: 300,
//     y: 200,
//     width: 100,
//     height: 100,
//     background: "blue",
//     type: "rect",
//     deep: "1",
//     index: 1,
//     nodes: []
//   }
// ]

// const replace = {
//   x: 1000,
//   y: 1000,
//   width: 5,
//   height: 5,
//   background: "purple",
//   type: "circle",
//   deep: "0_0_0_10",
//   index: 10,
//   nodes: []
// }

// const result = getNodes(nodes, "0_1", "deep")

// replaceNode(nodes, "0_1", replace, "deep")

// moveNode(
//   nodes,
//   {
//     from: "0_1_0",
//     to: "0_1"
//   },
//   {
//     from: "deep",
//     to: "deep"
//   }
// )

// console.log(nodes)
