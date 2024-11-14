// const pluginSelection = {
//     events: {
//         "canvas/mouse:move": (app, event: MouseEvent) => {
//             const panAndZoomConfig = app.use("@config/pan-and-zoom");

//             if (panAndZoomConfig.mode === "pan-and-zoom") return;

//             let cursor: TCursorOptions = "default";

//             const { left, top } = app.canvas.event.getBoundingClientRect();

//             const mouseCoords = {
//                 x: event.clientX - left,
//                 y: event.clientY - top,
//             };

//             const config = app.use("@config/selection");
//             const providers = app.use("@providers/selection");
//             const selection = app.use("@nodes/selection")
//                 .selection as Selection2D;
//             const controlEdition = app.use("@nodes/selection")
//                 .control as ControlEdition2D;

//             if (!config.isDragging && app.scenes.currentScene) {
//                 const nodes = (app.scenes.currentScene as Node2D)
//                     .nodes as Node2D[];

//                 for (let index = nodes.length - 1; index >= 0; index--) {
//                     const node = nodes[index];

//                     if (
//                         providers.intersectionNodeWithCursor({
//                             zoom: panAndZoomConfig.zoom,
//                             pan: {
//                                 x: panAndZoomConfig.pan.x,
//                                 y: panAndZoomConfig.pan.y,
//                             },
//                             node: {
//                                 x: node.x,
//                                 y: node.y,
//                                 width: node.width,
//                                 height: node.height,
//                                 scaleX: node.scaleX,
//                                 scaleY: node.scaleY,
//                                 rotation: node.rotation,
//                             },
//                             mouseCoords,
//                         })
//                     ) {
//                         cursor = "default";
//                         break;
//                     }
//                 }
//             }

//             if (config.isDragging && config._.node) {
//                 cursor = "move";

//                 providers.moveNodeByMouse(
//                     config._.node,
//                     mouseCoords,
//                     config.startCoords,
//                     panAndZoomConfig.pan,
//                     panAndZoomConfig.zoom,
//                 );

//                 controlEdition.set({
//                     x: config._.node.x,
//                     y: config._.node.y,
//                     width: config._.node.width,
//                     height: config._.node.height,
//                     scaleX: config._.node.scaleX,
//                     scaleY: config._.node.scaleY,
//                 });
//             }

//             if (config.isDragging && !config._.node) {
//                 selection.set({
//                     background: config.selection.background,
//                     radius: config.selection.radius,
//                     border: config.selection.border,
//                     borderColor: config.selection.borderColor,
//                     borderWidth: config.selection.borderWidth,
//                     width: mouseCoords.x - panAndZoomConfig.pan.x -
//                         config.startCoords.x,
//                     height: mouseCoords.y - panAndZoomConfig.pan.y -
//                         config.startCoords.y,
//                     x: config.startCoords.x,
//                     y: config.startCoords.y,
//                     endX: mouseCoords.x - panAndZoomConfig.pan.x,
//                     endY: mouseCoords.y - panAndZoomConfig.pan.y,
//                 });

//                 selection.select(app.scenes.currentScene.nodes);
//             }

//             app.canvas.event.style.cursor = cursor;
//         },
//     },
// };
