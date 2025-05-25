import {isTauri} from "@tauri-apps/api/core"
import {WebviewWindow} from "@tauri-apps/api/webviewWindow"
import {useNavigate} from "react-router"

const tauriBaseUrl = "http://localhost:5173/"

interface NavigationParams {
  path: string // React Router 路径
  tauriWindowOptions: {
    label: string // Tauri 新窗口的唯一标签 (可选，但推荐)
    title?: string // Tauri 新窗口的标题 (可选)
    width?: number // Tauri 新窗口的宽度 (可选)
    height?: number // Tauri 新窗口的高度 (可选)
  }
}

export function useConditionalNavigation() {
  const navigate = useNavigate()

  const handleNavigation = async ({
    path,
    tauriWindowOptions,
  }: NavigationParams) => {
    if (isTauri()) {
      const {
        width = 800,
        height = 600,
        label = `${path.replace(/\//g, "-")}`,
        title = `Workchain - ${path}`,
      } = tauriWindowOptions
      console.log(
        `Tauri: Navigating to ${path} in new window (label: ${label})`
      )
      try {
        const existingWindow = await WebviewWindow.getByLabel(label)
        if (existingWindow) {
          console.log(
            `Tauri: Window with label "${label}" already exists, focusing it.`
          )
          existingWindow.setFocus()
        } else {
          const url = `${tauriBaseUrl}${path}`
          const window = new WebviewWindow(label, {
            url,
            center: true,
            width,
            height,
            resizable: true,
            title,
          })
          console.log(
            `Tauri: Created new window with label "${label}" by URL "${url}"`
          )
          window.once("tauri://created", () => {
            console.log(`Tauri: Window "${label}" created successfully.`)
          })
          window.once("tauri://error", (error) => {
            console.error(`Tauri: Error creating window "${label}":`, error)
          })
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      console.log(`Browser: Navigating to ${path}`)
      navigate(path)
    }
  }

  return handleNavigation
}
