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

import {svgIcons} from "@/components/Icons/svgIcons"
import {paths} from "@/router"

export interface RouteMeta {
  label?: string
  icon?: React.ReactNode
  showInMenu?: boolean
  showInBreadcrumb?: boolean
}

export const routerData: Record<string, RouteMeta> = {
  [paths.home + paths.config]: {
    label: "设置",
    icon: <svgIcons.Gear />,
  },
  [paths.home + paths.profile]: {
    label: "个人信息",
    icon: <svgIcons.People />,
  },
  [paths.home + paths.records]: {
    label: "劳动记录",
    icon: <svgIcons.List />,
  },
  [paths.home + paths.dashboard]: {
    label: "工作台",
    icon: <svgIcons.Kanban />,
    showInMenu: true,
    showInBreadcrumb: true,
  },
  [paths.home + paths.dashboard + "/work"]: {
    label: "劳动记录",
    icon: <svgIcons.Navigation />,

    showInMenu: true,
    showInBreadcrumb: true,
  },
  [paths.home + paths.dashboard + "/kanban"]: {
    label: "需求列表",
    icon: <svgIcons.Workbench />,
    showInMenu: true,
    showInBreadcrumb: true,
  },
}

export default routerData
