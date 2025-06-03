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

import {Meta, StoryObj} from "@storybook/react"
import {Switch} from "./Switch"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "开关状态",
    },
    size: {
      options: ["small", "medium"],
      control: {type: "radio"},
      description: "开关尺寸",
    },
    disabled: {
      control: "boolean",
      description: "是否禁用",
    },
    onChange: {
      action: "changed",
      description: "状态变化回调",
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    checked: false,
    onChange: (checked) => console.log("Switch toggled:", checked),
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    onChange: (checked) => console.log("Switch toggled:", checked),
  },
}

export const SmallSize: Story = {
  args: {
    checked: false,
    size: "small",
    onChange: (checked) => console.log("Switch toggled:", checked),
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    onChange: (checked) => console.log("Switch toggled:", checked),
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    onChange: (checked) => console.log("Switch toggled:", checked),
  },
}
