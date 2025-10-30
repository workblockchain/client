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
import {Main} from "./layout/Main"
import {useViewPreference} from "./pages/Dashboard/useDashboardPreference"

export const paths = {
  home: "/",
  config: "config",
  profile: "profile",
  records: "records",
  dashboard: "dashboard",
  work: "work",
  requirements: "requirements",
  projects: "projects",
  kanban: "kanban",
  team: "team",
}

export const routers: RouteObject[] = [
  {
    path: paths.home,
    Component: Main,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/Home")).default,
        }),
      },
      {
        path: paths.config,
        lazy: async () => ({
          Component: (await import("./pages/Config")).default,
        }),
      },
      {
        path: paths.profile,
        lazy: async () => ({
          Component: (await import("./pages/UserProfile")).default,
        }),
      },
      {
        path: paths.records,
        lazy: async () => ({
          Component: (await import("./pages/Records")).default,
        }),
      },
      {
        path: paths.dashboard,
        lazy: async () => ({
          Component: (await import("./pages/Dashboard")).default,
        }),
        children: [
          {
            index: true,
            loader: () => {
              useViewPreference.getState().setPageKey(paths.kanban)
              return null
            },
            lazy: async () => ({
              Component: (await import("./pages/Dashboard/Kanban")).default,
            }),
          },
          {
            path: paths.work,
            loader: () => {
              useViewPreference.getState().setPageKey(paths.work)
              return null
            },
            lazy: async () => ({
              Component: (await import("./pages/Dashboard/Work")).default,
            }),
          },
          {
            path: paths.kanban,
            loader: () => {
              useViewPreference.getState().setPageKey(paths.kanban)
              return null
            },
            lazy: async () => ({
              Component: (await import("./pages/Dashboard/Kanban")).default,
            }),
          },
          {
            path: paths.requirements,
            loader: () => {
              useViewPreference.getState().setPageKey(paths.requirements)
              return null
            },
            lazy: async () => ({
              Component: (await import("./pages/Dashboard/Requirements"))
                .default,
            }),
          },
          {
            path: paths.projects,
            loader: () => {
              useViewPreference.getState().setPageKey(paths.projects)
              return null
            },
            lazy: async () => ({
              Component: (await import("./pages/Dashboard/Projects")).default,
            }),
          },
          {
            path: paths.team,
            loader: () => {
              useViewPreference.getState().setPageKey(paths.team)
              return null
            },
            lazy: async () => ({
              Component: (await import("./pages/Dashboard/Team")).default,
            }),
          },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routers)
