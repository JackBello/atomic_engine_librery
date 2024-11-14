import { EngineCore } from "../lib/";
import pluginSelection from "@/app/plugins/selection/plugin";
import pluginPanAndZoom from "@/app/plugins/pan-and-zoom/plugin";
import {
	Circle2D,
	LineFlowEffect2D,
	Node2D,
	Rectangle2D,
	Scene,
	Text2D,
} from "../lib/nodes";
import { CollisionShapeComponent } from "@/nodes/class/components/2D/collisions/collision-shape.component";
import { AreaComponent } from "@/nodes/class/components/2D/area.component";
import { CharacterBodyComponent } from "@/nodes/class/components/2D/body/character-body.component";
import { StaticBodyComponent } from "@/nodes/class/components/2D/body/static-body.component";

const buttonAddRect = document.querySelector(
	`[data-id="button-add-rect"]`,
) as HTMLInputElement;

const buttonPlayPreview = document.querySelector(
	`[data-id="button-play-preview"]`,
) as HTMLInputElement;

const buttonPausePreview = document.querySelector(
	`[data-id="button-pause-preview"]`,
) as HTMLInputElement;

const buttonStopPreview = document.querySelector(
	`[data-id="button-stop-preview"]`,
) as HTMLInputElement;

const inputVelocity = document.querySelector(
	`[data-id="inputVelocity"]`,
) as HTMLInputElement;

const buttonToggleModeEdition = document.querySelector(
	`[data-id="buttonToggleModeEdition"]`,
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
	renderProcess: "main-thread",
});

app.use("pan-and-zoom", pluginPanAndZoom).use("selection", pluginSelection);

app.input.defineAction("move_left", [
	"keyboard/arrowLeft",
	"keyboard/keyA",
	"joyPad/crossLeft",
]);

app.input.defineAction("move_right", [
	"keyboard/arrowRight",
	"keyboard/keyD",
	"joyPad/crossRight",
]);

app.input.defineAction("move_up", [
	"keyboard/arrowUp",
	"keyboard/keyW",
	"joyPad/crossUp",
]);

app.input.defineAction("move_down", [
	"keyboard/arrowDown",
	"keyboard/keyS",
	"joyPad/crossDown",
]);

const lv1 = new Scene("lv-1");

const borderWindow = new Rectangle2D("border-window", {
	border: true,
	background: "transparent",
	borderColor: "red",
	borderWidth: 5,
	width: app.size.width,
	height: app.size.height,
	x: app.size.width / 2,
	y: app.size.height / 2,
	hovered: false,
	lock: true,
});

lv1.$nodes.add(borderWindow);

const circle1 = new Circle2D("ball", {
	x: 10,
	y: 10,
	radius: 80,
	background: "green",
});

lv1.$nodes.add(circle1);

const rect1 = new Rectangle2D("player", {
	background: "black",
	width: 100,
	height: 100,
	x: 0,
	y: 150,
	rotation: 0,
	scaleX: 1,
	scaleY: 1,
});

rect1.$components.add(CollisionShapeComponent);
rect1.$components.add(CharacterBodyComponent)

const rect1Collision = rect1.$components.get(
	"collision-shape",
) as CollisionShapeComponent;

rect1Collision.width = 100;
rect1Collision.height = 100;

rect1Collision.position = [-50, -50];

rect1.centerY();

rect1.$script.modeExecute = "none";

rect1.$script.defineScript(`
class MyNode extends Rectangle2D {
  speed = 200
  jump_force = 200
  gravity = 300
  destroyTime = 5000
  destroyInterval = 5
  refTimeout = 0
  refInterval = 0
  textTime = undefined

  custom = () => {
    $Logger.message(this)
  }

  _ready() {
    $Logger.message("ready rect 1")

	this.textTime = new $Nodes.Text2D("destroy time", {
		color: "black",
		fontSize: "20px",
		// text: this.destroyInterval + "seg",
		text: "player-1",
		x: 50,
		y: 20,
	})

	$Scene().$nodes.add(this.textTime);

	// this.refInterval = $Timer.interval(1000, () => {
	// 	this.destroyInterval--;
	// 	this.textTime.text = this.destroyInterval + "seg";
	// })
	// this.refTimeout = $Timer.timeout(this.destroyTime, () => {
	// 	this.destroy()
	// 	$Logger.info("node is destroyed")
	// })
  }

  _process(delta) {
	const collider = this.collision.getCollider();

  	if (collider) {
    	// this.destroy()
	}

	if ($Input.isActionPressed("move_right"))
    	this.x += this.speed * delta
	if ($Input.isActionPressed("move_left"))
    	this.x -= this.speed * delta

	if (this.collision.isOnFloor()) {
		if ($Input.isActionPressed("move_up"))
    		this.y -= this.jump_force
	}
	else
		this.y += this.gravity * delta

	// if ($Input.isActionPressed("move_down"))
    // 	this.y += velocity[1] * delta

  }

  _input(event) {
	// $Logger.message(event.hasMousePressed("left"))
  }

  _destroy() {
	// $Timer.clear(this.refInterval, "interval");
	// $Timer.clear(this.refTimeout, "timeout");
	$Logger.info("game over")

	this.textTime.text = "Game Over!"
	this.textTime.fontSize = "50px"
	this.textTime.center()
  }
}`);

const countFPS = new Text2D("countFPS", {
	text: "FPS: 0",
	fontSize: "20px",
	color: "black",
	y: 10,
});

countFPS.centerX();

countFPS.$script.modeExecute = "none";

countFPS.$script.defineScript(`
class MyNode extends Text2D {
	_process() {
		this.text = "FPS: " + $Time.fps()
	}
}`);

const lineFlow = new LineFlowEffect2D("effect-1", {
	width: 300,
	height: 300,
	x: 50,
	y: 50,
	color:
		"linear-gradient(0.1 #ff5c33, 0.2 #ff66b3, 0.4 #ccccff, 0.6 #b3ffff, 0.8 #80ff80, 0.9 #ffff33)",
	cellSize: 10,
	spacing: 10,
	lineWidth: 0.5,
	rotation: 0,
	radius: 0,
});

lineFlow.$script.modeExecute = "none";

lineFlow.$script.defineScript(`
class MyNode extends LineFlowEffect2D {
	_ready() {
		this.$attributes.add("vr", {
			value: 0.03
		})

		$Logger.message("effect ready")
	}

	_process() {
		if (this.radius > 5 || this.radius < -5) this.$attributes.get("vr").value *= -1

		this.radius += this.$attributes.get("vr").value
	}
}
`);

const water = new Node2D("water", {
	height: 0,
	width: 0,
	y: 470,
	x: 0,
})

water.$components.add(CollisionShapeComponent)
water.$components.add(StaticBodyComponent)

const waterCollision = water.$components.get("collision-shape") as CollisionShapeComponent

waterCollision.width = app.size.width;
waterCollision.height = 100;
waterCollision.position = [0, 0];

water.$script.modeExecute = "none"

water.$script.defineScript(`
class MyNode extends Node2D {
	_body_entering_area(body) {
		$Logger.info("entered", body.slug)
	}

	_body_leaving_area(body) {
		$Logger.info("exited", body.slug)
		body.destroy()
		$Logger.info($Scene().$nodes.all)
	}
}
`)

app.scenes.add(lv1);
app.scenes.change(lv1.slug);

await app.scenes.load();

lv1.$nodes.add(lineFlow);
lv1.$nodes.add(rect1);
lv1.$nodes.add(countFPS);
lv1.$nodes.add(water);

await rect1.$script.executeScript();
await countFPS.$script.executeScript();
await lineFlow.$script.executeScript();
await water.$script.executeScript()

// console.log(lv1.$nodes.all);

if (rect1.speed) {
	inputVelocity.value = rect1.speed;
	inputVelocity.oninput = () => {
		rect1.speed = Number(inputVelocity.value);
	};
}

buttonToggleModeEdition.addEventListener("click", () => {
	app["pan-and-zoom"].toggleMode();
});

buttonAddRect.addEventListener("click", async () => {
	const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

	const randomRect = new Rectangle2D("enemy", {
		background: color,
		width: 100,
		height: 100,
		x: 50,
		y: 50,
	});

	randomRect.$script.modeExecute = "none";

	randomRect.$script.defineScript(`
class MyNode extends Rectangle2D {
	_process() {
		const collider = this.collision.getCollider();
		
  		if (collider) {
	    	$Logger.info(collider.slug)
		}
	}
}
`);

	randomRect.$components.add(CollisionShapeComponent);

	const randomRectCollision = randomRect.$components.get(
		"collision-shape",
	) as CollisionShapeComponent;

	randomRectCollision.width = 100;
	randomRectCollision.height = 100;

	randomRectCollision.position = [-50, -50];

	lv1.$nodes.add(randomRect);

	await randomRect.$script.executeScript();

	randomRect.center();
});

buttonPlayPreview.addEventListener("click", async () => {
	await app.control.preview.play();
});

buttonStopPreview.addEventListener("click", () => {
	app.control.preview.stop();
});

buttonPausePreview.addEventListener("click", () => {
	app.control.preview.pause();
});
