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

import type {Meta, StoryObj} from "@storybook/react"
import {BrowserRouter} from "react-router"
import {Menu} from "./Menu"

const meta: Meta<typeof Menu> = {
  title: "Components/Menu/Index",
  component: Menu,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    items: [
      {
        id: "gzt",
        icon: "",
        label: "工作台",
        url: "/dashboard",
      },
      {
        id: "labor",
        label: "劳动管理",
        children: [
          {
            id: "lb",
            icon: "",
            label: "列表",
            url: "/dashboard/labor",
            onUpdate: () => {},
          },
          {
            id: "zt1",
            label: "状态",
            url: "/zt1",
          },
          {
            id: "gtt111",
            label: "甘特图",
            url: "/zt11",
            children: [
              {
                id: "lsgfb",
                icon: "",
                label: "列表",
                url: "/dashboard/labor1",
              },
            ],
          },
        ],
      },
      {
        id: "bdy",
        label: "表单页",
        url: "/",
        children: [
          {
            id: "lb1",
            icon: "",
            label: "列表",
            url: "/dashboard/labor",
            onUpdate: () => {},
          },
          {
            id: "zt11",
            label: "状态",
            url: "/zt1",
          },
          {
            id: "gtt1111",
            label: "甘特图",
            url: "/zt11",
            children: [
              {
                id: "lsgfb1",
                icon: "",
                label: "列表",
                url: "/dashboard/labor1",
              },
            ],
          },
        ],
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    items: [],
  },
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        id: "dashboard",
        label: "仪表盘",
        url: "/dashboard",
      },
      {
        id: "settings",
        label: "设置",
        url: "/settings",
        disabled: true,
      },
      {
        id: "profile",
        label: "个人资料",
        url: "/profile",
      },
    ],
  },
}
