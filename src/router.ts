// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import {createBrowserRouter, RouteObject} from "react-router"
import {Main} from "./components/Layout/Main"

export const paths = {
  home: "/",
  config: "config",
  profile: "profile",
  records: "records",
  dashboard: "dashboard",
}

export const routers: RouteObject[] = [
  {
    path: paths.home,
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
          Component: (
            await import("./components/Layout/UserProfile/UserProfile")
          ).default,
        }),
      },
      {
        path: paths.records,
        lazy: async () => ({
          Component: (await import("./components/Layout/RecordsLayout"))
            .default,
        }),
      },
      {
        path: paths.dashboard,
        lazy: async () => ({
          Component: (await import("./components/Layout/Dashboard/Dashboard"))
            .default,
        }),
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (
                await import("./components/Containers/KanbanContainer")
              ).default,
            }),
          },
          {
            path: "work",
            lazy: async () => ({
              Component: (await import("./components/Containers/WorkContainer"))
                .default,
            }),
          },
          {
            path: "kanban",
            lazy: async () => ({
              Component: (
                await import("./components/Containers/KanbanContainer")
              ).default,
            }),
          },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routers)
