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
import {svgIcons} from "../Icons"
import {MenuItem} from "./MenuItem"

const meta: Meta<typeof MenuItem> = {
  title: "Components/Menu/MenuItem",
  component: MenuItem,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof MenuItem>

export const Default: Story = {
  args: {
    label: "仪表盘",
    icon: <svgIcons.Kanban />,
    hasChildren: true,
    children: <span style={{display: "inline-flex"}}>123</span>,
    onClick: () => {
      console.log("click")
    },
  },
}

export const WithSelected: Story = {
  args: {
    ...Default.args,
    isSelected: true,
  },
}

export const WithDisabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const WithIsExpanded: Story = {
  args: {
    ...Default.args,
    hasChildren: true,
    isExpanded: true,
  },
}
