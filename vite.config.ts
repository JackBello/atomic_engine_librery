import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import { resolve } from "node:path";

export default defineConfig({
	plugins: [mkcert()],
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, "lib/index.ts"),
			name: "Atomic",
			formats: ["umd", "cjs", "iife", "es"],
			fileName: (format: string) => `atomic-engine.${format}.js`,
		},
		rollupOptions: {
			output: {
				format: "es",
			},
		},
	},
	worker: {
		format: "es",
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "lib"),
		},
	},
});
