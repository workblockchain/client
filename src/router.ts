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
import {svgIcons} from "./components/Icons/svgIcons"
import {Main} from "./components/Layout/Main"

export const paths = {
  home: "/",
  config: "config",
  profile: "profile",
  records: "records",
  dashboard: "dashboard",
}

export interface RouteMeta {
  label?: string
  icon?: string
  showInMenu?: boolean
  showInBreadcrumb?: boolean
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
        handle: {
          label: "设置",
          icon: svgIcons.Gear,
        },
      },
      {
        path: paths.profile,
        lazy: async () => ({
          Component: (
            await import("./components/Layout/UserProfile/UserProfile")
          ).default,
        }),
        handle: {
          label: "个人信息",
          icon: svgIcons.People,
        },
      },
      {
        path: paths.records,
        lazy: async () => ({
          Component: (await import("./components/Layout/RecordsLayout"))
            .default,
        }),
        handle: {
          label: "劳动记录",
          icon: svgIcons.List,
        },
      },
      {
        path: paths.dashboard,
        lazy: async () => ({
          Component: (await import("./components/Layout/Dashboard/Dashboard"))
            .default,
        }),
        handle: {
          label: "工作台",
          icon: svgIcons.Kanban,
          showInMenu: true,
          showInBreadcrumb: true,
        },
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
            handle: {
              label: "劳动记录",
              icon: svgIcons.Navigation,
            },
          },
          {
            path: "kanban",
            lazy: async () => ({
              Component: (
                await import("./components/Containers/KanbanContainer")
              ).default,
            }),
            handle: {
              label: "需求列表",
              icon: svgIcons.Workbench,
              showInMenu: true,
              showInBreadcrumb: true,
            },
          },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routers)
