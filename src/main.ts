import { AtomicEngine } from "../lib/";
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

const app = new AtomicEngine({
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

rect1.script = `
$attributes.add("vx", {
  value: 0.8
})
$attributes.add("vy", {
  value: 0.5
})
$attributes.add("vs", {
  value: 0.001
})

@expose function save() {
  console.log("save")
}

function _ready() {
  console.log("ready block")
}

function _process() {
  const collider = $collider()

  if (collider && collider.slug === "enemy") {
    $destroyNode()
  }

  x += $attributes.get("vx").value;
  y += $attributes.get("vy").value;

  scaleX += $attributes.get("vs").value;
  scaleY += $attributes.get("vs").value;

  if ((scaleX < 0.5 || scaleX > 1.5) && (scaleY < 0.5 || scaleY > 1.5)) $attributes.get("vs").value *= -1

  if ((x - (width * scaleX / 2)) < 0 || x + (width * scaleX / 2) > viewport.width) {
    $attributes.get("vx").value *= -1;
    background = "#" + Math.floor(Math.random() * 16777215).toString(16)
  }
  if ((y - (height * scaleY / 2)) < 0 || y + (height * scaleY / 2) > viewport.height) {
    $attributes.get("vy").value *= -1;
    background = "#" + Math.floor(Math.random() * 16777215).toString(16)
  }
}

function _destroyed() {
  console.log("game over")

  $finish();
}
`;

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
