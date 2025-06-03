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

import List from "@/assets/list.svg?react"
import Workbench from "@/assets/workbench.svg?react"
import Menu from "../Menu/Menu"
interface MenuContainerProps {}

const menus = [
  {
    id: "gzt",
    icon: <Workbench width={18} height={18} />,
    label: "工作台",
    url: "/dashboard",
  },
  {
    id: "work",
    icon: <List width={18} height={18} />,
    label: "劳动管理",
    children: [
      {
        id: "lb",

        label: "列表",
        url: "/dashboard/work",
        onUpdate: () => {},
      },
      {
        id: "zt",
        label: "状态",
        url: "/",
      },
      {
        id: "gtt",
        label: "甘特图",
        url: "/",
        show: false,
      },
    ],
  },
  {
    id: "bdy",
    label: "表单页",
    url: "/",
  },
]

export function MenuContainer(props: MenuContainerProps) {
  return <Menu items={menus}></Menu>
}

export default MenuContainer
