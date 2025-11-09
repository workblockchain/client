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
import {Input} from "./Input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
    $size: {
      control: "select",
      options: ["x-small", "small", "medium", "large"],
    },
    $align: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Sizes: Story = {
  render: () => (
    <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
      <Input placeholder="x-small 尺寸" $size="x-small" />
      <Input placeholder="small 尺寸" $size="small" $align="start" />
      <Input placeholder="medium 尺寸" $size="medium" $align="center" />
      <Input placeholder="large 尺寸" $size="large" $align="end" />
    </div>
  ),
}
