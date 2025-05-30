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
          Component: (
            await import("./components/Layout/UserProfile/UserProfile")
          ).default,
        }),
      },
    ],
  },
])
