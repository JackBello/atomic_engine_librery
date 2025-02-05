import { type GlobalNode, RootNode, Vector2 } from "@/nodes";
import { AbstractRender } from "@/nodes/abstract/render.abstract";
import { CalculateNode2D, NodePropType } from "@/nodes/symbols";
import { handleDrawContextWebGPU } from "./handle";
import type { TAnything } from "@/app/types";

export class RenderWebGPU extends AbstractRender {
    scaleViewport = 1;

    protected context: GPUCanvasContext;
    protected device: GPUDevice
    protected format: GPUTextureFormat
    protected pipeline!: GPURenderPipeline

    protected bindGroupsLayout: GPUBindGroupLayout[] = []

    constructor(context: GPUCanvasContext, device: GPUDevice, format: GPUTextureFormat) {
        super();
        this.context = context
        this.device = device
        this.format = format

        this.bindGroupsLayout = [
            // Layout para @group(0) (matriz de transformación)
            this.device.createBindGroupLayout({
                entries: [
                    {
                        binding: 0, // @binding(0)
                        visibility: GPUShaderStage.VERTEX, // Solo visible en el vertex shader
                        buffer: { type: "uniform" }, // Buffer uniforme
                    },
                ],
            }),
            // Layout para @group(1) (color)
            this.device.createBindGroupLayout({
                entries: [
                    {
                        binding: 0, // @binding(0)
                        visibility: GPUShaderStage.FRAGMENT, // Solo visible en el fragment shader
                        buffer: { type: "uniform" }, // Buffer uniforme
                    },
                ],
            }),
        ];

        this.setupPipeline()
    }

    private async setupPipeline() {
        const vertexShader = /* wgsl */`
            @group(0) @binding(0) var<uniform> transform: mat3x3<f32>;

            @vertex
            fn main(@location(0) position: vec2<f32>) -> @builtin(position) vec4<f32> {
                let transformedPosition = transform * vec3(position, 1.0);

                return vec4(transformedPosition.xy, 0.0, 1.0);

                // return vec4<f32>(position, 0.0, 1.0);
            }
        `;

        const fragmentShader = /* wgsl */`
            @group(1) @binding(0) var<uniform> color: vec4<f32>;

            @fragment
            fn main() -> @location(0) vec4<f32> {
                return color; // Color rojo
            }
        `;

        this.pipeline = this.device.createRenderPipeline({
            vertex: {
                module: this.device.createShaderModule({ code: vertexShader }),
                entryPoint: "main",
                buffers: [{
                    arrayStride: 2 * 4, // 2 floats por vértice (x, y)
                    attributes: [{
                        shaderLocation: 0,
                        offset: 0,
                        format: "float32x2"
                    }]
                }]
            },
            fragment: {
                module: this.device.createShaderModule({ code: fragmentShader }),
                entryPoint: "main",
                targets: [{ format: this.format }],
            },
            primitive: {
                topology: "triangle-strip",
            },
            layout: this.device.createPipelineLayout({
                bindGroupLayouts: this.bindGroupsLayout
            })
        });
    }


    clear(): void {
        const commandEncoder = this.device.createCommandEncoder();
        const textureView = this.context.getCurrentTexture().createView();
        const renderPass = commandEncoder.beginRenderPass({
            colorAttachments: [
                {
                    view: textureView,
                    clearValue: [0, 0, 0, 0], // Fondo negro
                    loadOp: "clear",
                    storeOp: "store",
                },
            ],
        });
        renderPass.end();
        this.device.queue.submit([commandEncoder.finish()]);
    }

    draw(root: GlobalNode): void {
        this.executeDraw(root);
    }

    protected executeDraw(node: GlobalNode, parentTransform: {
        position: Vector2
        scale: Vector2
        rotation: number;
        alpha: number;
    } = { position: Vector2.zero(), scale: Vector2.one(), rotation: 0, alpha: 1 },): void {
        for (let index = 0; index < node.$nodes.size; index++) {
            const nodeRef = node.$nodes.all[index];

            if (!nodeRef[NodePropType].startsWith("2D")) {
                this.executeDraw(nodeRef, parentTransform);
                continue;
            }

            if (!nodeRef.visible) continue;

            const accumulativeTransform = RootNode.calculateTransforms(
                {
                    position: nodeRef.position ?? Vector2.zero(),
                    scale: nodeRef.scale ?? Vector2.one(),
                    rotation: nodeRef[CalculateNode2D].angle ?? 0,
                    alpha: nodeRef.alpha ?? 1,
                },
                parentTransform,
            );

            handleDrawContextWebGPU(
                nodeRef[NodePropType] as TAnything,
                {
                    ...nodeRef.toObject()
                },
                this.context,
                this.device,
                this.pipeline,
                this.bindGroupsLayout,
            )

            if (nodeRef.$nodes.size > 0) {
                this.executeDraw(nodeRef, accumulativeTransform);
            }
        }
    }

}