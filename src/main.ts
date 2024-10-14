import { EngineCore } from "../lib/";
import pluginSelection from "@/plugins/selection/plugin";
import pluginPanAndZoom from "@/plugins/pan-and-zoom/plugin";
import { Scene, Rectangle2D } from "../lib/nodes";

const buttonPlayPreview = document.querySelector(
	`[data-id="button-play-preview"]`,
) as HTMLInputElement;

const buttonPausePreview = document.querySelector(
	`[data-id="button-pause-preview"]`,
) as HTMLInputElement;

const buttonStopPreview = document.querySelector(
	`[data-id="button-stop-preview"]`,
) as HTMLInputElement;

const app = new EngineCore({
	background: "#eeeeee",
	context: "2d",
	dimension: "2D",
	fps: {
		delay: 1000,
		velocity: 60,
	},
	game: {
		background: "#000000",
		center: true,
		x: 0,
		y: 0,
		title: "Project Start",
		viewport: {
			width: 800,
			height: 600,
		},
		resizable: true,
	},
	height: 600,
	width: 600,
	selector: "[data-canvas]",
});

app.use(pluginPanAndZoom).use(pluginSelection);

app.input.defineAction("move_left", ["arrowLeft", "keyA"]);

app.input.defineAction("move_right", ["arrowRight", "keyD"]);

const lv1 = new Scene("lv-1");

const rect1 = new Rectangle2D("player", {
	background: "red",
	width: 100,
	height: 100,
	x: 50,
	y: 150,
	rotation: 0,
	scaleX: 0.5,
	scaleY: 0.5,
});

rect1.scriptMode = "class";

rect1.center()

rect1.script = `
class MyNode extends Rectangle2D {
  speed = 100
  destroyTime = 10000
  destroyInterval = 10
  refTimeout = 0
  refInterval = 0
  textTime = undefined

  custom = () => {
    $Logger.message(this)
  }

  _ready() {
	this.$attributes.add("vx", {
		value: 0.8
	})

	this.$attributes.add("vy", {
		value: 0.5
	})

	this.$attributes.add("vs", {
		value: 0.001
	})

    $Logger.message("ready rect 3")
	$Logger.message(this)

	this.textTime = new $Nodes.Text2D("destroy time", {
		color: "black",
		fontSize: "20px",
		text: this.destroyInterval + "seg",
		x: 50,
		y: 20,
		width: 50,
		height: 50
	})

	$Scene.$nodes.add(this.textTime);

	this.refInterval = $Timer.interval(1000, () => {
		this.destroyInterval--;
		this.textTime.text = this.destroyInterval + "seg";
	})
	this.refTimeout = $Timer.timeout(this.destroyTime, () => {
		$Node.destroy()
		$Logger.info("node is destroyed")
	})
  }

  _process(delta) {
  	const collider = $Node.collider()

  	if (collider && collider.slug === "enemy") {
    	Node.destroy()
	}

	if ($Input.isActionPressed("move_right"))
    	this.x += this.speed * delta
	if ($Input.isActionPressed("move_left"))
    	this.x -= this.speed * delta
  }

  _input(event) {
	$Logger.message(event.hasMousePressed("left"))
  }

  _destroy() {
	$Timer.clear(this.refInterval, "interval");
	$Timer.clear(this.refTimeout, "timeout");
	$Logger.info("game over")

	this.textTime.text = "Game Over!"
	this.textTime.fontSize = "50px"
	this.textTime.x = 100
	this.textTime.y = 100
	this.textTime.center()
  }
}`;

lv1.$nodes.add(rect1);

app.scenes.add(lv1);

await app.scenes.change(lv1.slug);

buttonPlayPreview.addEventListener("click", async () => {
	await app.control.preview.play();
});

buttonStopPreview.addEventListener("click", () => {
	app.control.preview.stop();
});

buttonPausePreview.addEventListener("click", () => {
	app.control.preview.pause();
});
