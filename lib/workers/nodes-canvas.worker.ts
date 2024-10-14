import { RenderNode } from "@/nodes/global/render-node";

const nodes = new RenderNode();

self.onmessage = (event) => {
	if (event.data.action === "status")
		self.postMessage({
			type: "status",
			data: "ready",
		});

	// root
	if (event.data.action === "get:root") {
		self.postMessage({
			type: "get:root",
			node: nodes.root,
		});
	} else if (event.data.action === "set:root") {
		nodes.root = [event.data.root];
	}

	// location
	if (event.data.action === "get:nodes") {
		if (!nodes.root.length) return;

		const { location, mode = "index" } = event.data;

		self.postMessage({
			type: "get:nodes",
			nodes: nodes.getNodes(location, mode),
		});
	} else if (event.data.action === "get:node") {
		if (!nodes.root.length) return;

		const { location, mode = "index" } = event.data;

		self.postMessage({
			type: "get:node",
			node: nodes.getNode(location, mode),
		});
	} else if (event.data.action === "add:node") {
		if (!nodes.root.length) return;

		const { value, location, mode = "index", insert = "before" } = event.data;

		nodes.addNode(location, value, mode, insert);
	} else if (event.data.action === "update:node") {
		if (!nodes.root.length) return;

		const { id, location, value, mode = "index" } = event.data;

		nodes.updateNode(id, location, value, mode);
	} else if (event.data.action === "has:node") {
		if (!nodes.root.length) return;

		const { location, mode = "index" } = event.data;

		self.postMessage({
			type: "has:node",
			node: nodes.hasNode(location, mode),
		});
	} else if (event.data.action === "delete:node") {
		if (!nodes.root.length) return;

		const { location, mode = "index" } = event.data;

		nodes.deleteNode(location, mode);
	} else if (event.data.action === "clear:nodes") {
		if (!nodes.root.length) return;

		const { location, mode = "index" } = event.data;

		nodes.clearNodes(location, mode);
	} else if (event.data.action === "replace:node") {
		if (!nodes.root.length) return;

		const { from, value, mode = "index" } = event.data;

		nodes.replaceNode(from, value, mode);
	} else if (event.data.action === "search:node") {
		if (!nodes.root.length) return;

		const { from, search, mode = "index" } = event.data;

		self.postMessage({
			type: "search:node",
			node: nodes.searchNode(from, search, mode),
		});
	} else if (event.data.action === "move:node") {
		if (!nodes.root.length) return;

		const { from, to, insert = "after" } = event.data.options;

		nodes.moveNode(from, to, insert);
	}

	// path
	if (event.data.action === "path/get:nodes") {
		if (!nodes.root.length) return;

		const { path, mode = "index" } = event.data;

		self.postMessage({
			type: "path/get:nodes",
			nodes: nodes.getNodesByPath(path, mode),
		});
	} else if (event.data.action === "path/get:node") {
		if (!nodes.root.length) return;

		const { path, mode = "index" } = event.data;

		self.postMessage({
			type: "path/get:node",
			node: nodes.getNodeByPath(path, mode),
		});
	} else if (event.data.action === "path/add:node") {
		if (!nodes.root.length) return;

		const { value, path, mode = "index", insert = "before" } = event.data;

		nodes.addNodeByPath(path, value, mode, insert);
	} else if (event.data.action === "path/update:node") {
		if (!nodes.root.length) return;

		const { id, path, value, mode = "index" } = event.data;

		nodes.updateNodeByPath(id, path, value, mode);
	} else if (event.data.action === "path/has:node") {
		if (!nodes.root.length) return;

		const { path, mode = "index" } = event.data;

		self.postMessage({
			type: "path/has:node",
			node: nodes.hasNodeByPath(path, mode),
		});
	} else if (event.data.action === "path/delete:node") {
		if (!nodes.root.length) return;

		const { path, mode = "index" } = event.data;

		nodes.deleteNodeByPath(path, mode);
	} else if (event.data.action === "path/clear:nodes") {
		if (!nodes.root.length) return;

		const { path, mode = "index" } = event.data;

		nodes.clearNodesByPath(path, mode);
	} else if (event.data.action === "path/replace:node") {
		if (!nodes.root.length) return;

		const { from, value, mode = "index" } = event.data;

		nodes.replaceNodeByPath(from, value, mode);
	} else if (event.data.action === "path/search:node") {
		if (!nodes.root.length) return;

		const { from, search, mode = "index" } = event.data;

		self.postMessage({
			type: "path/search:node",
			node: nodes.searchNodeByPath(from, search, mode),
		});
	} else if (event.data.action === "path/move:node") {
		if (!nodes.root.length) return;

		const { from, to, insert = "after" } = event.data.options;

		nodes.moveNodeByPath(from, to, insert);
	}
};
