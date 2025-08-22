import react from "@vitejs/plugin-react-swc"
import {fileURLToPath, URL} from "node:url"
import {defineConfig} from "vite"
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [["@swc/plugin-styled-components", {}]],
    }),
    svgr(),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
