import react from "@vitejs/plugin-react"
import {fileURLToPath, URL} from "node:url"
import {defineConfig} from "vite"
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              ssr: false,
            },
          ],
        ],
      },
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
