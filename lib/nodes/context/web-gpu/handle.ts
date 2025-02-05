import type { TAnything, TFunction } from "@/app/types";
import type { TCanvasNode2D } from "@/nodes/types";
import { rectangle_WEB_GPU } from "./nodes/rectangle";

export const handleDrawContextWebGPU = (
    action: Exclude<TCanvasNode2D, "2D/node">,
    options: TAnything,
    context: GPUCanvasContext,
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    groupLayout: GPUBindGroupLayout[]
) => {
    const actions: Record<Exclude<TCanvasNode2D, "2D/node">, TFunction<TAnything>> = {
        "2D/rectangle": rectangle_WEB_GPU,
        "2D/circle": () => "",
        "2D/text": () => "",
        "2D/selection": () => "",
        "2D/line-flow-effect": () => "",
        "2D/control-edition": () => "",
        "2D/image": () => "",
        "2D/sprite": () => "",
    };

    const result = actions[action];

    if (!result) return

    const { vertices, colors, matrix } = result(options, context) as {
        vertices: Float32Array<ArrayBuffer>;
        colors: Float32Array<ArrayBuffer>;
        matrix: Float32Array<ArrayBuffer>;
    };

    const transformBuffer = device.createBuffer({
        size: 4 * 4 * 4, // 4x4 matrix * 4 bytes por float
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(transformBuffer, 0, matrix);

    const vertexBuffer = device.createBuffer({
        size: vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(vertexBuffer, 0, vertices);

    const colorBuffer = device.createBuffer({
        size: colors.byteLength * 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(colorBuffer, 0, colors);

    const bindGroupTransform = device.createBindGroup({
        layout: groupLayout[0],
        entries: [
            {
                binding: 0,
                resource: { buffer: transformBuffer },
            },
        ],
    });

    const bindGroupColor = device.createBindGroup({
        layout: groupLayout[1],
        entries: [{
            binding: 0,
            resource: { buffer: colorBuffer }
        }]
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [
            {
                view: textureView,
                loadOp: "load",
                storeOp: "store",
            },
        ],
    });

    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer); // Pasar los vértices
    renderPass.setBindGroup(0, bindGroupTransform); // Pasar la matriz
    renderPass.setBindGroup(1, bindGroupColor); // Configurar el bind group
    renderPass.draw(vertices.length / 2); // Dibujar los vértices
    renderPass.end();

    device.queue.submit([commandEncoder.finish()])
};
