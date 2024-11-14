import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		mkcert(),
		dts({
			insertTypesEntry: true,
			rollupTypes: true,
			tsconfigPath: resolve(__dirname, "./tsconfig.build.json"),
			exclude: ["src", "public"],
			include: ["lib"],
		}),
	],
	build: {
		copyPublicDir: false,
		emptyOutDir: true,
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
		sourcemap: true,
		target: "esnext",
		minify: true,
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
