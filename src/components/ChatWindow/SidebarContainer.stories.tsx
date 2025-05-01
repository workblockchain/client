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

import {center, full} from "@/styles/shared"
import type {Meta, StoryObj} from "@storybook/react"
import {SidebarContainer} from "./SidebarContainer"

const meta: Meta<typeof SidebarContainer> = {
  title: "Components/SidebarContainer",
  component: SidebarContainer,
  parameters: {layout: "fullscreen"},
  argTypes: {
    left: {control: "boolean"},
    sidebarWidth: {control: "text"},
    sidebarBackground: {control: "color"},
    sidebarForeground: {control: "color"},
    sidebar: {control: "object"},
    child: {control: "object"},
  },
}

export default meta

type Story = StoryObj<typeof SidebarContainer>

const foreground = "#171819"
const background = "#f6f2e9"
const defaultSidebarWidth = "300px"
function placeholder(message: string) {
  return <div style={{...full, ...center}}>{message}</div>
}

function DefaultStory(options: {left: boolean; sidebarMessage: string}): Story {
  return {
    args: {
      left: options.left,
      sidebarWidth: defaultSidebarWidth,
      sidebarBackground: background,
      sidebarForeground: foreground,
      sidebar: placeholder(options.sidebarMessage),
      child: placeholder("Main Area"),
    },
  }
}

export const Left = DefaultStory({
  sidebarMessage: "Sidebar on Left",
  left: true,
})

export const Right = DefaultStory({
  sidebarMessage: "Sidebar on Right",
  left: false,
})
