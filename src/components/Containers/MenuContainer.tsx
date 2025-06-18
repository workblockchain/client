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

import {svgIcons} from "../Icons/svgIcons"
import Menu, {MenuItem} from "../Menu/Menu"

export function MenuContainer() {
  const menuData: MenuItem[] = [
    {
      id: "work",
      label: "劳动管理",
      icon: <svgIcons.List width={24} height={24} />,
      children: [
        {
          id: "work-recode",
          label: "劳动记录",
          icon: <svgIcons.Navigation width={24} height={24} />,
          url: "/dashboard/work",
        },
        {
          id: "work-kanban",
          label: "需求列表",
          icon: <svgIcons.Workbench width={24} height={24} />,
          url: "/dashboard/kanban",
        },
      ],
    },
  ]
  return <Menu items={menuData}></Menu>
}

export default MenuContainer
