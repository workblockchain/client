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
import {useState} from "react"
import {Button} from "../Button"
import {Drawer} from "./Drawer"

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    width: {
      control: "text",
    },
    direction: {
      control: {type: "radio"},
      options: ["left", "right", "top", "bottom"],
    },
    children: {
      control: false,
    },
  },
  args: {
    title: "Drawer 标题",
    width: "400px",
    direction: "right",
    children: <div style={{padding: "16px"}}>Drawer 内容区域</div>,
  },
  decorators: [
    (Story, {args}) => {
      const [isOpen, setIsOpen] = useState(false)
      return (
        <>
          <Button onClick={() => setIsOpen(true)}>打开Drawer</Button>
          <Story args={{...args, isOpen, onClose: () => setIsOpen(false)}} />
        </>
      )
    },
  ],
}

export default meta
type Story = StoryObj<Omit<typeof Drawer, "isOpen" | "onClose">>

export const Basic: Story = {}

export const NoTitle: Story = {
  args: {
    title: undefined,
  },
}

export const LeftDirection: Story = {
  args: {
    direction: "left",
  },
}

export const TopDirection: Story = {
  args: {
    direction: "top",
    width: "200px",
  },
}

export const BottomDirection: Story = {
  args: {
    direction: "bottom",
    width: "200px",
  },
}

export const CustomWidth: Story = {
  args: {
    width: "600px",
  },
}

export const ComplexContent: Story = {
  args: {
    children: (
      <div style={{padding: "16px"}}>
        <h3>复杂内容示例</h3>
        <p>这里可以放置任何复杂的内容组件</p>
        <div style={{marginTop: "16px"}}>
          <Button>操作按钮1</Button>
          <Button style={{marginLeft: "8px"}}>操作按钮2</Button>
        </div>
        <div
          style={{
            marginTop: "16px",
            borderTop: "1px solid #eee",
            paddingTop: "16px",
          }}
        >
          <p>底部内容区域</p>
        </div>
      </div>
    ),
  },
}
