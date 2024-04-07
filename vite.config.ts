import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import mkcert from "vite-plugin-mkcert"
import { resolve } from "path"

export default defineConfig({
  plugins: [dts({ include: ["lib"] }), mkcert()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "AtomicEngine",
      formats: ["umd", "cjs", "iife", "es"],
      fileName: (format) => "atomic-engine." + format + ".js"
    }
  }
})
