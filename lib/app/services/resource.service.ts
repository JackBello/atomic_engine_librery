import type { EngineCore } from "../engine";
import type { GameCore } from "../game";

export default class ResourceService {
	private $app: EngineCore | GameCore;

	protected _scenes = new Map();
	protected _audios = new Map();
	protected _images = new Map();
	protected _videos = new Map();
	protected _nodes = new Map();

	constructor(app: EngineCore | GameCore) {
		this.$app = app;

		this.$app;
	}
}
