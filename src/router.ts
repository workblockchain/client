import {createBrowserRouter} from "react-router"
import {Main} from "./components/Layout/Main"

export const paths = {
  home: "/",
  config: "config",
  profile: "profile",
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (
            await import("./components/PomodoroLayout/PomodoroLayout")
          ).default,
        }),
      },
      {
        path: paths.config,
        lazy: async () => ({
          Component: (await import("./components/Layout/Config")).default,
        }),
      },
      {
        path: paths.profile,
        lazy: async () => ({
          Component: (await import("./components/Layout/UserProfile")).default,
        }),
      },
    ],
  },
])
