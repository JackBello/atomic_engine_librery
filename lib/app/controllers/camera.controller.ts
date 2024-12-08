import type { CameraComponent } from "@/nodes/class/components/2D/camera.component";
import type { GameCore } from "../game";
import type { EngineCore } from "../engine";

export class CameraController {
    protected $app: EngineCore | GameCore;
    protected cameras: Set<CameraComponent>
    protected context!: CanvasRenderingContext2D;

    constructor(app: EngineCore | GameCore) {
        this.$app = app
        this.cameras = new Set()
    }

    setContext(context: CanvasRenderingContext2D) {
        this.context = context
    }

    addCamera(camera: CameraComponent) {
        this.cameras.add(camera)
    }

    removeCamera(camera: CameraComponent) {
        this.cameras.delete(camera)
    }

    clearCameras() {
        this.cameras.clear()
    }

    render(scene: () => void) {
        if (this.cameras.size === 0) {
            scene()
            return
        }

        for (const camera of this.cameras) {
            this.context.save();

            this.context.translate(
                -400 + this.$app.viewport.width / 2,
                -300 + this.$app.viewport.height / 2
            );

            this.context.scale(camera.scale.x, camera.scale.y);
            this.context.translate(
                -camera.position.x,
                -camera.position.y
            );

            scene()

            this.context.restore();
        }
    }
}