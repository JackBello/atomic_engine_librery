import { EngineCore } from "../lib/";
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
// import { CameraComponent } from "@/nodes/class/components/2D/camera.component";

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
	// selector: "[data-canvas]",
	analytics: true,
});

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

app.setSelector("[data-canvas]")

const objects: Record<string, null | GlobalNode> = {
	player: null,
};

const lv1 = new Scene("lv-1");

lv1.emit("scene:remove_node", (node: Rectangle2D) => {
	objects[node.slug] = null;
});

const borderWindow = new Rectangle2D("border-window", {
	fill: "transparent",
	stroke: "red",
	lineWidth: 5,
	width: app.size.width,
	height: app.size.height,
	position: `Vec2(${app.size.width / 2}, ${app.size.height / 2})`,
	hovered: false,
	lock: true,
});

const circle1 = new Circle2D("ball", {
	position: "Vec2(10, 10)",
	radius: 80,
	fill: "green",
});


objects.player = new Rectangle2D("player", {
	fill: "black",
	width: 100,
	height: 100,
	position: "Vec2(0, 150)",
	scale: "Vec2(1, 1)",
	rotation: 0,
});

objects.player.$components.add(CollisionShapeComponent);
objects.player.$components.add(CharacterBodyComponent);
// objects.player.$components.add(CameraComponent)

const rect1Collision = objects.player.$components.get(
	"collision-shape",
) as CollisionShapeComponent;

rect1Collision.debug = false

objects.player.center();

objects.player.$script.modeExecute = "none";

objects.player.$script.defineScript(`
const { add } = await $import("./math.ts")

class MyNode extends Rectangle2D {
  speed = 200
  speedY = 0;
  jump_force = 300
  gravity = 800
  isDead = false
  delete = false;

  textTime = undefined

  _ready() {
    Logger.message("ready rect 1")

	this.textTime = new Text2D("destroy time", {
		fill: "black",
		fontSize: "20px",
		text: "player-1",
		position: "Vec2(50, 20)"
	})

	CurrentScene.$nodes.add(this.textTime);
  }

  _process(delta) {
  	if (Input.isActionPressed("move_right") && !this.isDead)
    	this.position.x += this.speed * delta
	if (Input.isActionPressed("move_left") && !this.isDead)
    	this.position.x -= this.speed * delta

	if (this.collision.isOnFloor()) {
		if (Input.isActionPressed("move_up") && !this.isDead) {
			this.speedY = -this.jump_force
		}
		else
			this.speedY = 0
	}
	else {
		this.speedY += this.gravity * delta
	}

	this.position.y += this.speedY * delta;
  }

  _destroy() {
	Logger.info("game over")

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
	fill: "black",
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

const lineFlow = new LineFlowEffect2D("effect-1", {
	width: 400,
	height: 400,
	position: "Vec2(50, 50)",
	fill:
		"linear-gradient(0.1 #ff5c33, 0.2 #ff66b3, 0.4 #ccccff, 0.6 #b3ffff, 0.8 #80ff80, 0.9 #ffff33)",
	cellSize: 8,
	spacing: 8,
	lineWidth: 0.5,
	rotation: 0,
	radius: 0,
});

// lineFlow.$components.add(CollisionShapeComponent);
// lineFlow.$components.add(CharacterBodyComponent);

lineFlow.$script.modeExecute = "none";

lineFlow.$script.defineScript(`
class MyNode extends LineFlowEffect2D {
	_ready() {
		this.$attributes.add("vr", {
			value: 0.03
		})

		Logger.message("effect ready")
	}

	_process() {
		if (this.radius > 5 || this.radius < -5) this.$attributes.get("vr").value *= -1

		this.radius += this.$attributes.get("vr").value
	}
}
`);

const floor = new Node2D("floor", {
	height: 100,
	width: 450,
	position: "Vec2(0, 495)"
});

floor.centerX()

floor.$components.add(CollisionShapeComponent);
floor.$components.add(StaticBodyComponent);

const areaDestroy = new Node2D("area-dead", {
	height: 100,
	width: app.size.width,
	position: `Vec2(0, ${app.size.height - 5})`,
});

areaDestroy.centerX()

areaDestroy.$components.add(CollisionShapeComponent);
areaDestroy.$components.add(AreaComponent);

const AreaCollision = areaDestroy.$components.get(
	"collision-shape",
) as CollisionShapeComponent;

AreaCollision.fill = "rgba(0,255,0,0.3)";

areaDestroy.$script.modeExecute = "none";

areaDestroy.$script.defineScript(`
class MyNode extends Node2D {
	_body_entering_area(body) {
		if (body.slug === "player")
			body.dead()
		Logger.info("entered", body.slug)
	}

	_body_leaving_area(body) {
		Logger.info("exited", body.slug)

		if (body.slug === "player" && body.delete) {
			body.destroy()
			Logger.info(CurrentScene.$nodes.all)
		}
	}
}
`);

app.scenes.add(lv1);
app.scenes.change(lv1.slug);

await app.scenes.load();

lv1.$nodes.add(circle1);
lv1.$nodes.add(borderWindow);
lv1.$nodes.add(lineFlow);
lv1.$nodes.add(objects.player);
lv1.$nodes.add(countFPS);
lv1.$nodes.add(floor);
lv1.$nodes.add(areaDestroy);

await objects.player.$script.executeScript();
await lineFlow.$script.executeScript();
await areaDestroy.$script.executeScript();

if (objects?.player?.speed) {
	inputVelocity.value = objects.player.speed;

	inputVelocity.oninput = () => {
		if (objects.player) {
			objects.player.speed = Number(inputVelocity.value);
		}
	};
}

buttonToggleModeEdition.addEventListener("click", () => {
	app["pan-and-zoom"].toggleMode();
});

buttonAddRect.addEventListener("click", async () => {
	const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

	const randomRect = new Rectangle2D("enemy", {
		fill: color,
		width: 100,
		height: 100,
		position: "Vec2(50, 50)"
	});

	randomRect.$script.modeExecute = "none";

	randomRect.$script.defineScript(`
class MyNode extends Rectangle2D {
	_process() {
		const collider = this.collision.getCollider();
		
  		if (collider) {
	    	Logger.info(collider.slug)
		}
	}
}
`);

	randomRect.$components.add(CollisionShapeComponent);

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
