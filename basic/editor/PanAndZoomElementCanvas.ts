
export class PanAndZoomCanvasScene {
    public static $canvasScene: CanvasSceneService
    public static $canvasEditor: CanvasEditorService
    public static $canvasGrid: CanvasGridService
    public static $scene: SceneService
    protected static _startPanning = {
        x: 0,
        y: 0
    }
    protected static _isPanning = false;
    protected static mouseCoords = {
        x: 0,
        y: 0
    }

    public static control = {
        isPanning: false,
        offsetX: 0,
        offsetY: 0,
        scale: 1.0
    }

    public static panControl = {
        speed: 0.6,
        offsetX: 0,
        offsetY: 0
    }

    public static zoomControl = {
        max: 5.0,
        min: 0.2,
        speed: 0.05,
        scale: 1.0,
        grid: 1.0
    }

    public static startFromCanvasScene() {
        this.$canvasScene.graphics.translate(this.control.offsetX, this.control.offsetY);
        this.$canvasScene.graphics.scale(this.control.scale, this.control.scale);
    }

    public static startFromCanvasGrid() {
        this.$canvasGrid.graphics.translate(this.control.offsetX, this.control.offsetY);
        this.$canvasGrid.graphics.scale(this.control.scale, this.control.scale);
    }

    public static applyCanvasGridBackground() {
        if (this.$canvasGrid.background) {
            var backgroundX = this.control.offsetX * this.control.scale;
            var backgroundY = this.control.offsetY * this.control.scale;
            var backgroundWidth = this.$canvasGrid.width / this.control.scale;
            var backgroundHeight = this.$canvasGrid.height / this.control.scale;

            this.$canvasGrid.graphics.beginPath();
            this.$canvasGrid.graphics.fillStyle = this.$canvasGrid.background;
            this.$canvasGrid.graphics.fillRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
        }
    }

    public static applyCanvasGrid() {
        const screenWidth = this.$canvasGrid.canvasWindow.width / this.zoomControl.grid;
        const screenHeight = this.$canvasGrid.canvasWindow.height / this.zoomControl.grid;

        const startX = Math.floor(-this.control.offsetX / this.$canvasGrid.grid);
        const endX = startX + Math.ceil(screenWidth / this.$canvasGrid.grid);
        const startY = Math.floor(-this.control.offsetY / this.$canvasGrid.grid);
        const endY = startY + Math.ceil(screenHeight / this.$canvasGrid.grid);

        for (let y = startY; y <= endY; y++) {
            this.$canvasGrid.graphics.beginPath();
            this.$canvasGrid.graphics.lineWidth = 1;
            this.$canvasGrid.graphics.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            this.$canvasGrid.graphics.moveTo(-200 * this.$canvasGrid.grid, y * this.$canvasGrid.grid + this.control.offsetY);
            this.$canvasGrid.graphics.lineTo(200 * this.$canvasGrid.grid, y * this.$canvasGrid.grid + this.control.offsetY);
            this.$canvasGrid.graphics.stroke();
            this.$canvasGrid.graphics.closePath()
        }

        for (let x = startX; x <= endX; x++) {
            this.$canvasGrid.graphics.beginPath();
            this.$canvasGrid.graphics.lineWidth = 1;
            this.$canvasGrid.graphics.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            this.$canvasGrid.graphics.moveTo(x * this.$canvasGrid.grid + this.control.offsetX, -200 * this.$canvasGrid.grid);
            this.$canvasGrid.graphics.lineTo(x * this.$canvasGrid.grid + this.control.offsetX, 200 * this.$canvasGrid.grid);
            this.$canvasGrid.graphics.stroke();
            this.$canvasGrid.graphics.closePath()
        }
    }

    public static pan() {
        const dx = this.panControl.offsetX - this.control.offsetX;
        const dy = this.panControl.offsetY - this.control.offsetY;
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            this.control.offsetX += dx * this.panControl.speed;
            this.control.offsetY += dy * this.panControl.speed;
        }
    }

    public static zoom() {
        const delta = this.zoomControl.scale - this.control.scale
        if (Math.abs(delta) > 0.001) {
            this.control.scale += delta * 0.1
        }
    }

    public static updateCanvasScene() {
        this.startFromCanvasScene()
    }

    public static updateCanvasGrid() {
        this.startFromCanvasGrid()
    }

    public static getPosition(event: MouseEvent) {
        this.mouseCoords = {
            x: event.clientX,
            y: event.clientY
        }
    }

    public static mousedown(event: MouseEvent) {
        if (event.button !== 0) return

        this._isPanning = true;
        this.control.isPanning = true;

        this._startPanning.x = event.clientX;
        this._startPanning.y = event.clientY;

        this.$canvasEditor.canvasWindow.style.cursor = "grabbing"
    }

    public static mousemove(event: MouseEvent) {
        if (!this._isPanning) return

        const dx = event.clientX - this._startPanning.x;
        const dy = event.clientY - this._startPanning.y;

        this.panControl.offsetX += dx;
        this.panControl.offsetY += dy;

        this._startPanning.x = event.clientX;
        this._startPanning.y = event.clientY;

        this.$canvasEditor.canvasWindow.style.cursor = "grabbing"
    }

    public static mouseup(event: MouseEvent) {
        if (event.button !== 0) return

        this.control.isPanning = false;
        this._isPanning = false;

        this.$canvasEditor.canvasWindow.style.cursor = "grab"
    }

    public static wheel(event: WheelEvent) {
        const delta = event.deltaY > 0 ? -1 : 1;

        this.zoomControl.scale += delta * this.zoomControl.speed
        this.zoomControl.scale = Math.max(this.zoomControl.min, Math.min(this.zoomControl.max, this.zoomControl.scale));

        if (Math.sign(event.deltaY) > 0) {
            this.zoomControl.grid /= 1.0
        } else {
            this.zoomControl.grid /= 1.0
        }

        if (this.zoomControl.grid > 5) {
            this.zoomControl.grid = 1.0
        }
    }
}
