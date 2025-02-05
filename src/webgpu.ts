import { EngineCore, Rectangle2D, Scene } from "@/index";

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
    context: "web-gpu",
    height: 600,
    width: 600,
    selector: "[data-canvas]",
    analytics: true,
});

const lv1 = new Scene("lv-1");

const player = new Rectangle2D("player", {
    fill: "#ff00ff",
    width: 100,
    height: 100,
    position: "Vec2(0, 0)",
    // skew: "Vec2(10, 10)",
    alpha: 1
});

// player.scale.x = 0.1
// player.scale.y = 0.1

// player.center()

app.scenes.add(lv1);
app.scenes.change(lv1.slug);

await app.scenes.load();

lv1.$nodes.add(player);