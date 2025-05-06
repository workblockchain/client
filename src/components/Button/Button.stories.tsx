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

import GearIcon from "@/assets/gear.svg?react"
import type {Meta, StoryObj} from "@storybook/react"
import {Button} from "./Button"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    $variant: {
      control: {type: "radio"},
      options: [
        "solid",
        "outline",
        "text",
        "icon",
        "iconWithLabel",
        "largeIconWithLabel",
      ],
    },
    $size: {
      control: {type: "radio"},
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
    $animated: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Primary Button",
    $variant: "solid",
  },
}

export const Outline: Story = {
  args: {
    ...Primary.args,
    $variant: "outline",
  },
}

export const Text: Story = {
  args: {
    ...Primary.args,
    $variant: "text",
  },
}

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
}

export const Icon: Story = {
  args: {
    ...Primary.args,
    $variant: "icon",
    children: <GearIcon />,
  },
}

export const IconWithLabel: Story = {
  args: {
    ...Icon.args,
    $variant: "iconWithLabel",
    $animated: true,
    children: (
      <>
        <GearIcon />
        <span>设置</span>
      </>
    ),
  },
}

export const LargeIconWithLabel: Story = {
  args: {
    ...Icon.args,
    $variant: "largeIconWithLabel",
    children: (
      <>
        <GearIcon />
        <span>大号标签</span>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "图标和标签垂直布局，高度固定72px",
      },
    },
  },
}
