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

import type {Meta, StoryObj} from "@storybook/react-vite"
import {Button} from "../Button"
import {Dropdown} from "./Dropdown"

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  args: {
    children: (setOpen, setTriggerRectGetter) => {
      return (
        <Button
          ref={(el) => {
            if (el) setTriggerRectGetter(() => el.getBoundingClientRect())
          }}
          onClick={() => setOpen(true)}
          $variant="solid"
          $size="small"
        >
          打开下拉菜单
        </Button>
      )
    },
    dropdownElement: (
      <div
        style={{
          background: "white",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          minWidth: "200px",
        }}
      >
        <div>下拉菜单内容</div>
        <div>选项 1</div>
        <div>选项 2</div>
        <div>选项 3</div>
      </div>
    ),
  },
}
