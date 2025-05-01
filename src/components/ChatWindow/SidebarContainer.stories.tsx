// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PSL v2.
// You can use this software according to the terms
// and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//
//   http://license.coscl.org.cn/MulanPSL2
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import type {Meta, StoryObj} from "@storybook/react"
import {SidebarContainer} from "./SidebarContainer"

const meta: Meta<typeof SidebarContainer> = {
  title: "Components/SidebarContainer",
  component: SidebarContainer,
  parameters: {layout: "fullscreen"},
  argTypes: {
    sidebar: {control: "text"},
    child: {control: "text"},
    left: {control: "boolean"},
    sidebarWidth: {control: "text"},
    sidebarBackground: {control: "color"},
    sidebarForeground: {control: "color"},
  },
}

export default meta

type Story = StoryObj<typeof SidebarContainer>

const foreground = "#171819"
const background = "#f6f2e9"

export const Left: Story = {
  args: {
    sidebar: "Sidebar on Left",
    child: "Main Area",
    left: true,
    sidebarWidth: "300px",
    sidebarBackground: background,
    sidebarForeground: foreground,
  },
}

export const Right: Story = {
  args: {
    sidebar: "Sidebar on Right",
    child: "Main Area",
    left: false,
    sidebarWidth: "300px",
    sidebarBackground: background,
    sidebarForeground: foreground,
  },
}
