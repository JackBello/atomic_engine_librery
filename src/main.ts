import { EngineCore } from "../lib/";
import pluginSelection from "@/app/plugins/selection/plugin";
import pluginPanAndZoom from "@/app/plugins/pan-and-zoom/plugin";
import {
	Circle2D,
	type GlobalNode,
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

const objects: Record<string, null | GlobalNode> = {
	player: null,
};

const lv1 = new Scene("lv-1");

lv1.emit("scene:remove_node", (node: Rectangle2D) => {
	objects[node.slug] = null;
});

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

objects.player = new Rectangle2D("player", {
	background: "black",
	width: 100,
	height: 100,
	x: 0,
	y: 150,
	rotation: 0,
	scaleX: 1,
	scaleY: 1,
});

objects.player.$components.add(CollisionShapeComponent);
objects.player.$components.add(CharacterBodyComponent);

const rect1Collision = objects.player.$components.get(
	"collision-shape",
) as CollisionShapeComponent;

rect1Collision.width = 100;
rect1Collision.height = 100;

objects.player.center();

objects.player.$script.modeExecute = "none";

objects.player.$script.defineScript(`
class MyNode extends Rectangle2D {
  speed = 200
  speedY = 0;
  jump_force = 300
  gravity = 800
  isDead = false
  delete = false;

  textTime = undefined

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
  }

  _process(delta) {
  	if ($Input.isActionPressed("move_right") && !this.isDead)
    	this.x += this.speed * delta
	if ($Input.isActionPressed("move_left") && !this.isDead)
    	this.x -= this.speed * delta

	if (this.collision.isOnFloor()) {
		if ($Input.isActionPressed("move_up") && !this.isDead) {
			this.speedY = -this.jump_force
		}
		else
			this.speedY = 0
	}
	else {
		this.speedY += this.gravity * delta
	}

	this.y += this.speedY * delta;
  }

  _destroy() {
	$Logger.info("game over")

	this.textTime.text = "Game Over!"
	this.textTime.fontSize = "50px"
	this.textTime.center()
  }

  dead() {
  	if (!this.isDead) {
		this.speedY = -500
		this.isDead = true;
	}
	else {
		this.delete = true
	}
  }
}`);

const countFPS = new Text2D("countFPS", {
	text: "FPS: 0",
	fontSize: "40px",
	color: "black",
	y: 0
});

// countFPS.setScale(3)

// const test = new Text2D("test", {
// 	text: "test",
// 	fontSize: "20px",
// 	color: "red",
// 	y: 20
// })

// countFPS.$nodes.add(test)

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

lineFlow.$components.add(CollisionShapeComponent);
lineFlow.$components.add(CharacterBodyComponent);

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

const floor = new Node2D("water", {
	height: 100,
	width: 450,
	y: 495,
});

floor.centerX()

floor.$components.add(CollisionShapeComponent);
floor.$components.add(StaticBodyComponent);

const floorCollision = floor.$components.get(
	"collision-shape",
) as CollisionShapeComponent;

floorCollision.width = 450;
floorCollision.height = 100;

const areaDestroy = new Node2D("area-dead", {
	height: 100,
	width: app.size.width,
	x: 0,
	y: app.size.height - 5,
});

areaDestroy.centerX()

areaDestroy.$components.add(CollisionShapeComponent);
areaDestroy.$components.add(AreaComponent);

const AreaCollision = areaDestroy.$components.get(
	"collision-shape",
) as CollisionShapeComponent;

AreaCollision.width = app.size.width;
AreaCollision.height = 100;
AreaCollision.fill = "rgba(0,255,0,0.3)";

areaDestroy.$script.modeExecute = "none";

areaDestroy.$script.defineScript(`
class MyNode extends Node2D {
	_body_entering_area(body) {
		if (body.slug === "player")
			body.dead()
		$Logger.info("entered", body.slug)
	}

	_body_leaving_area(body) {
		if (body.slug === "player" && body.delete) {
			body.destroy()
			$Logger.info("exited", body.slug)
			$Logger.info($Scene().$nodes.all)
		}
	}
}
`);

app.scenes.add(lv1);
app.scenes.change(lv1.slug);

await app.scenes.load();

lv1.$nodes.add(lineFlow);
lv1.$nodes.add(objects.player);
lv1.$nodes.add(countFPS);
lv1.$nodes.add(floor);
lv1.$nodes.add(areaDestroy);

await objects.player.$script.executeScript();
await countFPS.$script.executeScript();
await lineFlow.$script.executeScript();
await areaDestroy.$script.executeScript();

// console.log(lv1.$nodes.all);

if (objects.player.speed) {
	inputVelocity.value = objects.player.speed;

	inputVelocity.oninput = () => {
		objects.player.speed = Number(inputVelocity.value);
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
