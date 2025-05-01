import react from "@vitejs/plugin-react-swc"
import {join} from "node:path"
import {defineConfig} from "vite"
import svgr from "vite-plugin-svgr"

const root = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: "./",
  resolve: {
    alias: {
      "@": join(root, "src"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: join(root, "dist"),
    rollupOptions: {
      output: {
        assetFileNames: "[hash].[ext]",
        chunkFileNames: "[hash].js",
        entryFileNames: "[hash].js",
      },
    },
  },
})
