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
import {TextInputWithLabel} from "./Input"

const meta: Meta<typeof TextInputWithLabel> = {
  title: "Components/Input/TextInput",
  component: TextInputWithLabel,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof TextInputWithLabel>

export const Default: Story = {
  args: {
    label: "用户名",
    placeholder: "请输入...",
  },
  decorators: [
    (Story) => (
      <div style={{maxWidth: "400px", margin: "20px", background: "#de9696"}}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      exclude: ["as", "css", "theme"],
    },
  },
}
