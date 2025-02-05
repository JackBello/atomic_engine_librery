import { EngineCore, ResourceSpriteSheet, TransitionComponent } from "../lib/";
import {
	type GlobalNode,
	Node2D,
	Rectangle2D,
	Scene,
	Sprite2D
} from "../lib/nodes";
import { CollisionShape2DComponent } from "@/nodes/class/components/2D/collisions/collision-shape.component";
import { DetectionArea2DComponent } from "@/nodes/class/components/2D/detection-area.component";
import { CharacterBody2DComponent } from "@/nodes/class/components/2D/body/character-body.component";
import { StaticBody2DComponent } from "@/nodes/class/components/2D/body/static-body.component";
import { Camera2DComponent } from "@/nodes/class/components/2D/camera.component";

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
	selector: "[data-canvas]",
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

const objects: Record<string, null | GlobalNode> = {
	player: null,
};

const lv1 = new Scene("lv-1");

lv1.$script.modeExecute = "none"

lv1.$script.defineScript(`
	class MyScene extends Scene {
		async _preload() {
			let borderWindow = await preload("/objects/border-window.object")
			let ball = await preload("/objects/ball.object")
			let counterFPS = await preload("/objects/countFPS.object")
			let effect1 = await preload("/objects/effect-1.object")
			// let raton = await preload("/objects/raton.object")

			CurrentScene.$nodes.add(borderWindow);
			CurrentScene.$nodes.add(ball);
			CurrentScene.$nodes.add(counterFPS);
			CurrentScene.$nodes.add(effect1);
			// CurrentScene.$nodes.add(raton);

			borderWindow = undefined
			ball = undefined
			counterFPS = undefined
			effect1 = undefined
			// raton = undefined
		}		
	}
`)

lv1.emit("scene:remove_node", (node: Rectangle2D) => {
	objects[node.slug] = null;
});

objects.player = new Rectangle2D("player", {
	fill: "black",
	width: 100,
	height: 100,
	position: "Vec2(0, 150)",
	scale: "Vec2(1, 1)",
	rotation: 0,
	alpha: 0.1
});

// objects.player.$components.add(CollisionShapeComponent);
// objects.player.$components.add(CharacterBodyComponent);
// objects.player.$components.add(CameraComponent)

// const rect1Collision = objects.player.$components.get(
// 	"collision-shape",
// ) as CollisionShapeComponent;

// rect1Collision.debug = false

objects.player.centerY();

objects.player.position.x = 100

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

const floor = new Node2D("floor", {
	height: 100,
	width: 450,
	position: "Vec2(0, 495)",
});

floor.centerX()

floor.$components.add(CollisionShape2DComponent);
floor.$components.add(StaticBody2DComponent);

const wall = new Node2D("wall", {
	height: 200,
	width: 50,
	position: "Vec2(500, 345)",
})

wall.$components.add(CollisionShape2DComponent);
wall.$components.add(StaticBody2DComponent);

const areaDestroy = new Node2D("area-dead", {
	height: 100,
	width: app.size.width,
	position: `Vec2(0, ${app.size.height - 5})`,
});

areaDestroy.centerX()

areaDestroy.$components.add(CollisionShape2DComponent);
areaDestroy.$components.add(DetectionArea2DComponent);

const AreaCollision = areaDestroy.$components.get(
	"collision-shape",
) as CollisionShape2DComponent;

AreaCollision.fill = "rgba(0,255,0,0.3)";

areaDestroy.$script.modeExecute = "none";

areaDestroy.$script.defineScript(`
class MyNode extends Node2D {
	_body_entering_area(body) {
		// if (body.slug === "alien")
			// body.dead()
		Logger.info("entered", body.slug)
	}

	_body_leaving_area(body) {
		Logger.info("exited", body.slug)

		// if (body.slug === "alien" && body.delete) {
		// 	body.destroy()
		// 	Logger.info(CurrentScene.$nodes.all)
		// }
	}
}
`);

const spriteAlien = new ResourceSpriteSheet("link", {
	source: "https://localhost:5173/src/link.png",
	origin: "anonymous",
	border: [0, 0],
	grid: [4, 3],
	width: 16,
	height: 18,
	spacing: [0, 0]
})

await spriteAlien.load()

const alien = new Sprite2D("alien", {
	width: 16,
	height: 18,
	frame: 0,
	position: "Vec2(127, 391)",
}, spriteAlien)

alien.$components.add(TransitionComponent);
alien.$components.add(Camera2DComponent)
alien.$components.add(CollisionShape2DComponent);
alien.$components.add(CharacterBody2DComponent);

const alienCollision = alien.$components.get(
	"collision-shape",
) as CollisionShape2DComponent;

alienCollision.debug = true
// alienCollision.width = 7
// alienCollision.position.x = 5

const alienTransition = alien.$components.get("transition") as TransitionComponent

alienTransition.from = alien.rotation
alienTransition.to = 360
alienTransition.target = "rotation"
alienTransition.duration = 1

alien.frameCoords.x = 0
alien.frameCoords.y = 2
alien.centerY()
alien.setScale(6)
alien.$script.modeExecute = "none"

alien.$script.defineScript(`
class MyNode extends Sprite2D {
  speed = 100
  speedY = 0;
  jump_force = 300
  gravity = 1000
  isDead = false
  delete = false;
  framesMove = [0, 1, 0, 2]
  step = 0

  animation(delta) {
  	const maxFrame = Time.frame() % 15

	if (maxFrame >= 14) {
		this.step += 1;
	}

	if (this.step >= this.framesMove.length) {
		this.step = 0
	}
  }

  _process(delta) {
	this.animation(delta)

	this.frame = 0

	if (Input.hasKeyPressed("keyT")) {
		this.transition.play()
	}

	if (Input.hasKeyPressed("keyR")) {
		this.transition.reset()
	}

	if (Input.hasKeyPressed("space")) {
		this.flipX = !this.flipX;
	}

  	if (Input.isActionPressed("move_right") && !this.isDead) {
		this.frame = this.framesMove[this.step]
		this.flipX = true;
    	this.velocity.x += this.speed
	}
	if (Input.isActionPressed("move_left") && !this.isDead) {
		this.frame = this.framesMove[this.step]
		this.flipX = false;
    	this.velocity.x -= this.speed
	}
	if (Input.isActionPressed("move_up") && !this.isDead) {
    	this.velocity.y -= this.speed
	}
	if (Input.isActionPressed("move_down") && !this.isDead) {
    	this.velocity.y += this.speed
	}
  }

  dead() {
  	if (!this.isDead) {
		this.frame = 0
		this.coords.x = 0 
		this.coords.y = 0 
		this.speedY = -500
		this.isDead = true;
		
	}
	else {
		this.delete = true
	}
  }
}`)

app.scenes.add(lv1);
app.scenes.change(lv1.slug);

await app.scenes.load();

await lv1.$script.executeScript()

// lv1.$nodes.add(objects.player);
lv1.$nodes.add(floor);
lv1.$nodes.add(wall);
lv1.$nodes.add(areaDestroy);
lv1.$nodes.add(alien);

await alien.$script.executeScript()
// await objects.player.$script.executeScript();
await areaDestroy.$script.executeScript();

// console.log(lv1.export("TOML"));

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

	randomRect.$components.add(CollisionShape2DComponent);

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
