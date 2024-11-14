import type { TAnything, TFunction } from "@/app/types";
import type { INodeProcess, TMode } from "@/nodes/global/types";
import { RootNodeSubProcess } from "@/nodes/global/root/root-node.sub";

const nodes = new RootNodeSubProcess();

const actions: Record<string, TFunction> = {
	// root
	"get:root": () => {
		self.postMessage({
			type: "get:root",
			node: nodes.root,
		});
	},
	"set:root": ({ root }: { root: INodeProcess }) => {
		nodes.root = [root];

		self.postMessage({
			type: "set:root",
			node: nodes.root,
		});
	},

	// operations with location
	"get:nodes": ({ location, mode = "index" }: {
		location: string | number;
		mode: TMode;
	}) => {
		if (!nodes.root.length) return;

		self.postMessage({
			type: "get:nodes",
			nodes: nodes.getNodes(location, mode),
		});
	},
	"get:node": ({ location, mode = "index" }: {
		location: string | number;
		mode: TMode;
	}) => {
		if (!nodes.root.length) return;

		self.postMessage({
			type: "get:node",
			node: nodes.getNode(location, mode),
		});
	},
	"add:node": ({ location, value, mode = "index", insert = "before" }: {
		location: string | number;
		value: INodeProcess;
		mode: TMode;
		insert: "before" | "after";
	}) => {
		if (!nodes.root.length) return;

		nodes.addNode(location, value, mode, insert);
	},
	"update:node": (
		{ id, location, value, mode = "index" }: {
			id: string;
			location: string | number;
			value: Record<string, TAnything>;
			mode: TMode;
		},
	) => {
		if (!nodes.root.length) return;

		nodes.updateNode(id, location, value, mode);
	},
	"has:node": ({ location, mode = "index" }: {
		location: string | number;
		mode: TMode;
	}) => {
		if (!nodes.root.length) return;

		self.postMessage({
			type: "has:node",
			node: nodes.hasNode(location, mode),
		});
	},
	"delete:node": ({ location, mode = "index" }: {
		location: string | number;
		mode: TMode;
	}) => {
		if (!nodes.root.length) return;

		nodes.deleteNode(location, mode);
	},
	"clear:nodes": ({ location, mode = "index" }: {
		location: string | number;
		mode: TMode;
	}) => {
		if (!nodes.root.length) return;

		nodes.clearNodes(location, mode);
	},
	"replace:node": ({ from, value, mode = "index" }: {
		from: string | number;
		value: INodeProcess;
		mode: TMode;
	}) => {
		if (!nodes.root.length) return;

		nodes.replaceNode(from, value, mode);
	},
	"search:node": ({ from, search, mode = "index" }: {
		from: string | number;
		search: { value: string | number; mode: TMode };
		mode: TMode;
	}) => {
		if (!nodes.root.length) return;

		self.postMessage({
			type: "search:node",
			node: nodes.searchNode(from, search, mode),
		});
	},
	"move:node": ({ from, to, insert = "after" }: {
		from: {
			search: string | number;
			mode: TMode;
		};
		to: {
			search: string | number;
			mode: TMode;
		};
		insert: "after" | "before";
	}) => {
		if (!nodes.root.length) return;

		nodes.moveNode(from, to, insert);
	},

	// operations with path
	"path/get:nodes": (
		{ path, mode = "index" }: { path: string; mode: TMode },
	) => {
		self.postMessage({
			type: "path/get:nodes",
			nodes: nodes.getNodesByPath(path, mode),
		});
	},
	"path/get:node": (
		{ path, mode = "index" }: { path: string; mode: TMode },
	) => {
		self.postMessage({
			type: "path/get:node",
			node: nodes.getNodeByPath(path, mode),
		});
	},
	"path/add:node": () => {
	},
};

self.onmessage = (event) => {
	const actionExecute = actions[event.data.action];

	if (actionExecute) actionExecute(event.data);

	if (event.data.action === "path/add:node") {
		if (!nodes.root.length) return;

		const { value, path, mode = "index", insert = "before" } = event.data;

		if (nodes.addNodeByPath(path, value, mode, insert)) {
			let parent = nodes.getParentNodeByPath(value.__path__, mode);

			self.postMessage({
				type: "render/update:node",
				change: {
					nodes: parent?.nodes,
					path: parent?.__path__,
				},
			});

			parent = undefined;
		}
	}

	if (event.data.action === "path/update:node") {
		if (!nodes.root.length) return;

		const { id, path, value, mode = "index" } = event.data;

		if (nodes.updateNodeByPath(id, path, value, mode)) {
			let child = nodes.getNodeByPath(path, mode);

			self.postMessage({
				type: "render/update:properties",
				change: {
					options: child?.options,
					path: child?.__path__,
				},
			});

			child = undefined;
		}
	}

	if (event.data.action === "path/has:node") {
		if (!nodes.root.length) return;

		const { path, mode = "index" } = event.data;

		self.postMessage({
			type: "path/has:node",
			node: nodes.hasNodeByPath(path, mode),
		});
	}

	if (event.data.action === "path/delete:node") {
		if (!nodes.root.length) return;

		const { path, mode = "index" } = event.data;

		if (nodes.deleteNodeByPath(path, mode)) {
			let parent = nodes.getParentNodeByPath(path, mode);

			self.postMessage({
				type: "render/update:node",
				change: {
					nodes: parent?.nodes,
					path: parent?.__path__,
				},
			});

			parent = undefined;
		}
	}

	if (event.data.action === "path/clear:nodes") {
		if (!nodes.root.length) return;

		const { path, mode = "index" } = event.data;

		if (nodes.clearNodesByPath(path, mode)) {
			let child = nodes.getNodeByPath(path, mode);

			self.postMessage({
				type: "render/update:node",
				change: {
					nodes: [],
					path: child?.__path__,
				},
			});

			child = undefined;
		}
	}

	if (event.data.action === "path/replace:node") {
		if (!nodes.root.length) return;

		const { from, value, mode = "index" } = event.data;

		if (nodes.replaceNodeByPath(from, value, mode)) {
			self.postMessage({
				type: "render/replace:node",
				change: nodes.getNodeByPath(from, mode),
			});
		}
	}

	if (event.data.action === "path/search:node") {
		if (!nodes.root.length) return;

		const { from, search, mode = "index" } = event.data;

		self.postMessage({
			type: "path/search:node",
			node: nodes.searchNodeByPath(from, search, mode),
		});
	}

	if (event.data.action === "path/move:node") {
		if (!nodes.root.length) return;

		const { from, to, insert = "after" } = event.data.options;

		nodes.moveNodeByPath(from, to, insert);
	}
};
